import type { Metadata } from 'next';
import { ArticleType } from '../components/types';
import type { PostMeta } from './mdxUtils';

export const siteConfig = {
  author: 'Christopher Philp',
  description:
    'Essays and articles by Christopher Philp on software, science, ethics, language, books, and everyday life.',
  locale: 'en_GB',
  siteName: 'Christopher Philp',
  socialImage: '/blog/images/me.png',
  url: 'https://philp.io',
  githubUrl: 'https://github.com/chrismphilp',
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
};

export type BreadcrumbItem = {
  name: string;
  pathname: string;
};

type MetadataOptions = {
  title?: string;
  absoluteTitle?: string;
  description: string;
  pathname: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

const maxPreviewRobots = {
  follow: true,
  index: true,
  googleBot: {
    follow: true,
    index: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export const buildAbsoluteUrl = (pathname = '/') =>
  new URL(pathname, siteConfig.url).toString();

export const getCategoryCollection = (category: ArticleType) =>
  category === ArticleType.TECHNOLOGY
    ? {
        pathname: '/tech',
        title: 'Tech',
      }
    : {
        pathname: '/misc',
        title: 'Misc',
      };

export const buildMetadata = ({
  title,
  absoluteTitle,
  description,
  pathname,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: MetadataOptions): Metadata => {
  const resolvedTitle = absoluteTitle ?? title ?? siteConfig.siteName;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: pathname,
    },
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    category: section,
    openGraph: {
      title: resolvedTitle,
      description,
      url: pathname,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: siteConfig.socialImage,
          alt: resolvedTitle,
        },
      ],
      ...(type === 'article'
        ? {
            authors: [siteConfig.author],
            modifiedTime,
            publishedTime,
            section,
            tags,
          }
        : {}),
    },
    robots: noIndex
      ? {
          follow: true,
          googleBot: {
            follow: true,
            index: false,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
          index: false,
        }
      : maxPreviewRobots,
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [siteConfig.socialImage],
    },
  };
};

export const serializeJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildAbsoluteUrl(item.pathname),
  })),
});

export const buildCollectionBreadcrumbs = (
  title: string,
  pathname: string,
): BreadcrumbItem[] => [
  { name: 'Home', pathname: '/' },
  { name: title, pathname },
];

export const buildArticleBreadcrumbs = (
  slug: string,
  category: ArticleType,
  title: string,
): BreadcrumbItem[] => {
  const collection = getCategoryCollection(category);

  return [
    { name: 'Home', pathname: '/' },
    { name: collection.title, pathname: collection.pathname },
    { name: title, pathname: `/articles/${slug}` },
  ];
};

const buildItemList = (posts: PostMeta[]) =>
  posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: post.data.title,
    url: buildAbsoluteUrl(`/articles/${post.filePath.replace(/\.mdx?$/, '')}`),
  }));

export const buildHomeSchema = (posts: PostMeta[]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${siteConfig.url}/#website`,
      '@type': 'WebSite',
      description: siteConfig.description,
      inLanguage: 'en-GB',
      name: siteConfig.siteName,
      publisher: {
        '@id': `${siteConfig.url}/#person`,
      },
      url: siteConfig.url,
    },
    {
      '@id': `${siteConfig.url}/#person`,
      '@type': 'Person',
      name: siteConfig.author,
      sameAs: [siteConfig.githubUrl],
      url: siteConfig.url,
    },
    {
      '@type': 'CollectionPage',
      about: {
        '@id': `${siteConfig.url}/#person`,
      },
      description: siteConfig.description,
      isPartOf: {
        '@id': `${siteConfig.url}/#website`,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: buildItemList(posts.slice(0, 10)),
      },
      name: siteConfig.siteName,
      url: siteConfig.url,
    },
  ],
});

export const buildCollectionSchema = ({
  title,
  description,
  pathname,
  posts,
}: {
  title: string;
  description: string;
  pathname: string;
  posts: PostMeta[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  description,
  inLanguage: 'en-GB',
  isPartOf: {
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.url,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: buildItemList(posts),
  },
  name: title,
  url: buildAbsoluteUrl(pathname),
});

export const buildArticleSchema = ({
  slug,
  post,
}: {
  slug: string;
  post: PostMeta;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  articleSection: post.data.category,
  author: {
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
  },
  dateModified: post.data.lastModified,
  datePublished: new Date(post.data.date).toISOString(),
  description: post.data.description,
  headline: post.data.title,
  image: buildAbsoluteUrl(siteConfig.socialImage),
  inLanguage: 'en-GB',
  isAccessibleForFree: true,
  mainEntityOfPage: buildAbsoluteUrl(`/articles/${slug}`),
  publisher: {
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
  },
  url: buildAbsoluteUrl(`/articles/${slug}`),
  wordCount: post.data.wordCount,
});
