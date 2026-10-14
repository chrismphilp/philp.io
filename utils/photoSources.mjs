export const photoWidths = [320, 640, 768, 1080, 1440, 1920];

export function widthsForPhoto(originalWidth) {
  return [...new Set(photoWidths.map((width) => Math.min(width, originalWidth)))];
}

export function avifPath(src, width) {
  return src.replace(/([^/]+)\.jpe?g$/i, `nextImageExportOptimizer/$1-opt-${width}.AVIF`);
}

export function photoSrcSet(src, originalWidth) {
  if (!src.startsWith('/articles/images/') || !/\.jpe?g$/i.test(src) || !(originalWidth > 0)) {
    return undefined;
  }
  return widthsForPhoto(originalWidth)
    .map((width) => `${avifPath(src, width)} ${width}w`)
    .join(', ');
}
