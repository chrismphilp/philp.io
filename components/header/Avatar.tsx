import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';

const Avatar = ({ image, alt }) => (
  <div className="flex items-center">
    <Link href="/" className="relative overflow-hidden group">
      <div className="absolute inset-0 border border-accent-dark rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
      <ExportedImage
        className="rounded-full saturate-[0.9] hover:saturate-[1.05] transition-all duration-500 border border-accent-subtle shadow-washi"
        src={image}
        width={56}
        height={56}
        alt={alt}
        priority
      />
    </Link>
  </div>
);

export default Avatar;
