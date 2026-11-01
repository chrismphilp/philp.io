# Blog

[philp.io](https://philp.io) is a blog about software development, and other topics.

## Development and builds

Use Node 22.14.0 from `.nvmrc` (`nvm use`), a newer Node 22 release, or Node 24. Install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

For Cloudflare Pages, use `npm run build:cloudflare` and publish the `out` directory. This runs Next.js with webpack for the PWA plugin, then generates the optimized images needed by the static export. Run `npm run lint` before submitting changes.

## The library

The website is an explorable pixel-art library: posts are clickable books in the illustrated shelves, and articles open over the room. Phones can pan between the snowy window, shelves and fireside; a searchable card catalogue offers a shortcut. Fireplace sound is a quiet, opt-in field recording. See [the design notes](docs/library-design.md) for the research, visual system, artwork, motion controls, and performance decisions.

Run `npm run build:cloudflare` followed by `npm run start` to preview the production export. `npm run test:e2e` tests it in Chromium and mobile WebKit (install browsers first with `npx playwright install chromium webkit`). GitHub Actions runs lint, type checking, the export build, and the browser/accessibility checks.

### Scroll restoration

All published books render immediately. Keep the complete archive height available for Back, Forward, and reload restoration. Book links disable prefetching. The article footer's “All writing” link points to `/#post-<slug>` so directly opened articles can also return to their place on the shelf.

### Header navigation

Add page links inside `components/header/Navigation.tsx`. The active route is indicated in the navigation. `ThemeToggle` owns the color-theme state; its markup is stable across rendering and hydration. The default theme is dark, and visitors can choose the parchment light theme.

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

## Tailwind sources

Tailwind scans the application, components, and offline-page TypeScript files. Article code fences are examples, so their class names must not generate production CSS. If an MDX article adds rendered JSX with utility classes, explicitly register those classes or that source in `styles/globals.css`.
