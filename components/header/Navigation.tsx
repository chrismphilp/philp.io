import Link from 'next/link';

const Navigation = () => (
  <nav className="text-primary tracking-wider text-sm font-light flex flex-wrap justify-center">
    <Link href="/" className="mr-6 hover:text-accent-highlight underline-effect my-1">
      Home
    </Link>
    <Link href="/tech" className="mr-6 hover:text-accent-highlight underline-effect my-1">
      Tech
    </Link>
    <Link href="/misc" className="hover:text-accent-highlight underline-effect my-1">
      Misc
    </Link>
  </nav>
);

export default Navigation;
