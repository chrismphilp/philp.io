import type { CSSProperties } from 'react';

const paths = {
  book: 'M3 3h7v2h4V3h7v16h-7v2h-4v-2H3V3zm2 2v12h5V5H5zm9 0v12h5V5h-5z',
  sound:
    'M2 9h4V7h2V5h3v14H8v-2H6v-2H2V9zm12-2h2v2h2v6h-2v2h-2v-3h2v-4h-2V7zm5-4h2v4h2v10h-2v4h-2v-5h2V8h-2V3z',
  mute: 'M2 9h4V7h2V5h3v14H8v-2H6v-2H2V9zm12-1h2v2h2V8h2v2h-2v4h2v2h-2v-2h-2v2h-2v-2h2v-4h-2V8z',
  pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z',
  play: 'M6 3h3v2h3v2h3v2h3v6h-3v2h-3v2H9v2H6V3z',
  search:
    'M5 2h8v2h2v2h2v8h-2v2h-2v2H5v-2H3v-2H1V6h2V4h2V2zm0 4v8h8V6H5zm11 10h3v3h3v3h-3v-3h-3v-3z',
  shelf: 'M3 3h3v13H3V3zm5 2h3v11H8V5zm5-2h3v13h-3V3zm5 4h3v9h-3V7zM2 18h20v3H2v-3z',
  list: 'M2 4h3v3H2V4zm6 0h14v3H8V4zM2 10h3v3H2v-3zm6 0h14v3H8v-3zM2 16h3v3H2v-3zm6 0h14v3H8v-3z',
  arrow: 'M3 11h12V7h-3V4h3v3h3v3h3v4h-3v3h-3v3h-3v-3h3v-4H3v-2z',
  close:
    'M4 4h3v3h3v3h4V7h3V4h3v3h-3v3h-3v4h3v3h3v3h-3v-3h-3v-3h-4v3H7v3H4v-3h3v-3h3v-4H7V7H4V4z',
  tea: 'M3 8h14v2h5v7h-5v3H5v-3H3V8zm14 4v3h3v-3h-3zM2 22h19v2H2v-2zM6 1h2v4H6V1zm6 1h2v4h-2V2z',
  star: 'M10 1h4v7h2v2h7v4h-7v2h-2v7h-4v-7H8v-2H1v-4h7V8h2V1z',
};

export default function PixelIcon({
  name,
  size = 18,
  style,
}: {
  name: keyof typeof paths;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={style}
      shapeRendering="crispEdges"
    >
      <path d={paths[name]} />
    </svg>
  );
}
