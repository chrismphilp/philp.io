import Navigation from './Navigation';
import Avatar from './Avatar';
import ExternalLinks from './ExternalLinks';
import profilePic from '../../public/images/me.png';

const Header = () => {
  return (
    <header className='mx-auto max-w-2xl h-16 pt-4'>
      <div className='flex flex-row'>
        <Avatar image={profilePic} alt='Picture of the Author' />
        <Navigation />
        <ExternalLinks />
      </div>
    </header>
  );
};

export default Header;
