import { FiGithub, RiMoonClearLine, RiSunLine } from 'react-icons/all';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeaderIcon = ({ onClick, children }: { onClick?: () => void, children }) => {
  return (
    <button className='cursor-pointer rounded-full text-gray-400 hover:text-orange-400 p-1'
            onClick={onClick}>
      {children}
    </button>
  );
};

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  return (
    <motion.div className='p-1' whileTap={{ rotate: 360 }}>
      <HeaderIcon onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <RiMoonClearLine size={25} /> : <RiSunLine size={25} />}
      </HeaderIcon>
    </motion.div>
  );
};

const HeaderIcons = () => {
  return (
    <div className='basis-1/3 flex justify-end'>
      <ThemeToggle />
      <HeaderIcon>
        <Link href='https://github.com/chrismphilp/philp.io'>
          <FiGithub size={25} />
        </Link>
      </HeaderIcon>
    </div>
  );
};

export default HeaderIcons;
