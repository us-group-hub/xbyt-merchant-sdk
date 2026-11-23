"""Zero-dependency XBYT Merchant Gateway Client (Python 3.10+).
Docs: https://xbyt.org/docs_api.php
"""
from __future__ import annotations

import hashlib
import hmac
import json
import urllib.parse
import urllib.request
from typing import Any


class XbytMerchantClient:
    def __init__(self, api_key: str, webhook_secret: str = "", base_url: str = "https://xbyt.org") -> None:
        self.api_key = api_key
        self.webhook_secret = webhook_secret
        self.base_url = base_url.rstrip("/")

    def _request(self, method: str, path: str, payload: dict[str, Any] | None = None) -> dict[str, Any]:
        headers = {"X-Api-Key": self.api_key, "Accept": "application/json"}
        data = None
        if payload is not None:
            headers["Content-Type"] = "application/json"
            data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(f"{self.baseUrl if hasattr(self, 'baseUrl') else self.base_url}{path}", data=data, headers=headers, method=method)
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def create_invoice(
        self,
        amount: float,
        order_id: str,
        description: str = "",
        return_url: str = "",
        callback_url: str = "",
    ) -> dict[str, Any]:
        return self._request(
            "POST",
            "/api/merchant/create_invoice.php",
            {
                "amount": amount,
                "order_id": order_id,
                "description": description,
                "return_url": return_url,
                "callback_url": callback_url,
            },
        )

    def get_invoice_status(self, invoice_id: str) -> dict[str, Any]:
        q = urllib.parse.urlencode({"invoice_id": invoice_id})
        return self._request("GET", f"/api/merchant/status.php?{q}")

    def verify_payout(self, tx_hash: str, to: str, amount: float) -> dict[str, Any]:
        return self._request(
            "POST",
            "/api/merchant/verify_payout.php",
            {"tx_hash": tx_hash, "to": to, "amount": amount},
        )

    def verify_webhook_signature(self, raw_body: bytes, signature_header: str) -> bool:
        if not self.webhook_secret or not signature_header:
            return False
        expected = hmac.new(self.webhook_secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected, signature_header)
