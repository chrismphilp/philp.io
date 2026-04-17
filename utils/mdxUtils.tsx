import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { z } from 'zod';
import { ArticleData, ArticleType } from '../components/types';

// ARTICLES_PATH is useful when you want to get the path to a specific file
export const ARTICLES_PATH = path.join(process.cwd(), 'articles');

export const QUOTES_PATH = path.join(process.cwd(), 'app/quotes');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const articleFilePaths = fs
  .readdirSync(ARTICLES_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export type PostMeta = {
  data: ArticleData;
  filePath: string;
};

export type PostData = PostMeta & {
  content: string;
};

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  date: z.string(),
  category: z.nativeEnum(ArticleType),
  draft: z.boolean().optional().default(false),
});

const buildPostData = (filePath: string): PostData => {
  const fullPath = path.join(ARTICLES_PATH, filePath);
  const source = fs.readFileSync(fullPath);
  const { content, data } = matter(source);
  const validatedData = FrontmatterSchema.parse(data);

  return {
    content,
    data: {
      ...validatedData,
      lastModified: new Date(validatedData.date).toISOString(),
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content).text,
    } as ArticleData,
    filePath,
  };
};

export const getPostMetadata = (): PostMeta[] =>
  articleFilePaths.map((filePath) => {
    const { data } = buildPostData(filePath);

    return {
      data,
      filePath,
    };
  });

export const getPublishedPostMetadata = (): PostMeta[] =>
  getPostMetadata().filter((post) => !post.data.draft);

export const getPosts = (): PostData[] =>
  articleFilePaths.map((filePath) => buildPostData(filePath));

const getArticleFilePathBySlug = (slug: string) =>
  articleFilePaths.find((filePath) => filePath.replace(/\.mdx?$/, '') === slug);

export const getPostBySlug = (slug: string): PostData | null => {
  const filePath = getArticleFilePathBySlug(slug);

  if (!filePath) {
    return null;
  }

  return buildPostData(filePath);
};

export const getPublishedPostBySlug = (slug: string): PostData | null => {
  const post = getPostBySlug(slug);

  if (!post || post.data.draft) {
    return null;
  }

  return post;
};

export const sortPostsByDateDescending = <T extends PostMeta>(posts: T[]) =>
  [...posts].sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));
