import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';
import Navigation from './Navigation';
import HeaderActions, { HeaderActionLink } from './HeaderActions';
import ThemeToggle from './ThemeToggle';

const Header = () => (
  <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="site-brand" aria-label="Christopher Philp — Home">
        <span className="brand-mark" aria-hidden="true">
          p<span>.</span>
        </span>
        <span className="brand-name">
          Christopher Philp<span className="brand-caption">Writing &amp; curiosity</span>
        </span>
      </Link>
      <Navigation />
      <HeaderActions>
        <ThemeToggle />
        <HeaderActionLink href="https://github.com/chrismphilp/philp.io" label="GitHub">
          <FiGithub size={19} aria-hidden="true" />
        </HeaderActionLink>
      </HeaderActions>
    </div>
  </header>
);
export default Header;
