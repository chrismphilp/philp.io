import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code',
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <main className={`${sourceCodePro.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default App;
