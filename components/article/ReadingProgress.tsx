'use client';

import { useEffect, useEffectEvent, useState } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = useEffectEvent(() => {
    const articleRoot = document.querySelector<HTMLElement>('[data-reading-root]');

    if (!articleRoot) {
      return;
    }

    const rect = articleRoot.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const articleTop = scrollTop + rect.top;
    const articleHeight = articleRoot.scrollHeight;
    const maxDistance = Math.max(articleHeight - window.innerHeight, 1);
    const travelled = scrollTop - articleTop;
    const nextProgress = Math.min(Math.max(travelled / maxDistance, 0), 1);

    setProgress(nextProgress);
  });

  useEffect(() => {
    const handlePositionChange = () => updateProgress();
    const initialFrame = window.requestAnimationFrame(handlePositionChange);

    window.addEventListener('scroll', handlePositionChange, { passive: true });
    window.addEventListener('resize', handlePositionChange);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', handlePositionChange);
      window.removeEventListener('resize', handlePositionChange);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
};

export default ReadingProgress;
