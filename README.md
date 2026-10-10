# Blog

[philp.io](https://philp.io) is a blog about software development, and other topics.

## Photo loading

Local article photos get a tiny inline WebP preview during static export. The
avatar reuses its static import's preview. Full images retain responsive sizes
and lazy loading, and fade in over 200ms when still loading after hydration.
Already-loaded images appear immediately; reduced motion disables the fade.
Images also work without JavaScript, and SVG diagrams skip previews.

`npm run build` builds the static site and generates optimized images in `out/`.
`npm run static` and `npm run build:cloudflare` use the same build pipeline.

To check photo loading locally:

```sh
npm ci
npx playwright install chromium
npm run build
npm run test:images
```

The tests start a local server for `out/`. To test an existing PR preview instead:

```sh
IMAGE_TEST_URL=https://your-preview.pages.dev npm run test:images
```
