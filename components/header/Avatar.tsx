import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';

const Avatar = ({ image, alt }) => (
  <div className="flex items-center">
    <Link href="/" className="relative overflow-hidden group">
      <div className="absolute inset-0 border-thin border-accent-dark rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <ExportedImage
        className="rounded-full saturate-[0.85] hover:saturate-[1.1] transition-all duration-500 border border-accent-subtle"
        src={image}
        width={48}
        height={48}
        alt={alt}
        priority
      />
    </Link>
  </div>
);

export default Avatar;
