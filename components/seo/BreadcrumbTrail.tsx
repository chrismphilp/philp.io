import Link from 'next/link';
import type { BreadcrumbItem } from '../../utils/seo';

const BreadcrumbTrail = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav
    aria-label="Breadcrumb"
    className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-secondary/80"
  >
    {items.map((item, index) => {
      const isCurrentPage = index === items.length - 1;

      return (
        <span key={`${item.pathname}-${item.name}`} className="flex items-center gap-2">
          {isCurrentPage ? (
            <span aria-current="page" className="text-secondary dark:text-secondary">
              {item.name}
            </span>
          ) : (
            <Link
              href={item.pathname}
              className="hover:text-accent-highlight underline-effect"
            >
              {item.name}
            </Link>
          )}
          {!isCurrentPage && (
            <span aria-hidden="true" className="text-accent dark:text-accent">
              /
            </span>
          )}
        </span>
      );
    })}
  </nav>
);

export default BreadcrumbTrail;
