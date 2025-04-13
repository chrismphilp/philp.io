import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import { FiGithub } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeaderIcon = ({ onClick, children }: { onClick?: () => void; children }) => (
  <div
    className="cursor-pointer text-primary hover:text-accent-highlight p-1 transition-colors duration-300 flex items-center justify-center"
    onClick={onClick}
  >
    {children}
  </div>
);

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  return (
    <motion.div
      whileTap={{ rotate: 180 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <HeaderIcon onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <RiMoonClearLine size={20} /> : <RiSunLine size={20} />}
      </HeaderIcon>
    </motion.div>
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
