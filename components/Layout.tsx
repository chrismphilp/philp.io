import Header from './header/Header';
import Footer from './footer/Footer';
import { Bitter } from 'next/font/google';
import Head from 'next/head';
import pkg from '../package.json';

const bitter = Bitter({
  subsets: ['latin'],
  variable: '--font-source-code',
});

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="version" content={pkg.version} />
      </Head>
      <div
        className={`flex flex-col min-h-screen ${bitter.variable} font-serif`}
        style={{ minHeight: '100vh' }}
      >
        <Header />
        <main className="grow px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
