/**
 * Zero-dependency Node.js 20+ example:
 * Fetch live TRON & TON token catalog + real SunSwap V2 / STON.fi DEX quotes from XBYT.org.
 */

const CATALOG_URL = 'https://xbyt.org/api/bot/tokens.php?ohlcv=1';
const QUOTE_URL = 'https://xbyt.org/api/dex_quote.php';

async function main() {
  const catRes = await fetch(CATALOG_URL, { headers: { Accept: 'application/json' } });
  const cat = await catRes.json();
  if (!cat.ok) throw new Error('Catalog fetch failed');

  console.log('Native Gas Oracle:', cat.native_usd);
  for (const tok of cat.tokens) {
    const qUrl = `${QUOTE_URL}?chain=${encodeURIComponent(tok.chain)}&token=${encodeURIComponent(tok.contract)}&side=buy&amount=1`;
    const q = await (await fetch(qUrl, { headers: { Accept: 'application/json' } })).json();
    console.log({
      id: tok.id,
      chain: tok.chain,
      price_usd: tok.price_usd,
      liquidity_usd: tok.liquidity_usd,
      ohlcv_candles: (tok.ohlcv || []).length,
      buy_1_usdt_out: q.amount_out,
      price_impact_pct: q.price_impact != null ? (Number(q.price_impact) * 100).toFixed(2) + '%' : 'n/a',
      router: q.router,
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
