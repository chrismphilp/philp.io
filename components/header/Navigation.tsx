const Navigation = () => {
  return (
    <nav className='basis-1/3 flex justify-center rounded-full text-gray-100 shadow-lg ring-1 backdrop-blur bg-zinc-800/90'>
      <div className='cursor-pointer p-2 px-3 hover:text-orange-400'>Articles</div>
      <div className='cursor-pointer p-2 px-3 hover:text-orange-400'>About</div>
    </nav>
  );
};

export default Navigation;
