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
