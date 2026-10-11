import { Children, cloneElement, isValidElement } from 'react';
import type { CSSProperties, ImgHTMLAttributes, ReactNode } from 'react';

type PhotoPairProps = {
  children: ReactNode;
  columns?: string;
};

const pairedSizes =
  '(min-width: 1056px) 540px, (min-width: 1024px) calc((100vw - 56px) * 0.54), (min-width: 768px) calc((100vw - 120px) * 0.54), (min-width: 640px) calc((100vw - 72px) * 0.54), calc(100vw - 48px)';

const PhotoPair = ({ children, columns = '1 1' }: PhotoPairProps) => (
  <div
    className="photo-pair"
    style={
      {
        '--photo-columns': columns
          .split(' ')
          .map((ratio) => `minmax(0, ${ratio}fr)`)
          .join(' '),
      } as CSSProperties
    }
  >
    {/* Markdown images arrive inside paragraph elements. */}
    {Children.map(children, (paragraph) => {
      if (!isValidElement<{ children?: ReactNode }>(paragraph)) return paragraph;

      return cloneElement(paragraph, {
        children: Children.map(paragraph.props.children, (image) =>
          isValidElement<ImgHTMLAttributes<HTMLImageElement>>(image) && image.props.src
            ? cloneElement(image, { sizes: pairedSizes })
            : image,
        ),
      });
    })}
  </div>
);

export default PhotoPair;
