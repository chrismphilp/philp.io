import Image from 'next/image';
import Link from 'next/link';

const Avatar = ({ image, alt }) => {
  return (
    <div className='basis-1/3 flex items-center'>
      <Link href='/' className='hover:none'>
        <Image className='rounded-full shadow-lg ring-[0.85px] ring-orange-400 backdrop-blur mr-4 cursor-pointer hover:ring-[1.15px]'
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
