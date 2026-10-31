# The Philp Library

The blog is an old British manor reading room at dusk: walnut shelves, amber firelight, a rainy window, burgundy upholstery, a man with his feet up, tea, and a sleeping Bernese Mountain Dog. The room establishes the atmosphere; the working bookshelf below it contains every published essay.

## Research and direction

- [Nenrikido](https://nenrikido.neocities.org/) combines animated pixel characters, an ordinary blog, a digital library, and a virtual pet. The useful lesson was to let small ambient details coexist with obvious navigation.
- [Pixeldew](https://pixeldew.nekoweb.org/pages/home.html) describes its personal site as a cozy pixel garden. It informed the sense of a small, personal place rather than a publication feed.
- [Bruno Simon](https://bruno-simon.com/) makes exploring a setting part of a personal site's appeal, with explicit audio and input controls. Here that idea is implemented with static imagery and CSS rather than a 3D engine.
- [Crafty Ginger's bookshelf concept](https://jessijennings.squarespace.com/digital-design-portfolio/crafty-ginger-website-branding-design) connects a physical shelf metaphor to editorial content. The shelf here also has search and a text-list view so visual exploration never becomes a requirement for finding an essay.

No artwork or code from these sites is included.

## Visual system

Warm ink `#191713`, parchment `#e9ddc7`, antique gold `#d4a86d`, muted walnut dividers, and eight cloth-binding colors. Spectral is used for reading and book titles; VT323 provides restrained pixel lettering on room controls and catalogue labels. Both fonts are hosted locally and their SIL Open Font Licenses are in `app/fonts/`.

The default is firelit dark mode, with a parchment light theme. The article layout uses a restrained reading column, left-aligned prose, visible date/category/reading time, code scrolling, and the existing previous/next article links. The portrait favicon is preserved.

## Assets and motion

Original room, dog, and flame artwork was generated for this project with OpenAI image generation. The committed WebP files in `public/library/` are the production assets; no external image service is needed. The room is 1008 × 567, the dog is a two-pose sprite strip, and the fire is a four-frame strip. Together the desktop assets are 227 KiB; mobile-specific variants total just 57 KiB. CSS uses nearest-neighbor rendering to preserve the pixel edges.

`ReadingRoom.tsx` places the sprites, steam, and rain using percentages relative to the room artwork. If the composition changes, realign these positions together. The dog breathes gently, looks up periodically, and responds to a click or keyboard activation. Fire cycles through four frames at five changes per second. The room pauses when outside the viewport or in a hidden tab. The pause control and `prefers-reduced-motion` both stop ambient animation.

Sound is off initially. The small audio module is imported only after a request to play sound. It synthesizes an eight-second fire/crackle loop with Web Audio; there is no audio download or third-party request. Audio suspends off screen or in a hidden tab and the context is closed on navigation.

## Books and reading

Published MDX metadata is rendered into the complete bookshelf on the server. Adding a published article adds its book automatically; draft filtering, URLs, canonical metadata, sitemap, and structured data retain their existing behavior. The entire archive remains in the initial document to support native scroll restoration.

Books are real links with prefetch disabled. An ordinary click enhances them with a native modal preview, including trapped focus, Escape/backdrop dismissal, and focus restoration to the selected book. Modified clicks and JavaScript-free browsing follow the article URL directly. Books reflow to four columns on narrow phones. Search, collection filters, and the list view are optional enhancements. The article footer returns to the current book's stable `post-<slug>` anchor.

## Verification

```sh
npm ci
npm run lint
npm run build:cloudflare
npm run typecheck
npx playwright install --with-deps chromium webkit
npm run test:e2e
```

The browser suite exercises the exported site in desktop Chromium and mobile WebKit, including filtering, search, previews, focus restoration, navigation and history, sound, reduced motion, light/dark persistence, 320px layout, no-JavaScript reading, and axe WCAG A/AA checks. GitHub Actions runs this suite alongside lint, type checking, and the Cloudflare build. No animation or game-engine runtime dependency was added.

A local Lighthouse run against the production export with its standard mobile simulation scored **96 performance / 100 accessibility / 100 best practices / 100 SEO**: 0.8s first paint, 2.7s largest paint, 60ms blocking time, zero layout shift, and 361 KiB total transfer. These are lab results, not a guarantee for every network or device.
