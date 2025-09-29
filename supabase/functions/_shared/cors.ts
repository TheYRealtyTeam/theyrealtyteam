const ALLOWLIST = new Set([
  'https://theyteam.co',
  'https://www.theyteam.co',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

export function makeCorsHeaders(req: Request): Headers {
  const origin = req.headers.get('origin') ?? '';
  const h = new Headers({
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  });
  if (ALLOWLIST.has(origin)) {
    h.set('Access-Control-Allow-Origin', origin);
  }
  return h;
}
