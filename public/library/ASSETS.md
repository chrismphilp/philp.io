# Library assets

Original artwork created for this project with OpenAI's **built-in image generation tool**. The chosen direction combines an **isometric pixel diorama** with a **chunky retro, 8-bit-inspired aesthetic**: a floating cutaway mansion library, warm walnut and ochre, snowy blue windows, bold pixel silhouettes, and vintage gold-tooled books.

| File | Dimensions | Size |
| --- | --- | --- |
| `reading-room.avif` | 480 × 360 | 36,765 bytes |
| `reading-room.webp` | 480 × 360 | 69,298 bytes |
| `reading-room-mobile.avif` | 400 × 300 | 28,451 bytes |
| `reading-room-mobile.webp` | 400 × 300 | 52,230 bytes |
| `bernese-fireside.webp` | 200 × 68, two 100 × 68 poses | 6,290 bytes |
| `fire-sprites.webp` | 320 × 80, four 80 × 80 frames | 17,138 bytes |
| `book-bindings.webp` | 96 × 48, six 16 × 48 textures | 2,742 bytes |

The browser selects one AVIF background, with WebP as a fallback. Total scenery is **53.3 KiB on mobile / 61.5 KiB on desktop** for AVIF-capable browsers (76.6 / 93.2 KiB with WebP). Nearest-neighbour resampling and CSS pixelated rendering preserve the deliberately coarse pixel grid. Backgrounds use AVIF quality 60 / 4:4:4 and WebP quality 90. Sprite atlases use WebP quality 90 with full alpha quality. No scene assets are fetched from third-party hosts.

The background has transparent space outside the floating floor. Its nine interactive shelf bays sit on three wall planes; HTML links follow each shelf's angle. The fireplace and rug are empty in the background so separate fire and dog sprites can move. The lower log layer stays still while four flame silhouettes animate above it. CSS embers occasionally pop and drift upward. Volume numbers and complete titles are accessible HTML, never baked into an image.

The generated source room was 1448 × 1086. Fire cells were cropped from a 1330 × 1182 two-by-two sheet at (100,35), (710,35), (100,595), (710,595), each 530 × 530, then packed horizontally. Dog cells were cropped from a 2135 × 736 strip at (40,55) and (1110,55), each 1000 × 680. The six binding cells share one atlas. These operations only resize, crop, pack and encode the generated artwork.

## Isometric room prompt

The isometric concept supplies the composition; the chunky retro concept supplies the visual style. Saved in the four `reading-room*` files above.

> Use case: style-transfer / production game background. Image1 is the EXACT ISOMETRIC ROOM COMPOSITION reference. Image2 is the CHUNKY RETRO PIXEL STYLE reference. Combine image1's beautiful miniature cutaway British mansion library with image2's big deliberately placed square pixels, bold dark outlines, limited warm colours and simplified clean shapes. 4:3 canvas, full floating diamond floor and both back walls in frame, 2:1 isometric diagonals. Transparent background beyond the room. Room fills canvas with a small margin all around. Left wall has a tall snowy blue leaded window and, immediately to its right near the back corner, ONE clearly defined tall walnut bookcase with FOUR evenly spaced EMPTY shelf bays. Right wall has a carved stone fireplace near the centre and, immediately to its right, ONE clearly defined walnut bookcase with FOUR evenly spaced EMPTY shelf bays. Each empty bay is broad enough for three thick interactive HTML books added later. Preserve these two empty bookcases very clearly; decorate only outer narrow shelving and mantel with books, greenery, clock, painting. Burgundy armchair lower right seen from behind completely conceals reader's head and torso; only hands on armrests and two trousered legs are visible, BOTH shoes resting directly on a matching pouffe in front of chair. Small side table with one cup of tea. Rich warm patterned rug in centre with big simple repeating pixel motifs. IMPORTANT: NO DOG anywhere, leave rug in front of hearth clear for animated dog. Fireplace opening is empty dark brick and stone floor, NO LOGS, NO FIRE, NO GRATE, NO FLAMES: animation will be layered inside later. Retain warm amber reflected light on stone and floor. Snow-covered trees seen through blue window. Style is visibly coarse 8-bit-inspired game art, logical 320x240-style pixel clusters, simple 2-3 tones per material, bold confident blocky contours and charming restrained detail. Rich warm tobacco wood, russet, ochre, honey, burgundy and deep teal-blue. NO realistic texture grain, no fine stippling, no modern glossy shading, no bloom, no 3D render, no smoothing. Preserve the elegant inviting mansion mood but simplify everything into chunky readable pixels. No text, UI, numbers, borders or captions.

## Isometric log fire prompt

The room supplies the style and camera reference. Saved as `fire-sprites.webp`.

> Use case: stylized-concept. Production transparent sprite atlas for the supplied chunky 8-bit-inspired ISOMETRIC library. Reference image is STYLE and CAMERA only. Create exactly FOUR animation frames in a precise TWO BY TWO grid, each equal square cell. In each cell the SAME lovely roaring log fire viewed from isometric camera above and to the LEFT of its front: front plane recedes DOWN TO THE RIGHT (2 horizontal pixels for 1 vertical pixel); logs have visible upper surfaces. A small low pile of three clear substantial charred oak logs with glowing red-orange cracks and an ember bed, supporting broad golden, orange and butter-yellow flame tongues. Fire suitable for an English mansion hearth, no campfire stone circle. Clean chunky hand-pixelled retro 8-bit-style shapes, bold dark brown outlines around solid logs, 16-24 warm colours, crisp large square clusters, NO realistic bark noise, NO photographic flame, NO smooth glow. Each logical96x96 cell: fire fits inside x12..84,y12..86, identical floor baseline y86, identical size, identical log positions. Flame tips change gently between four poses, wood MUST remain identical. Real transparent background with no coloured square, no floor, no fireplace, no grate, no smoke, no text, no borders. Keep all four cells precisely aligned and separated with transparent gutters. Distinct flame shapes rising vertically with gravity, do not tilt the flames diagonally. Logs show the isometric angle.

## Sleeping Bernese prompt

The room supplies the style and camera reference. Saved as `bernese-fireside.webp`.

> Use case: stylized-concept. Production transparent TWO FRAME HORIZONTAL sprite strip for the supplied chunky retro isometric British library. Reference is STYLE and elevated isometric CAMERA only, do not include room. A recognisable adult Bernese Mountain Dog with black coat, rust legs/cheeks and white chest/nape and tail tip curled comfortably asleep on its paws. The viewer sees its BACK and RUMP from above at lower LEFT; its small head and nose point UPPER RIGHT, AWAY from the viewer towards an offscreen fireplace. No eye contact, no visible frontal face, no big white frontal muzzle. The head rests on forepaws. Simple warm firelight rim on upper-right fur. TWO equal128x88 logical-pixel cells: first sleeping; second a tiny relaxed ear and head lift, still curled and facing away. Exactly same body, position, baseline and transparent margins in both cells. Crisp big square pixel clusters, 8-bit-inspired limited 12-colour warm palette, bold dark outline, simplified cute but anatomically plausible silhouette, like the supplied room's blocky furniture. No realistic hairy grain, no airbrushing, no gradients. A small pixel contact shadow immediately underneath only. True transparent background. No rug, scenery, fire, text, symbols or sleep letters.

## Chunky vintage bindings prompt

The room supplies the style reference. Saved as `book-bindings.webp`.

> Use case: stylized-concept. Production sprite texture atlas for the supplied ISOMETRIC CHUNKY RETRO PIXEL LIBRARY; reference is art style only. EXACTLY SIX vintage leather BOOK SPINES, straight-on orthographic view, edge to edge next to one another in six equal columns, each with identical width and height. Whole atlas aspect ratio TWO TO ONE, so each spine has width:height ONE TO THREE. Logical pixel resolution of each spine is 16 by 48, very coarse visible square blocks. Columns left to right: dark oxblood burgundy, forest green, warm ochre brown, midnight teal blue, aubergine, burnt chestnut. Bold dark brown edges, broad highlights along left edge, deep dark leather crease on right edge, chunky raised horizontal binding bands near top and bottom, restrained antique gold tooling with a small gold diamond ornament near top, simple worn tonal patches not fine texture. Blank dark rectangular title label bordered in dull gold in the middle of every spine, absolutely no text or numbers. Lovely bookish old mansion bindings, clear legible large pixel clusters, only 3 to 4 shades per spine plus antique brass. NO ornate tiny stippling, NO fine grain, NO modern flat vector, no smooth gradients. Each spine fills its entire cell with no empty margins. No visible covers, no side or top faces, no pages, no shelves, no scenery, no text, no letters or numbers, no UI. Consistent warm lighting across all six. This texture will be applied to clickable HTML book spines and titles will be added in code.

## Fireplace audio

`fireplace.m4a` is adapted from **Silencyo_CC_Fire in Fireplace_Close Up_Reverberant2.aif** by **silencyo**, recorded with two Neumann KM 84 microphones in a real fireplace room.

- Original and licence: https://freesound.org/people/silencyo/sounds/81801/
- Licence: Creative Commons Zero 1.0 (CC0), https://creativecommons.org/publicdomain/zero/1.0/
- Source: https://cdn.freesound.org/previews/81/81801_280284-hq.mp3
- Licence verified: 1 November 2026.
- Changes: excerpt, 70 Hz high-pass and 4.5 kHz low-pass filtering, gentle compression of sharp snaps, loudness balancing to approximately −25 LUFS with restrained peaks, a two-second equal-power overlap at the loop boundary, stereo 32 kHz / 96 kbps AAC encoding. Original field sound; no synthesized noise, music, or rain.
- Playback starts only after the visitor enables sound. It is excluded from service-worker precaching, fades in at 35% volume, and pauses when the document is hidden. The source credit is also linked in the in-room About panel.
