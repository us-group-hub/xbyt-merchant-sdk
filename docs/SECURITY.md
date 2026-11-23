# XBYT Non-Custodial Security Model

1. **Zero Private-Key Custody:** XBYT Merchant Gateway never asks for, transmits, or stores merchant private keys or seed phrases. Buyer funds settle directly on TRON (TRC-20) or TON (Jetton) to the merchant's own destination wallet.
2. **Mandatory Server-Side Verification:** Never credit user balances or ship digital goods solely because a buyer arrived at `return_url?status=completed`. Always verify either:
   - the HMAC-SHA256 `X-Xbyt-Signature` webhook header using constant-time comparison (`hash_equals` / `crypto.timingSafeEqual` / `hmac.compare_digest`), or
   - a direct server-to-server call to `GET /api/merchant/status.php?invoice_id=...`.
3. **Idempotent Order Fulfillment:** Store processed `invoice_id` and `tx_hash` values with a unique constraint in your order database to prevent double-crediting on webhook retries.
