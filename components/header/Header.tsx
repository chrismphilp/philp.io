import Navigation from './Navigation';
import Avatar from './Avatar';
import HeaderIcons from './HeaderIcons';
import profilePic from '../../public/blog/images/me.png';

const Header = () => (
  <header className='w-full md:mx-auto max-w-2xl justify-center h-16 pt-4'>
    <div className='flex flex-row md:px-5'>
      <Avatar image={profilePic} alt='Picture of the Author' />
      <Navigation />
      <HeaderIcons />
    </div>
  </header>
);

export default Header;
