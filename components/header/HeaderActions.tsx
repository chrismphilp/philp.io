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
  <Link {...props} aria-label={label} title={title} className={`header-action ${className}`} />
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
    className={`header-action ${className}`}
  />
);

const HeaderActions = ({ children }: { children: ReactNode }) => (
  <div className="header-actions">{children}</div>
);

export default HeaderActions;
