'use client';

import { useEffect, useRef, useState } from 'react';
import PixelIcon from './PixelIcon';
import type { createFireplaceAudio } from './fireplace-audio';

export default function ReadingRoom() {
  const room = useRef<HTMLElement>(null);
  const audio = useRef<ReturnType<typeof createFireplaceAudio> | null>(null);
  const audioPending = useRef(false);
  const mounted = useRef(true);
  const dogTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sound, setSound] = useState(false);
  const [paused, setPaused] = useState(false);
  const [awake, setAwake] = useState(false);
  const [message, setMessage] = useState('A good book. A warm fire. No hurry.');

  useEffect(() => {
    mounted.current = true;
    const element = room.current;
    let visible = true;
    const sync = () => {
      const resting = document.hidden || !visible;
      element?.classList.toggle('room-resting', resting);
      if (audio.current) {
        void (resting || !sound ? audio.current.suspend() : audio.current.resume()).catch(
          () => {},
        );
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    if (element) observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [sound]);

  useEffect(
    () => () => {
      mounted.current = false;
      if (dogTimer.current) clearTimeout(dogTimer.current);
      void audio.current?.close();
    },
    [],
  );

  async function toggleSound() {
    if (audioPending.current) return;
    audioPending.current = true;
    try {
      if (!audio.current) {
        const { createFireplaceAudio } = await import('./fireplace-audio');
        if (!mounted.current) return;
        audio.current = createFireplaceAudio();
      }
      await (sound ? audio.current.suspend() : audio.current.resume());
      if (mounted.current) setSound(!sound);
    } catch {
      if (mounted.current)
        setMessage('Sound is unavailable in this browser. The fire is still warm.');
    } finally {
      audioPending.current = false;
    }
  }

  function greetDog() {
    if (dogTimer.current) clearTimeout(dogTimer.current);
    setAwake(true);
    setMessage('A sleepy hello. You have been approved by the librarian.');
    dogTimer.current = setTimeout(() => {
      setAwake(false);
      setMessage('Back to his very important work: napping.');
    }, 4200);
  }

  return (
    <section
      ref={room}
      className={`reading-room${paused ? ' room-paused' : ''}`}
      aria-label="The reading room"
    >
      <div className="room-titlebar">
        <span>
          <span className="status-light" /> THE READING ROOM
        </span>
        <span className="room-weather">RAIN OUTSIDE. WARM INSIDE.</span>
        <div className="room-controls">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={
              sound ? 'Sound on: mute fireplace' : 'Sound off: play fireplace sounds'
            }
            title={sound ? 'Mute fireplace' : 'Play fireplace sounds'}
          >
            <PixelIcon name={sound ? 'sound' : 'mute'} />
            <span>SOUND {sound ? 'ON' : 'OFF'}</span>
          </button>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            aria-label={paused ? 'Resume scene animation' : 'Pause scene animation'}
            title={paused ? 'Resume animation' : 'Pause animation'}
          >
            <PixelIcon name={paused ? 'play' : 'pause'} />
          </button>
        </div>
      </div>
      <div className="room-viewport">
        <div className="room-art">
          <picture>
            <source media="(max-width: 600px)" srcSet="/library/reading-room-mobile.webp" />
            {/* Fixed, optimized art is intentionally served directly, without image-loader JS. */}
            <img
              className="room-background"
              src="/library/reading-room.webp"
              width="1008"
              height="567"
              alt="A pixel-art British manor library at dusk: walnut bookshelves, a carved fireplace, a rainy window, and a man in a burgundy armchair with his feet on a pouffe and tea beside him."
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="hearth-glow" aria-hidden="true" />
          <div className="fire" aria-hidden="true" />
          <div className="tea-steam" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="window-rain" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <button
            className={`library-dog${awake ? ' dog-awake' : ''}`}
            onClick={greetDog}
            aria-label="Say a quiet hello to the sleeping Bernese Mountain Dog"
            type="button"
          >
            <span className="dog-sprite" />
            <span className="dog-sleep" aria-hidden="true">
              z z Z
            </span>
            <span className="dog-hint">Say a quiet hello</span>
          </button>
          <a className="room-shelf-link" href="#bookshelf">
            <PixelIcon name="book" /> Browse the shelves <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="room-caption">
        <span aria-live="polite">{message}</span>
        <span className="room-caption-mark" aria-hidden="true">
          ✦
        </span>
        <span>Make yourself at home.</span>
      </div>
    </section>
  );
}
