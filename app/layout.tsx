import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Spectral } from 'next/font/google';
import { siteConfig } from '../utils/siteMetadata';
import '../styles/globals.css';

const professionalFont = Spectral({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-spectral',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.image],
  },
  twitter: {
    card: 'summary',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image.url],
  },
  icons: {
    icon: [
      { url: '/blog/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/blog/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/blog/images/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
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
