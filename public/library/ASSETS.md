# Library assets

Original artwork created for this project with OpenAI's **built-in image generation tool**. The room preserves its detailed mansion composition with a slightly stronger pixel grid; its empty hearth receives a separate animated log fire. Twelve shelf bays hold the actual blog links, using antique leather textures and readable full-title cards.

| File | Dimensions | Size |
| --- | --- | --- |
| `reading-room.avif` | 896 × 504 | 62,741 bytes |
| `reading-room.webp` | 896 × 504 | 150,028 bytes |
| `reading-room-mobile.avif` | 672 × 378 | 40,950 bytes |
| `reading-room-mobile.webp` | 672 × 378 | 95,130 bytes |
| `bernese-fireside.webp` | 320 × 112, two 160 × 112 poses | 12,334 bytes |
| `fire-sprites.webp` | 576 × 128, six 96 × 128 frames | 28,936 bytes |
| `book-bindings.webp` | 192 × 96, six 32 × 96 textures | 12,444 bytes |

The browser selects one AVIF background, with WebP as a fallback. Total scenery is **92.4 KiB on mobile / 113.7 KiB on desktop** for AVIF-capable browsers (145.4 / 199.0 KiB with WebP). Backgrounds use nearest-neighbour resampling, AVIF quality 52 / 4:4:4 and WebP quality 88. Fire frames are extracted from the generated six-column strip, resized with nearest-neighbour sampling and encoded as WebP quality 78 / alpha quality 80. The lower log layer stays still while flame silhouettes animate above it. Separate CSS embers occasionally pop and drift upward. Binding cells are cropped from the six generated spines and encoded at WebP quality 86. No scene assets are fetched from third-party hosts.

## Refined room prompt

Edit of the existing detailed room, built-in tool. Output is resized into the four `reading-room*` files above.

> Use case: style-transfer and precise-object-edit. Edit target: supplied old British mansion library background. Preserve the exact 16:9 composition, object positions, lighting, colours, architecture, six empty shelf bays on each side of the fireplace, snowy window and outside landscape, old painting, rug, side table with tea, red leather armchair and matching pouffe. Reader's head and torso stay completely hidden behind the chair: only existing arm and legs visible, feet stay on pouffe. NO DOG and NO TEXT. Make this SAME image just slightly more pixelated, consistent with the lovely small crisp pixels of its snowy exterior: disciplined 2-3 pixel clusters, warm detailed 1990s adventure-game pixel artwork, restrained dithering, no smoothing, no major redesign, no chunky cartoon outlines. Keep all shelf edges and camera alignment identical. The only object edit: remove the little glowing logs/coals and brass grate in the fireplace opening, leaving clean dark soot-brown brick and a dark level hearth floor inside the same unchanged carved stone fireplace. An animated roaring log fire will be layered there later. Preserve the warm reflected glow on the fireplace surround and floor. Do NOT change any furniture arrangement or add books to the empty shelf bays. Output wide 16:9 image.

## Roaring log fire prompt

Generated with the built-in tool, saved as `public/library/fire-sprites.webp` after frame packing and compression.

> Use case: stylized-concept. Asset: animation sprite sheet for a cosy old British mansion pixel-art library fireplace. Create EXACTLY SIX consecutive animation frames in one perfectly aligned horizontal strip of equal 256x256 cells, canvas1536x256, transparent background with real alpha. Each frame shows the SAME very beautiful full roaring wood fire, front view with slight view down onto three overlapping substantial split oak logs, clear dark charred bark, visible circular ochre end-grain, ember-red fissures and a small glowing coal bed. Several beautiful layered tongues of amber, tangerine and pale butter-yellow flame dance upwards BETWEEN and BEHIND the clearly visible logs; varied slender tapering tongues, lacy negative space, natural roaring wood fire, absolutely not one single teardrop/gas flame. No smoke. Warm golden luminous light. Each fire occupies x28..228 and y30..230 within its own256square cell; all logs grounded at y222 on the same stable base. In ALL SIX frames the logs must be identical in shape, scale, placement and illumination: ONLY the flame tongues change silhouette in a natural fluid loop (right, centre, left and curl), not a bouncing whole fire. Detailed hand-placed pixel-art aesthetic using crisp 2px pixel clusters, limited warm 16-colour palette, like tasteful 1990s adventure game fireplace art; avoid photorealism, smooth vector curves, glossy cartoon shapes. No fireplace, no fire surround, no grate, no andirons, no floor, no border, no text, no numbers. Real transparent space around every frame. This asset will fit inside an existing dark brick hearth. Flame is broad and lush but leaves the substantial logs clearly visible.

## Vintage bindings prompt

Generated with the built-in tool, saved as `public/library/book-bindings.webp` after extracting six texture cells. Volume numbers are accessible HTML, never baked into the image.

> Asset type: pixel-art game texture atlas, exactly SIX old leather BOOK SPINES side by side, front elevation, on transparent background. Canvas1536x1024: six equal256x1024 cells. Each spine is tall and narrow, completely fills its cell width and height with NO margin (edge to edge leather). Style: rich but crisp warm detailed adventure-game pixel art for walnut bookshelves in an old British mansion. Each spine has rubbed aged leather grain, slightly rounded illuminated left edge, dark crease at right, clear antique raised horizontal binding cords near the top and bottom, delicate double-line gold leaf tooling in faded brass. Colours left to right: oxblood burgundy, dark forest green, tobacco brown, midnight navy, deep aubergine, warm chestnut. The centre of EACH spine has a small plain dark leather rectangular label bordered in old brass, absolutely blank, no text anywhere; a tiny elegant gold botanical fleur-de-lis above the label. Varied subtle old-world tooling on each volume. Restrained antique elegance; look like real old embossed leather book spines depicted with discrete pixel clusters, not bright modern buttons or rectangles. Everything crisp, no glossy plastic, no gradients that look vector, no cartoon outline. No visible front covers, no perspective, no pages, no bookshelves, no scenery, no cast shadow beyond the spines. All six have identical height, consistent warm light from above right. No letters, no titles, no words, no numbers anywhere.

## Sleeping dog prompt

Generated with the built-in tool using the detailed room as a style reference and the sleeping pose as a pose reference. Saved as `public/library/bernese-fireside.webp`.

> Use case: stylized-concept. Create a transparent two-frame sprite strip of a sleeping Bernese Mountain Dog for the supplied British mansion library. Image 1 is a STYLE AND CAMERA reference only; do not include the room. Image 2 is a POSE reference only, but reverse its direction: the dog's head should point upper RIGHT toward a fireplace while the viewer sees its back and rump at lower LEFT. Match image 1's richly shaded, finely detailed pixel illustration, warm amber firelight on the fur, dark brown/black outlines and natural anatomy. NOT chunky flat GBA/Pokemon shapes. Black coat, rust cheek and paws, white nape/chest and tail-tip markings, recognizable Bernese. A relaxed grown dog curled comfortably asleep, nose resting on front paws, face turned away from camera. No eye contact, no front portrait. Two equal horizontal cells, each 160x112 logical pixels: left asleep, right only a tiny sleepy ear/head shift, still resting and facing the fire. Identical position, size, floor baseline and padding between frames. Plenty of clear separation between cells, no overlapping fur. Rich fine pixel clusters rather than smooth photographic hair. Transparent background with a subtle contact shadow only. No rug, fire, furniture, text, border, sleep symbols or interface. Output the complete two-frame strip on true transparency.

## Fireplace audio

`fireplace.m4a` is adapted from **Silencyo_CC_Fire in Fireplace_Close Up_Reverberant2.aif** by **silencyo**, recorded with two Neumann KM 84 microphones in a real fireplace room.

- Original and licence: https://freesound.org/people/silencyo/sounds/81801/
- Licence: Creative Commons Zero 1.0 (CC0), https://creativecommons.org/publicdomain/zero/1.0/
- Source: https://cdn.freesound.org/previews/81/81801_280284-hq.mp3
- Licence verified: 1 November 2026.
- Changes: excerpt, 70 Hz high-pass and 4.5 kHz low-pass filtering, gentle compression of sharp snaps, loudness balancing to approximately −25 LUFS with restrained peaks, a two-second equal-power overlap at the loop boundary, stereo 32 kHz / 96 kbps AAC encoding. Original field sound; no synthesized noise, music, or rain.
- Playback starts only after the visitor enables sound. It is excluded from service-worker precaching, fades in at 35% volume, and pauses when the document is hidden. The source credit is also linked in the in-room About panel.

## Original snowy room edit prompt

Built-in imagegen edit of the existing room: preserve the exact composition, pixel art style, warm amber lighting, furniture, ornaments, fireplace, resting man, pouffe, tea, painting, rug, and camera. Replace rain with a blue snowy winter night, snow-covered evergreen trees and distant manor lights; retain the leaded window. Empty the six shelf bays immediately left of the fireplace (26.5–36% of the image) and the six bays immediately right (71.2–81%), keeping the shelf boards, outer shelves, books, plants and globe. No dog, flames, UI or text baked into the background. Keep the 1672:941 composition.

Production room files: `reading-room.avif`, `reading-room-mobile.avif`, `reading-room.webp`, and `reading-room-mobile.webp`, all in this directory. The WebP files provide a fallback when AVIF is unsupported.

## Original armchair pose edit prompt

Edited with the built-in imagegen tool on 1 November 2026. The reader's head and torso are concealed by the chair, with only arms and legs visible and the feet supported by the pouffe. The resulting artwork is exported to the same four production room files above (1344×756 desktop, 1008×567 mobile).

Exact prompt:

> Use case: precise-object-edit. Edit target: the supplied pixel-art mansion library background. Change ONLY the seated man and his relationship to the existing red leather armchair and round matching pouffe at the far right. The seated reader is reclined deep inside the chair, viewed from behind: the chair completely conceals his head, neck, shoulders and torso. Absolutely no head or face should be visible above or beside the chair. Only his relaxed dark-sleeved forearms/hands resting naturally along the armrests, and his two dark-trousered legs with shoes, should be visible around the chair. Arrange both legs in a natural relaxed perspective from the chair seat diagonally left towards the existing pouffe. BOTH heels/shoes must rest directly on the TOP cushion of that round pouffe, visibly supported and aligned with it, no hovering feet and no legs dangling beside the pouffe. Keep the pouffe's position and size unchanged and preserve the armchair's outer silhouette as closely as possible. Restore the bookshelf behind the removed head. Preserve ALL other pixels/composition as closely as possible: exact room layout, camera, 1672:941 aspect ratio, walnut shelves including all twelve EMPTY shelf bays used by interactive HTML books, snowy window, fireplace, glowing embers, mantelpiece and painting, rug, lamps, cup of tea and side table. Match existing detailed pixel-art style, warm amber palette and firelight. No dog, new objects, UI, text, watermarks or full flames added. This is an exact-layout web background; no zoom, crop, reframing or repositioning of architecture.
