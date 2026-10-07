const MAX_ITEMS = 100;
const MAX_ITEM_CHARS = 4500;
const MAX_TOTAL_CHARS = 12000;
const ALLOWED_TARGET = /^[a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/;

async function sha256(value) {
	const bytes = new TextEncoder().encode(value);
	const digest = await crypto.subtle.digest('SHA-256', bytes);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function json(body, status = 200, headers = {}) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
	});
}

async function translate(request, env, ctx) {
	const requestUrl = new URL(request.url);
	const origin = request.headers.get('Origin');
	if (!origin || new URL(origin).origin !== requestUrl.origin) return json({ error: 'A same-site browser request is required.' }, 403);
	if (request.method !== 'POST') return json({ error: 'Use POST to translate page text.' }, 405, { Allow: 'POST' });
	if (!env.GOOGLE_TRANSLATE_API_KEY) return json({ error: 'On-site translation is not configured yet. Add the GOOGLE_TRANSLATE_API_KEY Worker secret.' }, 503);

	const raw = await request.text();
	if (raw.length > 18_000) return json({ error: 'Translation request is too large.' }, 413);
	let payload;
	try { payload = JSON.parse(raw); } catch { return json({ error: 'Invalid JSON request.' }, 400); }
	const target = typeof payload.target === 'string' ? payload.target : '';
	const strings = payload.strings;
	if (!ALLOWED_TARGET.test(target) || !Array.isArray(strings) || strings.length < 1 || strings.length > MAX_ITEMS || strings.some((item) => typeof item !== 'string' || item.length > MAX_ITEM_CHARS)) {
		return json({ error: 'Invalid target language or text list.' }, 400);
	}
	const totalChars = strings.reduce((sum, item) => sum + item.length, 0);
	if (totalChars > MAX_TOTAL_CHARS) return json({ error: 'Translation batch is too large.' }, 413);

	const cache = caches.default;
	const cacheKey = new Request(`https://translation-cache.aonlineruler.invalid/${await sha256(`${target}\n${strings.join('\u0000')}`)}`);
	const cached = await cache.match(cacheKey);
	if (cached) return new Response(cached.body, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Translation-Cache': 'HIT' } });

	const apiUrl = new URL('https://translation.googleapis.com/language/translate/v2');
	apiUrl.searchParams.set('key', env.GOOGLE_TRANSLATE_API_KEY);
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ q: strings, target, format: 'text' }),
		});
		if (!response.ok) {
			const providerError = await response.json().catch(() => ({}));
			const details = providerError?.error?.message || '';
			const providerStatus = providerError?.error?.status || '';
			const diagnostic = `${providerStatus} ${details}`.toLowerCase();
			if (response.status === 400 && /target|language/i.test(details)) return json({ error: 'Google Translate does not support this language code.' }, 422);
			if (/api_key_http_referrer_blocked|referer|referrer/.test(diagnostic)) {
				return json({ error: 'Google blocked this API key by its website-referrer restriction. For Worker requests, set Application restrictions to None and keep API restrictions limited to Cloud Translation API.' }, 502);
			}
			if (/api_key_invalid|api key not valid|invalid api key/.test(diagnostic)) {
				return json({ error: 'Google rejected the API key. Check that the Cloudflare Worker secret contains the active key from the correct Google Cloud project.' }, 502);
			}
			if (/service_disabled|has not been used|disabled|accessnotconfigured/.test(diagnostic)) {
				return json({ error: 'Cloud Translation API is not enabled for the Google Cloud project associated with this API key. Enable it in that project, then try again.' }, 502);
			}
			if (/billing_not_enabled|billing.*(disabled|enable)|billing account/.test(diagnostic)) {
				return json({ error: 'Google Cloud billing is not enabled for the project associated with this API key.' }, 502);
			}
			if (response.status === 429 || /quota|rate limit/.test(diagnostic)) {
				return json({ error: 'Google Cloud Translation quota was exceeded. Review the project’s Translation quotas and billing limits, then retry.' }, 429);
			}
			console.error('Cloud Translation request rejected', { httpStatus: response.status, providerStatus });
			return json({ error: `Google Cloud Translation rejected the request (HTTP ${response.status}). Check the API key restrictions, API enablement, billing, and quotas for the key’s project.` }, 502);
		}
		const result = await response.json();
		const translations = result?.data?.translations?.map((item) => item.translatedText);
		if (!Array.isArray(translations) || translations.length !== strings.length || translations.some((item) => typeof item !== 'string')) {
			return json({ error: 'Google Translate returned an unexpected response.' }, 502);
		}
		const body = JSON.stringify({ translations });
		ctx.waitUntil(cache.put(cacheKey, new Response(body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=604800' } })));
		return json({ translations }, 200, { 'X-Translation-Cache': 'MISS' });
	} catch {
		return json({ error: 'Google Translate is temporarily unavailable.' }, 502);
	}
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.pathname === '/api/translate') return translate(request, env, ctx);
		return env.ASSETS.fetch(request);
	},
};
