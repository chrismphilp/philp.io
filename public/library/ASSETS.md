# Library assets

Original artwork created for this project with OpenAI's **built-in image generation tool**. The detailed mansion background is restored from commit `d28d938`, preserving the snowy window, walnut shelves, warm light and corrected armchair pose. Its twelve empty shelf bays now hold two functional book links each, with the current pagination and readable title cards.

| File | Dimensions | Size |
| --- | --- | --- |
| `reading-room.avif` | 1344 × 756 | 95,939 bytes |
| `reading-room.webp` | 1344 × 756 | 202,388 bytes |
| `reading-room-mobile.avif` | 1008 × 567 | 68,072 bytes |
| `reading-room-mobile.webp` | 1008 × 567 | 138,398 bytes |
| `bernese-fireside.webp` | 320 × 112, two 160 × 112 poses | 12,334 bytes |
| `fire-sprites.webp` | 480 × 160, four 120 × 160 frames | 18,082 bytes |

The browser selects one AVIF background, with WebP as a fallback. Total scenery is **96.2 KiB on mobile / 123.4 KiB on desktop** for AVIF-capable browsers (164.9 / 227.3 KiB with the WebP fallback). The dog is resized with nearest-neighbour sampling and encoded as WebP quality 92 with full-quality alpha. The restored flame strip plays slowly, with separate CSS embers drifting upward. No scene assets are fetched from third-party hosts.

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

## Snowy room edit prompt

Built-in imagegen edit of the existing room: preserve the exact composition, pixel art style, warm amber lighting, furniture, ornaments, fireplace, resting man, pouffe, tea, painting, rug, and camera. Replace rain with a blue snowy winter night, snow-covered evergreen trees and distant manor lights; retain the leaded window. Empty the six shelf bays immediately left of the fireplace (26.5–36% of the image) and the six bays immediately right (71.2–81%), keeping the shelf boards, outer shelves, books, plants and globe. No dog, flames, UI or text baked into the background. Keep the 1672:941 composition.

Production room files: `reading-room.avif`, `reading-room-mobile.avif`, `reading-room.webp`, and `reading-room-mobile.webp`, all in this directory. The WebP files provide a fallback when AVIF is unsupported.

## Armchair pose edit prompt

Edited with the built-in imagegen tool on 1 November 2026. The reader's head and torso are concealed by the chair, with only arms and legs visible and the feet supported by the pouffe. The resulting artwork is exported to the same four production room files above (1344×756 desktop, 1008×567 mobile).

Exact prompt:

> Use case: precise-object-edit. Edit target: the supplied pixel-art mansion library background. Change ONLY the seated man and his relationship to the existing red leather armchair and round matching pouffe at the far right. The seated reader is reclined deep inside the chair, viewed from behind: the chair completely conceals his head, neck, shoulders and torso. Absolutely no head or face should be visible above or beside the chair. Only his relaxed dark-sleeved forearms/hands resting naturally along the armrests, and his two dark-trousered legs with shoes, should be visible around the chair. Arrange both legs in a natural relaxed perspective from the chair seat diagonally left towards the existing pouffe. BOTH heels/shoes must rest directly on the TOP cushion of that round pouffe, visibly supported and aligned with it, no hovering feet and no legs dangling beside the pouffe. Keep the pouffe's position and size unchanged and preserve the armchair's outer silhouette as closely as possible. Restore the bookshelf behind the removed head. Preserve ALL other pixels/composition as closely as possible: exact room layout, camera, 1672:941 aspect ratio, walnut shelves including all twelve EMPTY shelf bays used by interactive HTML books, snowy window, fireplace, glowing embers, mantelpiece and painting, rug, lamps, cup of tea and side table. Match existing detailed pixel-art style, warm amber palette and firelight. No dog, new objects, UI, text, watermarks or full flames added. This is an exact-layout web background; no zoom, crop, reframing or repositioning of architecture.
