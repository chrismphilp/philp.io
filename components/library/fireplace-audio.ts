/** Synthesized locally on demand: no audio download, autoplay, or third-party requests. */
export function createFireplaceAudio() {
  const context = new AudioContext();
  const length = context.sampleRate * 8;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < length; i++) {
    brown = (brown + (Math.random() * 2 - 1) * 0.025) / 1.025;
    data[i] = brown * 3;
  }
  // Add short, irregularly spaced crackles to the same quiet looping buffer.
  for (let n = 0; n < 42; n++) {
    const start = Math.floor(Math.random() * (length - 3000));
    const duration = 200 + Math.floor(Math.random() * 2400);
    const volume = 0.12 + Math.random() * 0.3;
    for (let i = 0; i < duration; i++) {
      data[start + i] += (Math.random() * 2 - 1) * Math.exp(-i / (duration / 6)) * volume;
    }
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2200;
  const gain = context.createGain();
  gain.gain.value = 0.28;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
  return {
    resume: () => context.resume(),
    suspend: () => context.suspend(),
    close: () => context.close(),
  };
}
