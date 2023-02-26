import Navigation from './Navigation';

const Header = () => {
  return (
    <header className='h-12'>
      <div className='flex'>
        <div className='flex-1' />
        <Navigation />
        <div className='flex-1' />
      </div>
    </header>
  );
};

export default Header;
