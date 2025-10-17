import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.scss';
import '../components/instrumentation-client';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableColorScheme>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;
