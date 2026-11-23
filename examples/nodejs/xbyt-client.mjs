import crypto from 'node:crypto';

/**
 * Zero-dependency XBYT Merchant Gateway Client (Node.js 20+)
 * Docs: https://xbyt.org/docs_api.php
 */
export class XbytMerchantClient {
  constructor({ apiKey, webhookSecret = '', baseUrl = 'https://xbyt.org' }) {
    if (!apiKey) throw new Error('apiKey is required');
    this.apiKey = apiKey;
    this.webhookSecret = webhookSecret;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  async createInvoice({ amount, orderId, description = '', returnUrl = '', callbackUrl = '' }) {
    const res = await fetch(`${this.baseUrl}/api/merchant/create_invoice.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({
        amount,
        order_id: orderId,
        description,
        return_url: returnUrl,
        callback_url: callbackUrl,
      }),
    });
    if (!res.ok) throw new Error(`createInvoice HTTP ${res.status}`);
    return res.json();
  }

  async getInvoiceStatus(invoiceId) {
    const url = `${this.baseUrl}/api/merchant/status.php?invoice_id=${encodeURIComponent(invoiceId)}`;
    const res = await fetch(url, { headers: { 'X-Api-Key': this.apiKey } });
    if (!res.ok) throw new Error(`getInvoiceStatus HTTP ${res.status}`);
    return res.json();
  }

  async verifyPayout({ txHash, to, amount }) {
    const res = await fetch(`${this.baseUrl}/api/merchant/verify_payout.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({ tx_hash: txHash, to, amount }),
    });
    if (!res.ok) throw new Error(`verifyPayout HTTP ${res.status}`);
    return res.json();
  }

  verifyWebhookSignature(rawBody, signatureHeader) {
    if (!this.webhookSecret || !signatureHeader) return false;
    const expected = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(rawBody, 'utf8')
      .digest('hex');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(String(signatureHeader), 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
}
