/** A real stereo fireplace recording. Created only by an explicit sound gesture. */
export function createFireplaceAudio() {
  const context = new AudioContext();
  const element = new Audio('/library/fireplace.m4a');
  element.loop = true;
  element.preload = 'none';
  const source = context.createMediaElementSource(element);
  const gain = context.createGain();
  let volume = 0.35;
  let playing = false;
  gain.gain.value = 0;
  source.connect(gain).connect(context.destination);
  return {
    async resume() {
      if (element.error) element.load();
      // Start both in the gesture, before awaiting either (including mobile Safari).
      await Promise.all([context.resume(), element.play()]);
      playing = true;
      gain.gain.setTargetAtTime(volume, context.currentTime, 0.35);
    },
    async suspend() {
      playing = false;
      element.pause();
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setValueAtTime(0, context.currentTime);
      await context.suspend();
    },
    setVolume(value: number) {
      volume = value;
      if (playing) gain.gain.setTargetAtTime(volume, context.currentTime, 0.12);
    },
    async close() {
      element.pause();
      element.removeAttribute('src');
      element.load();
      source.disconnect();
      gain.disconnect();
      await context.close();
    },
  };
}
