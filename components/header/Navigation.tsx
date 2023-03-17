import Link from 'next/link';

const Navigation = () => {
  return (
    <div className='basis-1/3 px-5'>
      <nav className='flex justify-center text-xl text-gray-400 backdrop-blur'>
        <Link href='/articles' className='cursor-pointer p-2 px-3 hover:text-orange-400'>Articles</Link>
        <Link href='/favourites' className='cursor-pointer p-2 px-3 hover:text-orange-400'>Favourites</Link>
      </nav>
    </div>
  );
};

export default Navigation;
