import Link from 'next/link';

const Navigation = () => (
  <nav className="font-sans text-primary tracking-[0.24em] text-[11px] uppercase flex flex-wrap justify-center gap-x-5 gap-y-2">
    <Link href="/" className="hover:text-accent-highlight underline-effect my-1">
      Home
    </Link>
    <Link href="/tech" className="hover:text-accent-highlight underline-effect my-1">
      Tech
    </Link>
    <Link href="/misc" className="hover:text-accent-highlight underline-effect my-1">
      Misc
    </Link>
    <Link href="/quotes" className="hover:text-accent-highlight underline-effect my-1">
      Quotes
    </Link>
  </nav>
);

export default Navigation;
