# Blog

[philp.io](https://philp.io) is a blog about software development, and other topics.

## Development and builds

Use Node 22.14.0 from `.nvmrc` (`nvm use`), a newer Node 22 release, or Node 24. Install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

For Cloudflare Pages, use `npm run build:cloudflare` and publish the `out` directory. This runs Next.js with webpack for the PWA plugin, then generates the optimized images needed by the static export. Run `npm run lint` before submitting changes.

## Scroll restoration

Home, Tech, and Misc render their complete article lists immediately. The archive is small and its metadata is already available at build time. Revealing ten cards at a time used to truncate the page during Back navigation: the browser clamped the saved position to the shorter list before the remaining cards appeared. Keep the full list height available so native Back, Forward, and reload restoration can work at every viewport size. Article links still disable prefetching, so displaying the archive does not download every article.

The article footer's “All writing” link points to `/#post-<slug>`, targeting the current article's card in the complete Home archive. This also works for directly opened articles and after following previous/next links; it returns to the article's location in the list rather than a saved pixel position.

## Header navigation

Add page links inside `Navigation` in `components/header/Navigation.tsx`. Add header controls as children of `HeaderActions` in `components/header/Header.tsx`; `HeaderActionLink` and `HeaderActionButton` provide consistent styling, accessible labels, and native link/button behavior. The parent layouts use gaps and wrapping, so adding an item does not require changing neighboring items or calculating widths.

Put state and event handlers for an interactive control in its own client component, then render that component inside `HeaderActions`. Keep a control's initial markup stable across server rendering and hydration. `ThemeToggle` is the client component responsible for theme state; CSS selects its visible icon from the document's theme class, so its markup is present before JavaScript loads.

## Article images

Store each article's images in `public/articles/images/<article-slug>/`, matching the filename in `articles/` without `.mdx`. Reference them with absolute public URLs, for example `![Tram](/articles/images/top-of-the-film-reel/tram.jpg)`. Keep generated image variants out of Git; the build creates them automatically.

## Dependency maintenance

`.npmrc` enables `strict-peer-deps` so incompatible dependency combinations fail installation. Keep `package-lock.json` committed and use `npm ci` for repeatable builds. The unused `react-ga`, `react-markdown`, `rehype-shiki`, `autoprefixer`, and `@types/minimatch` packages have been removed, along with the obsolete `vscode-textmate` resolution.

The dependency upgrade retains these compatibility constraints:

| Package | Version | Reason |
| --- | --- | --- |
| TypeScript | 6.0.3 | `@typescript-eslint/typescript-estree` 8.71.1 requires TypeScript below 6.1.0. |
| ESLint | 9.39.5 | `eslint-plugin-react` 7.37.5 supports ESLint through the `^9.7` range, excluding ESLint 10. |
| `@types/node` | 22.20.5 | Types match the Node 22 deployment baseline in `.nvmrc`. |
| Linux native packages | Match their parent packages | SWC follows Next.js, Oxide follows Tailwind, and Sharp follows `sharp`. Lightning CSS stays at 1.32.0 because Tailwind 4.3.3 requires that version. |
| `tar` under `@vercel/container` | 7.5.22 | A scoped override supplies security fixes while Vercel 63.1.2's container dependency pins 7.5.11. Remove the override when the upstream dependency includes the fixes. |

Recheck these constraints when upgrading their parent packages. Validate with a clean install, lint, and the full Cloudflare build, then wait for the PR's Cloudflare check to succeed before treating the upgrade as deployment-ready.

## Browser baseline

The webpack production build targets Next.js's Chrome/Edge/Firefox 111 and Safari 16.4 baseline, recorded in `.browserslistrc`. These browsers provide the older language APIs in Next's unconditional module polyfill bundle. The client build substitutes `utils/browserPolyfills.js`, retaining the newer `URL.canParse` fallback. Recheck Next's polyfill module and supported browsers when upgrading Next.js. Turbopack development uses Next's original polyfills.
