import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';

type ActionLabel = {
  label: string;
  children: ReactNode;
};

export const HeaderActionLink = ({
  label,
  title = label,
  className = '',
  ...props
}: Omit<ComponentProps<typeof Link>, 'aria-label'> & ActionLabel) => (
  <Link
    {...props}
    aria-label={label}
    title={title}
    className={`inline-flex shrink-0 cursor-pointer items-center justify-center p-1 text-primary transition-colors duration-300 hover:text-accent-highlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-highlight ${className}`}
  />
);

export const HeaderActionButton = ({
  label,
  title = label,
  className = '',
  type = 'button',
  ...props
}: Omit<ComponentProps<'button'>, 'aria-label'> & ActionLabel) => (
  <button
    {...props}
    type={type}
    aria-label={label}
    title={title}
    className={`inline-flex shrink-0 cursor-pointer items-center justify-center p-1 text-primary transition-colors duration-300 hover:text-accent-highlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-highlight ${className}`}
  />
);

const HeaderActions = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-2 border-l border-accent-subtle pl-6">
    {children}
  </div>
);

export default HeaderActions;
