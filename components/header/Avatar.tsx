import Image from 'next/image';
import Link from 'next/link';

const Avatar = ({ image, alt }) => {
  return (
    <div className='basis-1/3 flex items-center'>
      <Link href='/' className='hover:none'>
        <Image className='rounded-full shadow-lg ring-1 backdrop-blur mr-4 cursor-pointer hover:ring-2'
               src={image}
               width={37.5}
               height={37.5}
               alt={alt}
               priority />
      </Link>
    </div>
  );
};

export default Avatar;
