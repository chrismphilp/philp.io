# Library assets

The room, Bernese Mountain Dog, and flame sprites are original artwork generated for this project with OpenAI's built-in image generation tool. The room is served locally as AVIF with a WebP fallback; sprite strips use WebP. The snowy room was edited from the original rainy illustration, preserving furniture, lighting, and geometry while clearing twelve bays for functional HTML book spines.

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
