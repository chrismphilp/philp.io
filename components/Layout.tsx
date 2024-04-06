import Header from './header/Header';
import Footer from './footer/Footer';
import { Bitter } from 'next/font/google';
import Head from 'next/head';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const sourceCodePro = Bitter({
  subsets: ['latin'],
  variable: '--font-source-code',
});

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="version" content={publicRuntimeConfig?.version} />
      </Head>
      <div
        className={`flex flex-col min-h-screen ${sourceCodePro.variable} font-sans bg-white dark:bg-gray-800`}
      >
        <Header />
        <div className="grow px-2 md:px-0">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
