import type { Metadata } from 'next';

export const siteConfig = {
  title: 'Christopher Philp',
  siteName: 'philp.io',
  url: 'https://philp.io',
  description: 'Personal writing on technology, science, ethics, and everything else.',
  locale: 'en_GB',
  author: {
    name: 'Christopher Philp',
    url: 'https://philp.io',
  },
  image: {
    url: '/blog/images/me.png',
    width: 460,
    height: 460,
    alt: 'Christopher Philp',
  },
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export const buildStaticMetadata = ({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title,
    description,
    url: path,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.image],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [siteConfig.image.url],
  },
});

type ArticleMetadataOptions = PageMetadataOptions & {
  publishedTime: string;
  section?: string;
};

export const buildArticleMetadata = ({
  title,
  description,
  path,
  publishedTime,
  section,
}: ArticleMetadataOptions): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title,
    description,
    url: path,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: 'article',
    publishedTime,
    authors: [siteConfig.author.name],
    ...(section ? { section } : {}),
    images: [siteConfig.image],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [siteConfig.image.url],
  },
});
