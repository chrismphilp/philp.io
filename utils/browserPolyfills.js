// URL.canParse is newer than Next's Chrome/Edge/Firefox 111 and Safari 16.4 baseline.
// Retain its fallback while using native implementations of the older APIs.
if (!('canParse' in URL)) {
  Object.defineProperty(URL, 'canParse', {
    configurable: true,
    writable: true,
    value: function canParse(url, base) {
      if (arguments.length === 0) throw new TypeError('URL.canParse requires a URL');
      // Web IDL string conversion errors must propagate; only parse failures return false.
      const input = `${url}`;
      const baseInput = base === undefined ? undefined : `${base}`;
      try {
        new URL(input, baseInput);
        return true;
      } catch {
        return false;
      }
    },
  });
}
