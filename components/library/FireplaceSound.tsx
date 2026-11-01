'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createFireplaceAudio } from './fireplace-audio';
import PixelIcon from './PixelIcon';

type SoundState = {
  sound: boolean;
  pending: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (value: number) => void;
};
const SoundContext = createContext<SoundState | null>(null);

/** One player survives reading and returning to the room, with controls in both views. */
export function FireplaceProvider({ children }: { children: ReactNode }) {
  const audio = useRef<ReturnType<typeof createFireplaceAudio> | null>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  const [sound, setSound] = useState(false);
  const [pending, setPending] = useState(false);
  const [volume, updateVolume] = useState(35);
  const [error, setError] = useState('');

  useEffect(() => {
    const sync = () => {
      if (audio.current)
        void (
          document.hidden || !sound ? audio.current.suspend() : audio.current.resume()
        ).catch(() => {});
    };
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [sound]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      void audio.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(''), 7000);
    return () => clearTimeout(timer);
  }, [error]);

  async function toggle() {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      if (!audio.current) {
        audio.current = createFireplaceAudio();
        audio.current.setVolume(volume / 100);
      }
      await (sound ? audio.current.suspend() : audio.current.resume());
      if (mounted.current) setSound(!sound);
    } catch {
      if (mounted.current)
        setError('The sound couldn’t start. Tap the sound button to try again.');
    } finally {
      busy.current = false;
      if (mounted.current) setPending(false);
    }
  }

  function setVolume(value: number) {
    updateVolume(value);
    audio.current?.setVolume(value / 100);
  }

  return (
    <SoundContext.Provider value={{ sound, pending, volume, toggle, setVolume }}>
      {children}
      {error && (
        <div className="fireplace-error" role="alert">
          {error}
        </div>
      )}
    </SoundContext.Provider>
  );
}

export function FireplaceControls() {
  const state = useContext(SoundContext);
  if (!state) return null;
  const { sound, pending, volume, toggle, setVolume } = state;
  return (
    <div className="fireplace-controls">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={sound}
        aria-busy={pending}
        disabled={pending}
        aria-label={sound ? 'Sound on: mute fireplace' : 'Sound off: play fireplace sounds'}
        title={sound ? 'Mute fireplace' : 'Play fireplace sounds'}
      >
        <PixelIcon name={sound ? 'sound' : 'mute'} />
        <span>{pending ? 'LOADING' : `SOUND ${sound ? 'ON' : 'OFF'}`}</span>
      </button>
      {sound && (
        <label className="fire-volume">
          <span className="sr-only">Fireplace volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      )}
    </div>
  );
}
