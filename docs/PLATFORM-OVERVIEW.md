# XBYT.org Public Ecosystem Architecture

This document summarizes the publicly accessible product modules available on **[XBYT.org](https://xbyt.org/)**.

## 1. Token Launchpad, Listing & Market Discovery
- **Supported Networks:** TRON (`TRC-20`, DEX pricing via **SunSwap**) and TON (`Jetton`, DEX pricing via **STON.fi**).
- **Two Onboarding Paths:** Founders can launch a new token listing or register an already-deployed TRC-20 / TON Jetton token with contract verification, total supply, airdrop status, and live DEX liquidity metrics.
- **Public Ecosystem Contract (TRON):** `TV9aNF7i2wprsqmRtDkHiuEyJARupRhwph` (verifiable on Tronscan via [`https://xbyt.org/stats.php`](https://xbyt.org/stats.php)).
- **Transparent On-Chain Promotion:** Projects can activate *Neon Highlight* or *Pin to Top* visibility paid directly from their own wallet on-chain (site balances are not used).

## 2. Non-Custodial Merchant Payment Gateway (`/docs_api.php`)
- **Shop Mode (Receive Only):** Create an invoice via `POST /api/merchant/create_invoice.php`, redirect buyers to `checkout_url`, and fulfill upon verified `completed` webhook (`X-Xbyt-Signature`) or `GET /api/merchant/status.php`.
- **Balance & Gaming Mode (Deposits + Payouts):** Combine `create_invoice.php` + webhook verification for user deposits with `POST /api/merchant/verify_payout.php` to verify outgoing on-chain withdrawals without ever exposing merchant private keys.

## 3. Peer-to-Peer Trading Desk (`/p2p.php`)
- Direct user-to-user Buy & Sell order book for `XBYT` and `USDT` across both TRON and TON.
- Multi-currency payment method filters (bank transfers, fintech wallets like Wise/Revolut/N26/Monzo, Ukrainian banks Monobank/PrivatBank, PayPal, and cash).
- Structured trade lifecycle: deal initiation → 30-minute buyer fiat settlement window → on-chain token release directly from the seller's wallet, accompanied by built-in deal chat and deal status tracking.

## 4. Web3 Arcade & Creator Games (`/game.php`)
- Interactive games (*Slots, Roulette, Minesweeper/Saper, seasonal arcade titles*) using a fast game ledger alongside live connected wallet balances.
- Community creators can submit/launch games via **Create Game**, with transparent public win history and low entry stakes.
