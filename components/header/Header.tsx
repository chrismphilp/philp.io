import Link from 'next/link';
import Navigation from './Navigation';
import PixelIcon from '../library/PixelIcon';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          href="/"
          prefetch={false}
          className="library-brand"
          aria-label="philp.io — The personal library of Christopher Philp, home"
        >
          <span className="brand-icon">
            <PixelIcon name="book" size={24} />
          </span>
          <span>
            philp<span className="brand-dot">.</span>io
            <span className="brand-subtitle">THE PERSONAL LIBRARY OF CHRISTOPHER PHILP</span>
          </span>
        </Link>
        <div className="header-links">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
