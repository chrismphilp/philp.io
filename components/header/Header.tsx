import Link from 'next/link';
import Navigation from './Navigation';
import Avatar from './Avatar';
import { FiGithub } from 'react-icons/fi';
import HeaderActions, { HeaderActionLink } from './HeaderActions';
import ThemeToggle from './ThemeToggle';
import profilePic from '../../public/blog/images/me.png';

const Header = () => (
  <header className="w-full mx-auto border-b-thin border-accent py-8 md:py-10">
    <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
      {/* Anchor the decorative corners inside the page gutters, around the content. */}
      <div className="relative flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-x-8 gap-y-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-12 h-12 border-t border-l border-accent-dark opacity-20 -translate-x-4 -translate-y-4 hidden md:block"
        ></div>

        <div className="flex shrink-0 items-center">
          <Avatar image={profilePic} alt="Picture of the Author" />
          <Link
            href="/"
            className="ml-5 text-base md:text-lg tracking-widest text-primary font-light whitespace-nowrap"
          >
            Christopher <span className="text-accent-highlight">Philp</span>
          </Link>
        </div>

        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-end">
          <Navigation />
          <HeaderActions>
            <ThemeToggle />
            <HeaderActionLink href="https://github.com/chrismphilp/philp.io" label="GitHub">
              <FiGithub size={20} aria-hidden="true" />
            </HeaderActionLink>
          </HeaderActions>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent-dark opacity-20 translate-x-4 translate-y-4 hidden md:block"
        ></div>
      </div>
    </div>
  </header>
);

export default Header;
