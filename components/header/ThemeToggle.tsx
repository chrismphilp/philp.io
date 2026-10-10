'use client';

import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';
import { HeaderActionButton } from './HeaderActions';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <HeaderActionButton
      label="Toggle color theme"
      className="theme-toggle"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {/* Keep the same markup before hydration; the document theme selects the icon. */}
      <RiMoonClearLine size={20} className="dark:hidden" aria-hidden="true" />
      <RiSunLine size={20} className="hidden dark:block" aria-hidden="true" />
    </HeaderActionButton>
  );
};

export default ThemeToggle;
