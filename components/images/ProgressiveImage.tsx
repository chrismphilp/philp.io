'use client';

import { useCallback, useState } from 'react';
import './ProgressiveImage.css';
import ExportedImage, { type ExportedImageProps } from 'next-image-export-optimizer';

type Props = Omit<ExportedImageProps, 'placeholder'> & {
  wrapperClassName?: string;
};
type LoadingState = 'initial' | 'loading' | 'loaded' | 'complete';

function ImageWithPreview({
  src,
  blurDataURL,
  wrapperClassName = '',
  onLoad,
  onError,
  onAnimationEnd,
  ...props
}: Props) {
  const [state, setState] = useState<LoadingState>('initial');
  const preview = blurDataURL ?? (typeof src === 'object' ? src.blurDataURL : undefined);
  const imageRef = useCallback(
    (image: HTMLImageElement | null) => {
      // Do not hide or animate an image that finished before hydration.
      if (preview && image && !image.complete) setState('loading');
    },
    [preview],
  );

  return (
    <span
      className={`progressive-image ${wrapperClassName}`}
      data-state={state}
      style={
        preview && state !== 'complete' ? { backgroundImage: `url("${preview}")` } : undefined
      }
    >
      <ExportedImage
        {...props}
        ref={imageRef}
        src={src}
        placeholder="empty"
        style={{
          // Responsive encodings can round their height by a pixel.
          aspectRatio:
            props.width && props.height ? `${props.width} / ${props.height}` : undefined,
          ...props.style,
        }}
        onLoad={(event) => {
          // Next.js waits for decoding before calling onLoad.
          const shouldFade = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          setState((previous) =>
            previous === 'loading' && shouldFade ? 'loaded' : 'complete',
          );
          onLoad?.(event);
        }}
        onError={(event) => {
          setState('complete');
          onError?.(event);
        }}
        onAnimationEnd={(event) => {
          if (event.animationName === 'progressive-image-reveal') setState('complete');
          onAnimationEnd?.(event);
        }}
      />
    </span>
  );
}

export default function ProgressiveImage(props: Props) {
  // A new source must get its own loading state on client-side navigation.
  const src = typeof props.src === 'string' ? props.src : props.src.src;
  return <ImageWithPreview key={src} {...props} />;
}
