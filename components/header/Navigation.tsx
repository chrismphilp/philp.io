import Link from 'next/link';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/tech', label: 'Tech' },
  { href: '/misc', label: 'Misc' },
];

const Navigation = () => (
  <nav
    aria-label="Main navigation"
    className="text-primary tracking-wider text-sm font-light flex flex-wrap justify-center gap-x-6 gap-y-2"
  >
    {navigationItems.map(({ href, label }) => (
      <Link key={href} href={href} className="py-1 hover:text-accent-highlight underline-effect">
        {label}
      </Link>
    ))}
  </nav>
);

export default Navigation;
