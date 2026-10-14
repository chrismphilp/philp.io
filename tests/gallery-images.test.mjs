import assert from 'node:assert/strict';
import test from 'node:test';
import rehypeGalleryImages from '../utils/rehypeGalleryImages.mjs';

const photo = (dimensions = true) => ({
  type: 'element',
  tagName: 'img',
  properties: dimensions ? { width: 1600, height: 1200, alt: 'A photograph' } : {},
});
const tree = (images) => ({
  type: 'root',
  children: images.map((image) => ({ type: 'element', tagName: 'p', children: [image] })),
});
const wrappers = (root) => root.children.map((p) => p.children[0].tagName);

test('ordinary articles retain native image loading', () => {
  const root = tree([photo(), photo(), photo()]);
  rehypeGalleryImages()(root);
  assert.deepEqual(wrappers(root), ['img', 'img', 'img']);
});

test('galleries defer only photos after the first two with known dimensions', () => {
  const root = tree([photo(), photo(), photo(), photo(false), photo()]);
  rehypeGalleryImages({ enabled: true })(root);
  assert.deepEqual(wrappers(root), [
    'img',
    'img',
    'deferred-gallery-image',
    'img',
    'deferred-gallery-image',
  ]);
  assert.deepEqual(root.children[2].children[0].properties, {
    width: 1600,
    height: 1200,
    alt: 'A photograph',
  });
});

test('the count resets for each compiled article', () => {
  const transform = rehypeGalleryImages({ enabled: true });
  transform(tree([photo(), photo(), photo()]));
  const root = tree([photo()]);
  transform(root);
  assert.deepEqual(wrappers(root), ['img']);
});

test('picture sources remain direct siblings of their fallback image', () => {
  const picture = {
    type: 'element',
    tagName: 'picture',
    children: [
      { type: 'element', tagName: 'source', properties: { type: 'image/avif' } },
      photo(),
    ],
  };
  const root = tree([photo(), photo(), picture]);
  rehypeGalleryImages({ enabled: true })(root);
  const wrapper = root.children[2].children[0];
  assert.equal(wrapper.tagName, 'deferred-gallery-image');
  assert.equal(wrapper.children[0], picture);
  assert.deepEqual(
    picture.children.map((n) => n.tagName),
    ['source', 'img'],
  );
});
