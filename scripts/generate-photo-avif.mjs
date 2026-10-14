import { createHash, randomUUID } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, access, rename } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { avifPath, widthsForPhoto } from '../utils/photoSources.mjs';

const root = process.cwd();
const exportImages = process.argv.includes('--export');
const settings = { quality: 75, effort: 4, chromaSubsampling: '4:4:4' };

async function photos(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'nextImageExportOptimizer')
        return photos(file);
      return entry.isFile() && /\.jpe?g$/i.test(entry.name) ? [file] : [];
    }),
  );
  return nested.flat();
}

const queue = await photos(path.join(root, 'public/articles/images'));
let generated = 0;
let copied = 0;
async function worker() {
  for (let file; (file = queue.shift());) {
    const input = await readFile(file);
    const metadata = await sharp(input).metadata();
    const originalWidth = metadata.autoOrient.width;
    const hash = createHash('sha256')
      .update(input)
      .update(JSON.stringify({ settings, versions: sharp.versions }))
      .digest('hex');
    const cache = path.join(root, '.cache/photo-avif', hash);
    await mkdir(cache, { recursive: true });
    const src = '/' + path.relative(path.join(root, 'public'), file).split(path.sep).join('/');
    for (const width of widthsForPhoto(originalWidth)) {
      const cached = path.join(cache, `${width}.avif`);
      try {
        await access(cached);
      } catch {
        const temporary = `${cached}.${randomUUID()}.tmp`;
        await sharp(input)
          .autoOrient()
          .resize({ width, withoutEnlargement: true })
          .avif(settings)
          .toFile(temporary);
        await rename(temporary, cached);
        generated++;
      }
      for (const folder of exportImages ? ['public', 'out'] : ['public']) {
        const destination = path.join(root, folder, avifPath(src, width));
        await mkdir(path.dirname(destination), { recursive: true });
        await copyFile(cached, destination);
      }
      copied++;
    }
  }
}
// Bound encoder concurrency so builds do not exhaust memory on large photographs.
await Promise.all([worker(), worker()]);
console.log(
  `AVIF photos: ${generated} encoded, ${copied} variants copied${exportImages ? ' to public and out' : ' to public'}.`,
);
