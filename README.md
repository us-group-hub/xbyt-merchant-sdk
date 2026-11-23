# XBYT — Non-Custodial Merchant API SDK, Token Launchpad, P2P & Web3 Game Ecosystem

Official public documentation, OpenAPI 3.1 specification, and zero-dependency client SDKs for **[XBYT.org](https://xbyt.org/)** — a multi-chain non-custodial Web3 platform built around **TRON (TRC-20)** and **TON (Jetton)**.

## Core Public Capabilities of XBYT.org

1. **Non-Custodial Merchant Payment Gateway API ([`docs_api.php`](https://xbyt.org/docs_api.php))**
   - Accept **TRON (TRC-20)** and **TON (Jetton)** directly from buyer wallets to merchant wallets with zero private-key custody.
   - Built for **online shops**, **gaming/arcade platforms**, **SaaS subscriptions**, and **balance-based apps** (deposit + payout verification).
   - Server-side invoice status endpoint (`/api/merchant/status.php`), on-chain tx verification (`/api/merchant/verify.php`), outgoing payout verification (`/api/merchant/verify_payout.php`), HMAC-SHA256 webhooks (`X-Xbyt-Signature`), and an interactive integration code generator.
2. **Token Launchpad & Existing Token Listing ([`xbyt.org`](https://xbyt.org/))**
   - Launch new community/project tokens or list existing **TRON (TRC-20)** and **TON (Jetton)** tokens with public market cards, airdrop indicators, holder counts, and launch metadata.
   - Live on-chain price, FDV, and liquidity data sourced transparently from **SunSwap (TRON)** and **STON.fi (TON)** (see [`/stats.php`](https://xbyt.org/stats.php)).
   - Transparent on-chain promotion slots (*Neon Highlight* and *Pin to Top*) settled directly from the promoter's wallet, plus public token feed at [`/coin_rss.xml`](https://xbyt.org/coin_rss.xml).
3. **Non-Custodial P2P Trading Marketplace ([`/p2p.php`](https://xbyt.org/p2p.php))**
   - Peer-to-peer Buy/Sell marketplace supporting **XBYT** and **USDT** on both **TRON** and **TON**.
   - Filterable across 20+ global and regional fiat rails (Wise, Revolut, N26, Monzo, PayPal, Monobank, PrivatBank, bank transfers, cash, etc.) with a structured 30-minute buyer payment window, in-deal P2P chat, and direct wallet-to-wallet on-chain settlement.
4. **Interactive Web3 Game Hub ([`/game.php`](https://xbyt.org/game.php))**
   - Built-in arcade games (*Roulette, Slots, Minesweeper/Saper, seasonal events*) plus community **Create Game** functionality, public game win history, game ledger staking, and connected on-chain wallet balance display (**TON Connect** + TRON wallets).
5. **User Profiles & Wallet Connectivity**
   - Optional TRON and TON wallet binding directly from the header, live watchlist/star tracking, and bilingual **EN / RU** interface.

## Repository Structure

```text
├── openapi/
│   └── merchant-api-v1.yaml       # OpenAPI 3.1 spec for public Merchant Gateway endpoints
├── examples/
│   ├── php/
│   │   ├── create_invoice.php     # Create checkout invoice (PHP 8+)
│   │   └── verify_webhook.php     # Timing-safe HMAC-SHA256 webhook handler (PHP 8+)
│   ├── nodejs/
│   │   └── xbyt-client.mjs        # Zero-dependency Node.js 20+ ESM SDK
│   └── python/
│       └── xbyt_client.py         # Zero-dependency Python 3.10+ client
├── docs/
│   ├── PLATFORM-OVERVIEW.md       # Detailed public architecture of Launchpad, P2P, Games & Merchant API
│   └── SECURITY.md                # Non-custodial security model & server-side verification checklist
└── LICENSE                        # MIT License
```

## Official Public Links

- Platform & Token Markets: [https://xbyt.org/](https://xbyt.org/)
- Merchant API Documentation: [https://xbyt.org/docs_api.php](https://xbyt.org/docs_api.php)
- **Official WordPress Plugin (WooCommerce, myCred, Directorist, WPUF):** [us-group-hub/xbyt-merchant-wordpress](https://github.com/us-group-hub/xbyt-merchant-wordpress)
- P2P Trading Desk: [https://xbyt.org/p2p.php](https://xbyt.org/p2p.php)
- Web3 Game Hub: [https://xbyt.org/game.php](https://xbyt.org/game.php)
- Live Platform Statistics: [https://xbyt.org/stats.php](https://xbyt.org/stats.php)
- Public Market RSS Feed: [https://xbyt.org/coin_rss.xml](https://xbyt.org/coin_rss.xml)
- TON Connect Manifest: [https://xbyt.org/tonconnect-manifest.json](https://xbyt.org/tonconnect-manifest.json)
