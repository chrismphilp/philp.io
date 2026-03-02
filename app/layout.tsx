import { ThemeProvider } from 'next-themes';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Spectral } from 'next/font/google';
import '../styles/globals.css';

const professionalFont = Spectral({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-spectral',
});

export const metadata = {
  title: 'philp.io',
  description: 'A personal blog',
  icons: {
    icon: [
      { url: '/blog/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/blog/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/blog/images/apple-touch-icon.png',
  },
  manifest: '/blog/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen ${professionalFont.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableColorScheme>
          <Header />
          <main className="grow px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
