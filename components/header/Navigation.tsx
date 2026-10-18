'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tech', label: 'Tech' },
  { href: '/misc', label: 'Misc' },
];

const Navigation = () => {
  const pathname = usePathname()?.replace(/\/$/, '') || '/';
  return (
    <nav aria-label="Main navigation" className="main-navigation">
      {links.map(({ href, label }, index) => (
        <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
          <span className="nav-number" aria-hidden="true">
            0{index + 1}
          </span>
          {label}
        </Link>
      ))}
    </nav>
  );
};
export default Navigation;
