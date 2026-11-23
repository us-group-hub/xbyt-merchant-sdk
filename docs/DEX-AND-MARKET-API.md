# XBYT.org Public DEX Quote, Token Catalog & OHLCV Market API

Public, read-only JSON endpoints for **TRON (SunSwap V2)** and **TON (STON.fi)** tokens listed on **[XBYT.org](https://xbyt.org/)**.

---

## 1. Unified TRON & TON Token Catalog + OHLCV + Gas Oracle

```http
GET https://xbyt.org/api/bot/tokens.php?ohlcv=1
```

**Query parameters:**
- `chain=tron|ton` *(optional)* — filter by network
- `address=<contract>` *(optional)* — inspect one specific TRC-20 or TON Jetton contract
- `ohlcv=1` *(optional)* — include up to 120 OHLCV candles `[t, o, h, l, c, v]`

**Sample response:**
```json
{
  "ok": true,
  "count": 2,
  "native_usd": { "ton": 1.60, "trx": 0.31, "updated_at": 1795468532 },
  "tokens": [
    {
      "id": "USDT_XBYT",
      "chain": "ton",
      "contract": "EQDD34ug_1VvFnsqg0WPRyznwf5l2r-Na10_hsM--0ijEYSs",
      "symbol": "XBYT",
      "decimals": 9,
      "dex": "STON.fi",
      "pool": "EQAyhoZB5B1OTzCeoQ_5ICEb7jBUS01idD_2Lmm2WuGa5xFf",
      "price_usd": 0.00003534,
      "liquidity_usd": 88.44,
      "reserve_usdt": 44.22,
      "volume_24h": 0.97,
      "ohlcv": [{ "t": 1795278926000, "o": 0.0000346, "h": 0.0000354, "l": 0.0000346, "c": 0.0000353, "v": 0.97 }]
    }
  ]
}
```

*(Alias: `GET https://xbyt.org/api/token_explorer.php?list=1` returns the identical catalog.)*

---

## 2. Live On-Chain DEX Swap Quote (SunSwap V2 & STON.fi)

```http
GET https://xbyt.org/api/dex_quote.php?chain=tron&token=TPDi5RCC9JTcvhfmjapRUyGi8BMuKAFuJi&side=buy&amount=10
GET https://xbyt.org/api/dex_quote.php?chain=ton&token=EQDD34ug_1VvFnsqg0WPRyznwf5l2r-Na10_hsM--0ijEYSs&side=buy&amount=10
```

- **TRON:** reads live SunSwap V2 pair reserves (`getReserves()`) via TronGrid, routes through the active SunSwap V2 Router (`TNJVzGqKBWkJxJB5XYSqGAwUTV15U24pPq`), and returns exact `price_impact`, `amount_out_min`, `gas_trx_with_energy`, and `gas_trx_no_energy`.
- **TON:** executes live `POST https://api.ston.fi/v1/swap/simulate` and returns `router`, `price_impact`, `fee_percent`, `gas_native`, and `amount_out_min`.

---

## Companion Pure-JS DEX SDK & Trading Bot

- Pure-JS TRON SunSwap V2 (no `TronWeb`) + TON STON.fi v1/v2 + Wilder TA + Net-Edge Risk Engine: **[`us-group-hub/xbyt-tron-ton-dex-kit`](https://github.com/us-group-hub/xbyt-tron-ton-dex-kit)**
- Live Telegram Smart Bot: **[@mytradixbot](https://t.me/mytradixbot)**
