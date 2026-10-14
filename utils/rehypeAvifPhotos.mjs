import path from 'node:path';
import sharp from 'sharp';
import { photoSrcSet } from './photoSources.mjs';

// Match the fallback ExportedImage's responsive article column sizes in page.tsx.
const sizes =
  '(min-width: 1280px) min(100ch, calc(100vw - 32rem)), (min-width: 1024px) min(96ch, calc(100vw - 28rem)), (min-width: 768px) min(84.375ch, calc(100vw - 6rem)), (min-width: 640px) min(65ch, calc(100vw - 3rem)), calc(100vw - 3rem)';

// Build native <picture> markup without adding client code or changing the WebP fallback.
export default function rehypeAvifPhotos({ dir = 'public' } = {}) {
  return async (tree) => {
    const pending = [];
    function visit(parent) {
      parent.children?.forEach((node, index) => {
        const src = node.properties?.src;
        if (
          node.type === 'element' &&
          node.tagName === 'img' &&
          typeof src === 'string' &&
          src.startsWith('/articles/images/') &&
          /\.jpe?g$/i.test(src)
        ) {
          pending.push(
            sharp(path.join(dir, src))
              .metadata()
              .then(({ autoOrient }) => {
                // Camera EXIF rotation must agree with the dimensions used by the encoder.
                node.properties.width = autoOrient.width;
                node.properties.height = autoOrient.height;
                parent.children[index] = {
                  type: 'element',
                  tagName: 'picture',
                  properties: {},
                  children: [
                    {
                      type: 'element',
                      tagName: 'source',
                      properties: {
                        type: 'image/avif',
                        srcSet: photoSrcSet(src, autoOrient.width),
                        sizes,
                      },
                      children: [],
                    },
                    node,
                  ],
                };
              }),
          );
        } else visit(node);
      });
    }
    visit(tree);
    await Promise.all(pending);
  };
}
