import { FiGithub, RiMoonClearLine, RiSunLine } from 'react-icons/all';
import { useTheme } from 'next-themes';
import { redirect } from 'next/navigation';

const HeaderIcon = ({ onClick, children }: { onClick?: () => void, children }) => {
  return (
    <button className='cursor-pointer rounded-full text-gray-400 hover:text-orange-400 p-1'
            onClick={onClick}>
      {children}
    </button>
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <HeaderIcon onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <RiMoonClearLine size={25} /> : <RiSunLine size={25} />}
    </HeaderIcon>
  );
};

const HeaderIcons = () => {
  return (
    <div className='basis-1/3 flex justify-end'>
      <ThemeToggle />
      <HeaderIcon onClick={() => redirect('https://github.com/chrismphilp/philp.io')}>
        <FiGithub size={25} />
      </HeaderIcon>
    </div>
  );
};

export default HeaderIcons;
