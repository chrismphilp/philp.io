# Library assets

Original artwork made for this site with OpenAI's **built-in image generation tool** (generation and style-transfer edit modes), 1 November 2026. No game artwork was copied. All production files are local; the website makes no image-generation requests.

| File | Logical pixels | Encoding | Size |
| --- | --- | --- | --- |
| `room-16bit.webp` | 384 × 216 | WebP quality 90 | 28,918 bytes |
| `bernese-16bit.webp` | 96 × 32, two 48 × 32 poses | Lossless WebP with alpha | 3,216 bytes |
| `fire-16bit.webp` | 64 × 64, four 32 × 32 frames in a 2 × 2 grid | Lossless WebP with alpha | 2,004 bytes |

The source images were resized to their logical grids using nearest-neighbour resampling. CSS `image-rendering: pixelated` enlarges them; the scene uses the same files on phones and desktop. The background deliberately leaves six bays empty for real HTML links. The old detailed backgrounds and sprite strips have been removed. Total scenery payload: **34,138 bytes (33.3 KiB)**.

## Final room edit prompt

> Use case: style-transfer. Edit target: the supplied mansion room background. Completely repaint its rendering into charming COARSE 16-bit pixel art like a Stardew Valley farmhouse interior or Pokemon GBA room. This is a pixel tileset GAME SCREEN, not an oil painting or a realistic interior. Keep the exact 16:9 composition and all object positions, but radically simplify shapes into large clean flat pixel clusters, bold dark brown pixel outlines and 3-shade ramps per material. Actual logical grid 384x216; enlarged nearest neighbour, no subpixel details, no grain, NO fine texture, no dither, no gradients, no photorealistic light, no blur. Restrict to 32 harmonious flat colours: warm honey oak, chestnut outlines, muted rust red rug/chair, cream stone hearth, pale golden lamps, cool blue snowy window. Floor planks should be flat colour with just 2 or 3 simple dark marks. Rug should have a simple chunky diamond border and empty red centre. Bookcases should be very clear cartoon game furniture, with the exact SIX empty dark shelf bays (three on left at x23.6–37.5%, three on right at x69.4–85.9%, bay floor y16.8%,26.2%,35.3%) maintained for HTML book sprites. Preserve the fireplace opening x45–59% y30–46%, low logs at y44%, no flames. Preserve snowy window x0–18% y0–30%, painting above fireplace, tea at far right, big rug lower centre. Preserve armchair at lower right hiding the reader's head and torso: ONLY his forearm and legs visible, with both shoes naturally supported on the pouffe to the left of the chair. Simplify everything into adorable readable game props with strong pixel silhouettes. NO dog, NO flames, NO words or UI. The whole room must look hand-pixelled by a game artist, with deliberate square pixels and lots of flat colour areas.

## Dog generation brief

Transparent two-frame sprite strip, two equal 48 × 32 logical-pixel cells. A small sleeping Bernese Mountain Dog, viewed from above and behind, curled on its belly with its head at upper left toward the fireplace and its back/rump facing the viewer. Black coat, rust legs, white collar and tail marking; no eye contact or front-facing portrait. Left pose sleeping, right pose a tiny sleepy ear/head adjustment still facing away. Keep size, baseline, padding and silhouette consistent. Flat 16-bit pixel clusters, a restrained palette, no fur texture, antialiasing, background, furniture, text or baked-in sleep symbols.

## Fire generation brief

Transparent four-frame 2 × 2 sheet, each cell 32 × 32 logical pixels. A low, wide, cosy hearth flame with three softly rounded, stepped tongues in amber, gold and pale yellow. Identical baseline and padding, gently varied flame shapes, six flat colours, crisp 16-bit pixels. No logs, smoke, background, borders, text or detached sparks. Embers are separate lightweight CSS particles so they can rise slowly at different intervals.

## Fireplace audio

`fireplace.m4a` is adapted from **Silencyo_CC_Fire in Fireplace_Close Up_Reverberant2.aif** by **silencyo**, recorded with two Neumann KM 84 microphones in a real fireplace room.

- Original and licence: https://freesound.org/people/silencyo/sounds/81801/
- Licence: Creative Commons Zero 1.0 (CC0), https://creativecommons.org/publicdomain/zero/1.0/
- Source: https://cdn.freesound.org/previews/81/81801_280284-hq.mp3
- Licence verified: 1 November 2026.
- Changes: excerpt, 70 Hz high-pass and 4.5 kHz low-pass filtering, gentle compression of sharp snaps, loudness balancing to approximately −25 LUFS with restrained peaks, a two-second equal-power overlap at the loop boundary, stereo 32 kHz / 96 kbps AAC encoding. Original field sound; no synthesized noise, music, or rain.
- Playback starts only after the visitor enables sound. It is excluded from service-worker precaching, fades in at 35% volume, and pauses when the document is hidden. The source credit is also linked in the in-room About panel.
