// Wrap distant photos at compile time, avoiding a render-order counter in React.
export default function rehypeGalleryImages({ enabled = false } = {}) {
  return (tree) => {
    if (!enabled) return;
    let images = 0;
    function visit(parent) {
      parent.children?.forEach((node, index) => {
        // Preserve native <picture> source selection by wrapping the whole picture.
        const image =
          node.tagName === 'picture'
            ? node.children?.find((child) => child.tagName === 'img')
            : node.tagName === 'img'
              ? node
              : undefined;
        if (image) {
          images++;
          const { width, height, alt = '' } = image.properties;
          if (images > 2 && Number(width) > 0 && Number(height) > 0) {
            parent.children[index] = {
              type: 'element',
              tagName: 'deferred-gallery-image',
              properties: { width: Number(width), height: Number(height), alt },
              children: [node],
            };
          }
        } else visit(node);
      });
    }
    visit(tree);
  };
}
