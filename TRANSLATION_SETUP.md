# On-site language translation setup

The language picker translates the current page in place through Google Cloud Translation Basic (v2). The browser talks only to this site's `/api/translate` route; the Cloudflare Worker keeps the Google API key private. A selected language is remembered as the visitor navigates between pages. English restores the original page text.

## Configure Google Cloud

1. Create or select a Google Cloud project.
2. Enable the **Cloud Translation API** and configure billing.
3. Create an API key and restrict it to the **Cloud Translation API**. Set an API quota that matches the maximum usage you want to allow.
4. Keep the key private. Do not put it in Astro source, browser JavaScript, or a `PUBLIC_` environment variable.

Google bills translation by the number of characters sent. Review current rates and monthly credits on [Google Cloud Translation pricing](https://cloud.google.com/products/translate/pricing).

## Run locally

Copy `.dev.vars.example` to `.dev.vars` in the project root and replace the placeholder with your key (the real `.dev.vars` file is gitignored):

```text
GOOGLE_TRANSLATE_API_KEY=your-restricted-api-key
```

Then run:

```sh
npm run dev:worker
```

Open the local address printed by Wrangler, usually `http://localhost:8787`. This runs the built static site and the Worker route together. The separate Astro server at port 4321 does not provide the Worker translation endpoint.

## Deploy to Cloudflare Workers

From the project root, set the production secret once:

```sh
npx wrangler secret put GOOGLE_TRANSLATE_API_KEY
```

Paste the restricted API key at Wrangler's hidden prompt. Then deploy:

```sh
npm run deploy
```

Before sharing the feature publicly, add a Cloudflare rate-limit rule for `POST /api/translate` and monitor the Google Cloud Translation quota and billing. Each request is capped at 12,000 text characters; Cloudflare's edge cache reuses identical translations.

The Cloud Translation API may not support every one of the 243 language entries in the picker. If Google rejects a language code, the page remains readable in its original language and shows an error message.
