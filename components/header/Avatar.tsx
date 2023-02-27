import Image from 'next/image';

const Avatar = ({ image, alt }) => {
  return (
    <div className='basis-1/3 flex items-center'>
      <Image className='rounded-full shadow-lg ring-1 backdrop-blur mr-4 cursor-pointer'
             src={image}
             width={37.5}
             height={37.5}
             alt={alt}
             priority />
    </div>
  );
};

export default Avatar;
