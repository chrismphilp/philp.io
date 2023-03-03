import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' enableColorScheme storageKey={'philp.io.key'}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
