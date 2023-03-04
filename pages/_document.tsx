import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/blog/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/blog/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/blog/images/favicon-16x16.png' />
        <link rel='manifest' href='/blog/site.webmanifest' />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
};

export default Document;
