import Navigation from './Navigation';
import Avatar from './Avatar';
import HeaderIcons from './HeaderIcons';
import profilePic from '../../public/blog/images/me.png';

const Header = () => (
  <header className="w-full mx-auto border-b-thin border-accent py-8 md:py-10">
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 md:px-12 lg:px-24 relative">
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent-dark opacity-20 -translate-x-4 -translate-y-4 hidden md:block"></div>
      
      <div className="flex items-center mb-6 md:mb-0">
        <Avatar image={profilePic} alt="Picture of the Author" />
        <h1 className="ml-5 text-base md:text-lg tracking-widest text-primary font-light whitespace-nowrap">
          Christopher <span className="text-accent-highlight">Philp</span>
        </h1>
      </div>
      
      <div className="flex flex-wrap items-center justify-center md:justify-end">
        <Navigation />
        <HeaderIcons />
      </div>
      
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent-dark opacity-20 translate-x-4 translate-y-4 hidden md:block"></div>
    </div>
  </header>
);

export default Header;
