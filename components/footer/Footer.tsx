import PixelIcon from '../library/PixelIcon';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="library-footer">
      <div>
        <Link className="footer-signature" href="/" prefetch={false}>
          Christopher Philp<span>A curious mind. A quiet corner of the web.</span>
        </Link>
        <span className="footer-ornament" aria-hidden="true">
          <PixelIcon name="book" size={22} />
        </span>
        <div className="footer-links">
          <a href="https://github.com/chrismphilp/philp.io">
            Made with care <span aria-hidden="true">↗</span>
          </a>
          <span>© {new Date().getFullYear()} · No rush. No noise.</span>
        </div>
      </div>
    </footer>
  );
}
