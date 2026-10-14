import assert from 'node:assert/strict';
import test from 'node:test';
import rehypeLeadingImage from './rehypeLeadingImage.mjs';

const image = (properties = {}) => ({ type: 'element', tagName: 'img', properties });
const paragraph = (...children) => ({ type: 'element', tagName: 'p', children });
const text = (value) => ({ type: 'text', value });
const transform = (...children) => rehypeLeadingImage()({ type: 'root', children });

test('prioritizes the opening gallery photo and leaves later photos lazy by default', () => {
  const lead = image({ src: '/lead.jpg', width: 3000, height: 2000 });
  const later = image({ src: '/later.jpg' });
  transform(paragraph(lead), paragraph(later));
  assert.deepEqual(lead.properties, {
    src: '/lead.jpg', width: 3000, height: 2000, loading: 'eager', fetchPriority: 'high',
  });
  assert.deepEqual(later.properties, { src: '/later.jpg' });
});

test('does not promote images after introductory prose or a heading', () => {
  for (const intro of [paragraph(text('Introduction')), { type: 'element', tagName: 'h2' }]) {
    const photo = image();
    transform(intro, paragraph(photo));
    assert.deepEqual(photo.properties, {});
  }
});

test('ignores whitespace and HTML comments around an opening photo', () => {
  const photo = image();
  transform(text('\n'), { type: 'comment', value: 'note' }, paragraph(text(' '), photo));
  assert.equal(photo.properties.loading, 'eager');
  assert.equal(photo.properties.fetchPriority, 'high');
});

test('does not promote inline images or multiple images in one paragraph', () => {
  for (const rest of [[text('Caption')], [image()]]) {
    const photo = image();
    transform(paragraph(photo, ...rest));
    assert.deepEqual(photo.properties, {});
  }
});

test('respects explicit loading and fetch priority choices', () => {
  for (const properties of [
    { loading: 'lazy' },
    { loading: 'eager', fetchPriority: 'low' },
  ]) {
    const photo = image({ ...properties });
    transform(paragraph(photo));
    assert.deepEqual(photo.properties, properties);
  }
});

test('handles empty articles and paragraphs', () => {
  transform();
  transform(paragraph());
  transform(text('\n'));
});
