import Link from 'next/link';
import Navigation from './Navigation';
import Avatar from './Avatar';
import HeaderIcons from './HeaderIcons';
import profilePic from '../../public/blog/images/me.png';

const Header = () => (
  <header className="sticky top-0 z-40 w-full mx-auto border-b border-accent-subtle frosted-header">
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-6 md:py-7 relative">
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent-dark opacity-15 -translate-x-4 -translate-y-4 hidden md:block"></div>

      <div className="flex items-center mb-6 md:mb-0">
        <Avatar image={profilePic} alt="Picture of the Author" />
        <Link href="/" className="ml-5 block">
          <span className="block text-base md:text-lg tracking-[0.18em] text-primary font-light whitespace-nowrap uppercase font-sans">
            Christopher <span className="text-accent-highlight">Philp</span>
          </span>
          <span className="mt-1 block text-sm text-secondary font-light max-w-md">
            Long-form notes on software, ethics, language, and stray curiosities.
          </span>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-end">
        <Navigation />
        <HeaderIcons />
      </div>

      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent-dark opacity-15 translate-x-4 translate-y-4 hidden md:block"></div>
    </div>
  </header>
);

export default Header;
