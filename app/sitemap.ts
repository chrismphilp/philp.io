import type { MetadataRoute } from 'next';
import { ArticleType } from '../components/types';
import { getPosts, sortPostsByDateDescending } from '../utils/mdxUtils';
import { buildAbsoluteUrl, siteConfig } from '../utils/seo';

export const dynamic = 'force-static';

const markdownImagePattern = /!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
const htmlImagePattern = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;

const getMostRecentLastModified = <T extends { data: { lastModified: string } }>(posts: T[]) =>
  posts[0]?.data.lastModified;

const extractImageUrls = (content: string) => {
  const imageUrls = new Set<string>();

  for (const match of content.matchAll(markdownImagePattern)) {
    const src = match[1];

    if (!src || src.startsWith('data:')) {
      continue;
    }

    imageUrls.add(buildAbsoluteUrl(src));
  }

  for (const match of content.matchAll(htmlImagePattern)) {
    const src = match[1];

    if (!src || src.startsWith('data:')) {
      continue;
    }

    imageUrls.add(buildAbsoluteUrl(src));
  }

  return [...imageUrls];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = sortPostsByDateDescending(
    getPosts().filter((post) => !post.data.draft),
  );
  const techPosts = publishedPosts.filter((post) => post.data.category === ArticleType.TECHNOLOGY);
  const miscPosts = publishedPosts.filter((post) => post.data.category !== ArticleType.TECHNOLOGY);

  return [
    {
      url: buildAbsoluteUrl('/'),
      lastModified: getMostRecentLastModified(publishedPosts),
      changeFrequency: 'daily',
      images: [buildAbsoluteUrl(siteConfig.socialImage)],
      priority: 1,
    },
    {
      url: buildAbsoluteUrl('/tech'),
      lastModified: getMostRecentLastModified(techPosts),
      changeFrequency: 'weekly',
      images: [buildAbsoluteUrl(siteConfig.socialImage)],
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl('/misc'),
      lastModified: getMostRecentLastModified(miscPosts),
      changeFrequency: 'weekly',
      images: [buildAbsoluteUrl(siteConfig.socialImage)],
      priority: 0.8,
    },
    ...publishedPosts.map((post) => {
      const images = extractImageUrls(post.content);

      return {
        url: buildAbsoluteUrl(`/articles/${post.filePath.replace(/\.mdx?$/, '')}`),
        lastModified: post.data.lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        ...(images.length ? { images } : {}),
      };
    }),
  ];
}
