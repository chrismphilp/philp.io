'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="library-navigation" aria-label="Main navigation">
      {[
        ['/', 'The library'],
        ['/tech', 'Technology'],
        ['/misc', 'Life & everything'],
      ].map(([href, label]) => (
        <Link
          key={href}
          href={href}
          prefetch={false}
          aria-current={pathname === href ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
