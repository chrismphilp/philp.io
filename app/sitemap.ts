import type { MetadataRoute } from 'next';
import { ArticleType } from '../components/types';
import {
  getPublishedPostMetadata,
  PostMeta,
  sortPostsByDateDescending,
} from '../utils/mdxUtils';
import { buildAbsoluteUrl } from '../utils/seo';

export const dynamic = 'force-static';

const getMostRecentLastModified = (posts: PostMeta[]) => posts[0]?.data.lastModified;

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = sortPostsByDateDescending(getPublishedPostMetadata());
  const techPosts = publishedPosts.filter((post) => post.data.category === ArticleType.TECHNOLOGY);
  const miscPosts = publishedPosts.filter((post) => post.data.category !== ArticleType.TECHNOLOGY);

  return [
    {
      url: buildAbsoluteUrl('/'),
      lastModified: getMostRecentLastModified(publishedPosts),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: buildAbsoluteUrl('/tech'),
      lastModified: getMostRecentLastModified(techPosts),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl('/misc'),
      lastModified: getMostRecentLastModified(miscPosts),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...publishedPosts.map((post) => ({
      url: buildAbsoluteUrl(`/articles/${post.filePath.replace(/\.mdx?$/, '')}`),
      lastModified: post.data.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
