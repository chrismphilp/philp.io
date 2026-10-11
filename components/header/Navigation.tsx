import Link from 'next/link';

const Navigation = () => (
  <nav
    aria-label="Main navigation"
    className="text-primary tracking-wider text-sm font-light flex flex-wrap justify-center gap-x-6 gap-y-2"
  >
    <Link href="/" className="py-1 hover:text-accent-highlight underline-effect">
      Home
    </Link>
    <Link href="/tech" className="py-1 hover:text-accent-highlight underline-effect">
      Tech
    </Link>
    <Link href="/misc" className="py-1 hover:text-accent-highlight underline-effect">
      Misc
    </Link>
  </nav>
);

export default Navigation;
