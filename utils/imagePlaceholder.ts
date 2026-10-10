import path from 'node:path';
import { cache } from 'react';
import sharp from 'sharp';

const publicDirectory = path.resolve(process.cwd(), 'public');

// This runs during server rendering/static export, never in the browser.
export const getImagePlaceholder = cache(async (src: string) => {
  if (!src.startsWith('/') || src.startsWith('//')) return undefined;

  const pathname = decodeURIComponent(src.split(/[?#]/)[0]);
  if (!/\.(avif|gif|jpe?g|png|webp)$/i.test(pathname)) return undefined;

  const filePath = path.resolve(publicDirectory, `.${pathname}`);
  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) return undefined;

  // Read only the first frame of animated images; the full image stays animated.
  const preview = await sharp(filePath)
    .rotate()
    .resize({ width: 10, height: 10, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 40 })
    .toBuffer();

  return `data:image/webp;base64,${preview.toString('base64')}`;
});
