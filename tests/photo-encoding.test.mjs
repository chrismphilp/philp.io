import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import rehypeAvifPhotos from '../utils/rehypeAvifPhotos.mjs';
import { photoSrcSet } from '../utils/photoSources.mjs';

const run = promisify(execFile);
const script = fileURLToPath(new URL('../scripts/generate-photo-avif.mjs', import.meta.url));

test('EXIF-rotated sources have matching dimensions, exported variants and reusable encodes', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'photo-encoding-'));
  try {
    const dir = path.join(root, 'public');
    const src = '/articles/images/camera/photo.jpg';
    const file = path.join(dir, src);
    await mkdir(path.dirname(file), { recursive: true });
    const fixture = (background) =>
      sharp({ create: { width: 800, height: 600, channels: 3, background } })
        .withMetadata({ orientation: 6 })
        .jpeg()
        .toFile(file);
    await fixture('red');
    const image = {
      type: 'element',
      tagName: 'img',
      properties: { src, width: 800, height: 600 },
    };
    const tree = { type: 'root', children: [image] };
    await rehypeAvifPhotos({ dir })(tree);
    assert.equal(tree.children[0].tagName, 'picture');
    assert.equal(tree.children[0].children[0].properties.type, 'image/avif');
    assert.equal(image.properties.width, 600);
    assert.equal(image.properties.height, 800);
    const sources = photoSrcSet(src, image.properties.width)
      .split(', ')
      .map((s) => s.split(' ')[0]);
    assert.equal(sources.length, 2);
    const first = await run(process.execPath, [script, '--export'], { cwd: root });
    assert.match(first.stdout, /2 encoded, 2 variants copied/);
    for (const url of sources) {
      const exported = await readFile(path.join(root, 'out', url));
      assert.deepEqual(exported, await readFile(path.join(dir, url)));
      const metadata = await sharp(exported).metadata();
      assert.ok(metadata.width <= 600);
      assert.ok(metadata.height > metadata.width);
    }
    const cached = await run(process.execPath, [script, '--export'], { cwd: root });
    assert.match(cached.stdout, /0 encoded, 2 variants copied/);
    const before = await readFile(path.join(root, 'out', sources[0]));
    await fixture('blue');
    const changed = await run(process.execPath, [script, '--export'], { cwd: root });
    assert.match(changed.stdout, /2 encoded, 2 variants copied/);
    assert.notDeepEqual(await readFile(path.join(root, 'out', sources[0])), before);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
