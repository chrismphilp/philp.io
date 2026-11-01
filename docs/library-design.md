# The Philp Library

The website is an explorable pixel-art room in an old British mansion. Snow falls beyond the leaded window; a log fire burns beside a sleeping Bernese Mountain Dog; a man rests in an armchair with his feet on a pouffe and tea at his elbow. Published posts are actual book spines in twelve bays in the illustrated walnut shelves. There is no separate welcome page or bookshelf beneath the scene.

## Research and direction

- [Nenrikido](https://nenrikido.neocities.org/) combines a personal blog, digital library, animated pixel characters, and a virtual pet. It informed the small ambient details and personal character of the room.
- [Bruno Simon](https://bruno-simon.com/) treats a personal website as a world to explore, with discoverable objects and explicit input/audio controls. This library uses the same spatial-navigation idea with HTML, compressed artwork, native scrolling and CSS, rather than a 3D runtime.
- [Pixeldew](https://pixeldew.nekoweb.org/pages/home.html) and [Crafty Ginger’s bookshelf concept](https://jessijennings.squarespace.com/digital-design-portfolio/crafty-ginger-website-branding-design) informed the cozy personal setting and physical-book metaphor during the original research.

No artwork or code from these sites is included.

## Exploring and reading

`LibraryShell` persists in the root layout. The room fills the viewport, with a slim controls bar and a navigation dock. The panorama supports native touch scrolling and mouse dragging. Place buttons move to the snowy window, either shelf, the fireplace, or the tea corner. Shelf buttons move closer to make individual spines easier to read and tap on phones; touch devices retain this close-up in landscape. The dock switches to a single row on short landscape displays so all five destinations and the catalogue remain reachable. Selecting Fireside restores the wide view, centred low enough to keep the dog visible on shorter phones. Keyboard focus brings an off-screen book into view.

`RoomBooks` places real article links in the empty bays of the room image. Hovering or focusing lifts a spine and displays its full title and reading time. Selecting a book opens a native dialog with a cover, description and reading link; Escape returns focus to that book. Modified clicks and JavaScript-free browsing follow the article URL directly. All 37 current published posts are present in the initial HTML. The room accommodates 48 books per group of shelves; later posts automatically add another group, and the catalogue searches the complete collection.

The card catalogue offers title/topic search, category filters, direct reading links, and a Find on Shelf button. It is an optional shortcut within the room. The dog looks up when greeted and periodically wakes on his own; the tea, fire and painting have small interactions.

Opening an article renders the server-generated MDX page in a reading surface over the room. It retains its real URL, canonical metadata, structured data, imagery, code highlighting and adjacent-post links. The room, camera and audio player survive client navigation. Back to the Room returns to the corresponding book. Direct article visits, browser Back, `/tech`, `/misc`, `/quotes`, and JavaScript-free links still work. Static export remains enabled; no intercepting routes or server-only runtime feature is required.

## Artwork and typography

The room, dog and flames were generated for this project using OpenAI’s built-in image generation tool. The room edit preserves the original scene while replacing rain with a snowy winter landscape and clearing the twelve functional shelf bays. The production assets and the exact edit prompt are documented in [public/library/ASSETS.md](../public/library/ASSETS.md).

The desktop background is a 1344px-wide AVIF with a WebP fallback; phones receive a 1008px-wide version because they pan across the same large scene. Dog and fire sprite strips are shared across sizes. Total scene imagery is approximately **137 KiB desktop / 109 KiB mobile** in AVIF-capable browsers (241 / 178 KiB with the WebP fallback). Pixel edges are preserved with nearest-neighbour rendering. Spectral and VT323 are hosted locally with their SIL Open Font Licenses in `app/fonts/`.

Warm walnut, parchment, amber and brass form the palette. Article readers can choose a dark or light paper theme. Book previews use the same cloth-binding colours as the selected spine.

## Motion and sound

Ambient motion uses CSS: a four-frame flame strip, gentle firelight, a two-pose Bernese sprite, tea steam, and eighteen small snowflakes. There is no canvas, video, continuous JavaScript render loop, animation dependency, or third-party request. The pause button and `prefers-reduced-motion` stop the scene. Animation pauses in a hidden document and behind the article reader.

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

The suite exercises the exported site in desktop Chromium, iPhone WebKit and Android Chromium: actual in-scene book links, previews and focus restoration, catalogue filtering/search/locating, reader navigation and browser history, panning and place controls, on-demand real audio and failure handling, reduced motion, narrow portrait and landscape layouts, JavaScript-free browsing, and axe WCAG A/AA checks in both reader themes. Mobile tap flows run at 320×568, 360×640, 390×844, 568×320, 667×375, 740×360 and 844×390; native Android touch gestures also verify panorama panning and article scrolling. These are browser/device emulation checks, not physical-device tests. GitHub Actions runs the same lint, build, type and browser checks.

A local Lighthouse mobile lab run against the production export measured **94 performance / 100 accessibility / 100 best practices / 100 SEO**, **0.9s first paint**, **3.1s largest paint**, **30ms total blocking time**, **zero layout shift**, and **338 KiB initial transfer**. The opt-in audio file is excluded from that initial load. These are simulated lab measurements, not field guarantees.
