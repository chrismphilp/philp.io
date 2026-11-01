# The Philp Library

The website is an explorable isometric pixel diorama of a library in an old British mansion, with a chunky retro, 8-bit-inspired aesthetic. Snow falls beyond the leaded window; a log fire burns beside a sleeping Bernese Mountain Dog; a man rests in an armchair with his feet on a pouffe and tea at his elbow. Published posts are actual book spines in nine bays across three angled planes of the illustrated walnut shelves. There is no separate welcome page or bookshelf beneath the scene.

## Research and direction

- [Nenrikido](https://nenrikido.neocities.org/) combines a personal blog, digital library, animated pixel characters, and a virtual pet. It informed the small ambient details and personal character of the room.
- [Bruno Simon](https://bruno-simon.com/) treats a personal website as a world to explore, with discoverable objects and explicit input/audio controls. This library uses the same spatial-navigation idea with HTML, compressed artwork, native scrolling and CSS, rather than a 3D runtime.
- [Pixeldew](https://pixeldew.nekoweb.org/pages/home.html) and [Crafty Ginger’s bookshelf concept](https://jessijennings.squarespace.com/digital-design-portfolio/crafty-ginger-website-branding-design) informed the cozy personal setting and physical-book metaphor during the original research.

No artwork or code from these sites is included.

## Exploring and reading

`LibraryShell` persists in the root layout. The room fills the viewport between a 48px header and a 52px bottom bar (plus the device safe area). Buttons keep a minimum 44px touch target. Explore by native touch swiping or mouse dragging; there are no location-jump buttons. The complete 4:3 floating diorama fits desktop displays, including 1366×768 and 1280×720 laptops. Fine-pointer desktops can scale down to 24px book targets; touch and narrow-window layouts retain a 1,000px minimum room width and 28px book targets; the initial view centres the hearth and dog. Native panning reveals the rest of the room, and locating a book preserves the scale. Numbered antique leather spines have horizontal, complete title cards on hover/focus and full-title previews on tap. Bookcase arrows and the catalogue stay in a single row even on short landscape displays. Keyboard focus brings off-screen books into view.

`RoomBooks` places real article links in the empty bays of the room image. Hovering or focusing lifts a spine and displays its full title and reading time. Selecting a book opens a native dialog with a cover, description and reading link; Escape returns focus to that book. Modified clicks and JavaScript-free browsing follow the article URL directly. The room mounts at most 24 book links: three rows of two books on each narrow wall plane, and three rows of four books on the broad right-hand plane. The shelf links follow the artwork’s opposing isometric angles, so they sit on the actual shelf edges. Previous/Next Bookcase controls are always visible; the current 37 posts occupy two bookcase pages. The catalogue contains every published post. Without JavaScript, visible books remain direct links and a fallback navigation opens the complete category collections.

The card catalogue offers title/topic search, category filters, direct reading links, and a Find on Shelf button. It is an optional shortcut within the room. The dog sleeps facing away toward the fire, with occasional tiny ear/head movements and a sleepy response when greeted; the tea, fire and painting have small interactions.

Opening an article renders the server-generated MDX page in a reading surface over the room. It retains its real URL, canonical metadata, structured data, imagery, code highlighting and adjacent-post links. The room, camera and audio player survive client navigation. Back to the Room returns to the corresponding book. Direct article visits, browser Back, `/tech`, `/misc`, `/quotes`, and JavaScript-free links still work. Static export remains enabled; no intercepting routes or server-only runtime feature is required.

## Adding posts

Add an MDX file under `articles/` with the existing frontmatter format and publish it by leaving `draft` false or absent. `getPublishedPostMetadata` and the date-descending sort automatically supply the room and catalogue on the next build. No shelf markup, coordinates, asset changes or manual page counts are needed. `utils/library.ts` calculates page count from the collection and resolves a slug to its current bookcase, so article return links keep working when newer posts push an older book onto a later page. Binding colour and height are derived from the slug, so publishing does not recolour existing books. Only the 24 visible shelf links are mounted; the searchable catalogue is the complete index.

## Artwork and typography

The room, dog and flames are original artwork generated with OpenAI’s built-in image generation tool. The floating cutaway room combines a snowy blue window, bold walnut architecture, broad russet and amber pixel shapes, antique leather spines with chunky brass tooling, a sleeping Bernese facing the hearth, and a roaring amber log fire. The dog and fire were generated specifically for the elevated isometric camera. Collection pages show full covers with horizontally wrapped titles; titles are never ellipsized or constrained to a fixed spine height. The armchair conceals the reader’s head and torso; only his arms and legs show, with shoes supported on the pouffe. Asset files, prompts and audio attribution are documented in [public/library/ASSETS.md](../public/library/ASSETS.md).

The background is a 480×360 AVIF with transparent space beyond the floating floor and a WebP fallback; phones receive a 400×300 version. The dog uses two 100×68 poses, the fire uses four 80×80 frames, and six 16×48 leather bindings share one tiny atlas. Total scenery weighs **53.3 KiB on mobile / 61.5 KiB on desktop** in AVIF-capable browsers (76.6 / 93.2 KiB with WebP). Pixel edges use nearest-neighbour rendering; there is no video, game engine or animation dependency. Spectral and VT323 are hosted locally with their SIL Open Font Licenses in `app/fonts/`.

Warm walnut, parchment, amber and brass form the palette. Article readers can choose a dark or light paper theme. Book previews use the same leather-binding colours as the selected spine.

## Motion and sound

Ambient motion uses CSS: a four-frame flame sheet over stationary charred logs, gentle firelight, a two-pose Bernese sprite, tea steam, eighteen small snowflakes, and ten embers. Each ember has a different duration, delay, drift and starting position, with a quiet interval, a brief upward pop and a slow fading rise; only transform and opacity animate. These deterministic values avoid hydration mismatches while creating irregular, slowly drifting sparks. There is no canvas, video, continuous JavaScript render loop, animation dependency, or third-party request. The pause button and `prefers-reduced-motion` stop the scene. Animation pauses in a hidden document and behind the article reader.

The original synthesized noise has been removed. Sound now uses a real stereo indoor fireplace field recording by **silencyo**, released under [CC0](https://freesound.org/people/silencyo/sounds/81801/). The excerpt is filtered to soften high-frequency snaps, gently compressed, balanced to approximately −25 LUFS, joined with a two-second overlapping boundary, and encoded as a roughly 750 KiB AAC file. The resulting loop is 62 seconds long. Attribution, source and processing details are in `public/library/ASSETS.md` and the room’s About panel.

A single `FireplaceProvider` owns playback. Sound starts off; the recording is requested only after an explicit sound gesture and is excluded from service-worker precaching. Playback fades in at 35% volume, supports a volume slider, pauses when the document is hidden, and is controllable both in the room and while reading. Audio resources are released on unmount. A failed request leaves browsing usable and offers a retry.

## Verification

```sh
npm ci
npm run lint
npm run build:cloudflare
npm run typecheck
npx playwright install --with-deps chromium webkit
npm run test:e2e
```

Growth checks cover 0, 24, 25, 73 and 1,000 posts, including page boundaries, missing slugs, publishing across a page boundary and stable bindings. Browser checks also visit every bookcase, locate older posts across pages, and verify direct article returns/reloads. The suite exercises the exported site in desktop Chromium, iPhone WebKit and Android Chromium: the complete diorama fitting desktop displays, minimum book target sizes, actual in-scene book links, previews and focus restoration, catalogue filtering/search/locating, reader navigation and browser history, native panning, compact controls, complete long titles, on-demand real audio and failure handling, reduced motion, narrow portrait and landscape layouts, JavaScript-free browsing, and axe WCAG A/AA checks in both reader themes. Mobile tap flows run at 320×568, 360×640, 390×844, 568×320, 667×375, 740×360 and 844×390; native Android touch gestures also verify panorama panning and article scrolling. These are browser/device emulation checks, not physical-device tests. GitHub Actions runs the same lint, build, type and browser checks.

A Lighthouse 13.5 mobile lab run against the final production export measured **96 performance / 100 accessibility / 100 best practices / 100 SEO**, **1.1s first paint**, **2.8s largest paint**, **30ms total blocking time**, **zero layout shift**, and **283 KiB initial transfer**. Audio remains outside the initial page load. These are simulated lab measurements, not field guarantees.
