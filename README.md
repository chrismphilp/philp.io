# Blog

[philp.io](https://philp.io) is a blog about software development, and other topics.

## Development and builds

Use Node 22.14.0 from `.nvmrc` (`nvm use`), a newer Node 22 release, or Node 24. Install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

For Cloudflare Pages, use `npm run build:cloudflare` and publish the `out` directory. This runs Next.js with webpack for the PWA plugin, then generates the optimized images needed by the static export. Run `npm run lint` before submitting changes.

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

## Photo loading

Local article photos get tiny inline WebP previews during static export. The
avatar uses its static import's preview. `next-image-export-optimizer` handles
showing the blurred placeholder until the full image loads, using its built-in
behavior. Article photos retain responsive sizes, lazy loading, and a fixed
aspect ratio; SVG diagrams skip previews.
