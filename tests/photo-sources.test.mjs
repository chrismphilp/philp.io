import assert from 'node:assert/strict';
import test from 'node:test';
import { photoSrcSet, widthsForPhoto } from '../utils/photoSources.mjs';

test('responsive sources never advertise upscaled pixels', () => {
  assert.deepEqual(widthsForPhoto(100), [100]);
  assert.deepEqual(widthsForPhoto(800), [320, 640, 768, 800]);
  assert.deepEqual(widthsForPhoto(3000), [320, 640, 768, 1080, 1440, 1920]);
  assert.equal(
    photoSrcSet('/articles/images/trip/photo.JPEG', 100),
    '/articles/images/trip/nextImageExportOptimizer/photo-opt-100.AVIF 100w',
  );
});

test('only local JPEG article photos opt into generated AVIF sources', () => {
  for (const src of [
    '/articles/images/a.png',
    '/blog/images/me.jpg',
    'https://example.com/a.jpg',
  ]) {
    assert.equal(photoSrcSet(src, 640), undefined);
  }
  assert.equal(photoSrcSet('/articles/images/a.jpg', 0), undefined);
});
