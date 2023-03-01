import Header from './header/Header';
import Footer from './footer/Footer';
import { Bitter } from 'next/font/google';

const sourceCodePro = Bitter({
  subsets: ['latin'],
  variable: '--font-source-code',
});

const Layout = ({ children }) => {
  return (
    <div className={`flex flex-col min-h-screen ${sourceCodePro.variable} font-sans bg-white dark:bg-gray-800`}>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  )
};

export default Layout;
