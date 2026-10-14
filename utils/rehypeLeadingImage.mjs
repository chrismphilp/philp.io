// Only an image that opens the article is a likely first-viewport LCP candidate.
// Images after prose or headings retain the renderer's lazy-loading default.
export default function rehypeLeadingImage() {
  return (tree) => {
    const isContent = (node) =>
      node.type !== 'comment' && !(node.type === 'text' && !node.value.trim());
    const first = tree.children.find(isContent);

    if (first?.type !== 'element' || first.tagName !== 'p') return;

    const children = first.children.filter(isContent);
    const image = children[0];
    if (children.length !== 1 || image.type !== 'element' || image.tagName !== 'img') {
      return;
    }

    image.properties.loading ??= 'eager';
    if (image.properties.loading === 'eager') {
      image.properties.fetchPriority ??= 'high';
    }
  };
}
