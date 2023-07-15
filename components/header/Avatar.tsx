import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';

const Avatar = ({ image, alt }) => (
  <div className='basis-1/3 sm:flex items-center pl-2 md:pl-0'>
    <Link href='/' className='hover:none'>
      <ExportedImage
        className='rounded-full shadow-lg ring-[0.85px] ring-orange-400 backdrop-blur sm:mr-4 cursor-pointer hover:ring-[1.15px]'
        src={image}
        width={37.5}
        height={37.5}
        alt={alt}
        priority />
    </Link>
  </div>
);

export default Avatar;
