import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/library.css';
import { siteConfig } from '../utils/seo';

const professionalFont = localFont({
  src: [
    { path: './fonts/spectral-latin-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/spectral-latin-300-italic.woff2', weight: '300', style: 'italic' },
  ],
  display: 'optional',
  variable: '--font-spectral',
});

const pixelFont = localFont({
  src: './fonts/vt323-latin.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: '/',
  },
  verification: siteConfig.googleSiteVerification
    ? {
        google: siteConfig.googleSiteVerification,
      }
    : undefined,
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: siteConfig.socialImage,
        alt: siteConfig.siteName,
      },
    ],
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
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
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`flex flex-col min-h-screen ${professionalFont.variable} ${pixelFont.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          enableColorScheme
        >
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="site-main grow" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
