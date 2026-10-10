'use client';
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import { FiGithub } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const HeaderIcon = ({ onClick, children }: { onClick?: () => void; children }) => (
  <div
    className="cursor-pointer text-primary hover:text-accent-highlight p-1 transition-colors duration-300 flex items-center justify-center"
    onClick={onClick}
  >
    {children}
  </div>
);

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="theme-toggle flex items-center">
      <HeaderIcon onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
        {/* Keep the same markup before hydration; the document theme selects the icon. */}
        <RiMoonClearLine size={20} className="dark:hidden" />
        <RiSunLine size={20} className="hidden dark:block" />
      </HeaderIcon>
    </div>
  );
};

const HeaderIcons = () => (
  <div className="flex items-center border-l border-accent-subtle pl-6 ml-6">
    <ThemeToggle />
    <HeaderIcon>
      <Link
        title="Github Link"
        href="https://github.com/chrismphilp/philp.io"
        className="flex items-center justify-center"
      >
        <FiGithub size={20} />
      </Link>
    </HeaderIcon>
  </div>
);

export default HeaderIcons;
