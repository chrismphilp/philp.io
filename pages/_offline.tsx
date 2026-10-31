import Head from 'next/head';
import Link from 'next/link';

export default function Offline() {
  return (
    <>
      <Head>
        <title>The library is offline | philp.io</title>
        <style>
          {
            'body{margin:0;background:#191713;color:#e9ddc7;font-family:Georgia,serif}*{box-sizing:border-box}'
          }
        </style>
      </Head>
      <main style={{ maxWidth: 560, margin: '15vh auto', padding: 28, lineHeight: 1.8 }}>
        <p style={{ color: '#d4a86d', fontSize: 12, letterSpacing: 3 }}>THE PHILP LIBRARY</p>
        <h1 style={{ fontWeight: 400, fontSize: 36, lineHeight: 1.3 }}>
          A quiet moment offline.
        </h1>
        <p>
          The connection has wandered off. Previously visited pages may still be available. The
          library will be here when you’re back.
        </p>
        <Link
          href="/"
          style={{
            color: '#d4a86d',
            display: 'inline-block',
            padding: '12px 0',
            textUnderlineOffset: 5,
          }}
        >
          Return to the library →
        </Link>
      </main>
    </>
  );
}
