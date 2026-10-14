import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const source = readFileSync(new URL('../utils/browserPolyfills.js', import.meta.url), 'utf8');

test('preserves a browser native URL.canParse', () => {
  const native = URL.canParse;
  vm.runInNewContext(source, { URL });
  assert.equal(URL.canParse, native);
});

test('supports absolute, relative and invalid URLs without native canParse', () => {
  // A constructor wrapper supplies URL parsing without inheriting static APIs.
  function LegacyURL(input, base) {
    return new URL(input, base);
  }
  vm.runInNewContext(source, { URL: LegacyURL });
  assert.equal(LegacyURL.canParse('https://philp.io/articles/china'), true);
  assert.equal(LegacyURL.canParse('/tech', 'https://philp.io'), true);
  assert.equal(LegacyURL.canParse('/tech'), false);
  assert.equal(LegacyURL.canParse('https://['), false);
  assert.equal(LegacyURL.canParse('https://philp.io', 'invalid base'), false);
});

test('matches native argument and string-conversion semantics', () => {
  function LegacyURL(input, base) {
    return new URL(input, base);
  }
  vm.runInNewContext(source, { URL: LegacyURL });
  assert.throws(() => LegacyURL.canParse(), /requires a URL/);
  assert.throws(() => LegacyURL.canParse(Symbol()), /Symbol/);
  assert.throws(() => LegacyURL.canParse('https://philp.io', Symbol()), /Symbol/);
  const error = new Error('conversion failed');
  const throwing = {
    toString() {
      throw error;
    },
  };
  assert.throws(
    () => LegacyURL.canParse(throwing),
    (caught) => caught === error,
  );
  assert.throws(
    () => LegacyURL.canParse('/tech', throwing),
    (caught) => caught === error,
  );
  assert.equal(LegacyURL.canParse(new URL('https://philp.io')), true);
  assert.equal(LegacyURL.canParse('/tech', new URL('https://philp.io')), true);
  assert.equal(LegacyURL.canParse(undefined), false);
});

test('requires a compatibility review when Next changes its module polyfills', () => {
  const require = createRequire(import.meta.url);
  const upstream = readFileSync(require.resolve('next/dist/build/polyfills/polyfill-module'));
  assert.equal(
    createHash('sha256').update(upstream).digest('hex'),
    '94c8008b70e41ac5b0360fd6f35ea7a59c20c6927aca7731ef8c6a3c26b9cddf',
    'Review new upstream APIs against the browser baseline before updating this fingerprint',
  );
});
