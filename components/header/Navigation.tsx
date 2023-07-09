import Link from 'next/link';

const Navigation = () => {
  return (
    <div className='basis-1/3 px-1 md:px-5'>
      <nav className='flex justify-center text-xl text-gray-400 backdrop-blur'>
        <Link href='/tech' className='cursor-pointer p-2 md:px-3 hover:text-orange-400'>Tech</Link>
        <Link href='/misc' className='cursor-pointer p-2 md:px-3 hover:text-orange-400'>Misc</Link>
      </nav>
    </div>
  );
};

export default Navigation;
