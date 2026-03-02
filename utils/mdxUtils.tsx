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

export const getPostMetadata = (): PostMeta[] =>
  articleFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(ARTICLES_PATH, filePath));
    const { content, data } = matter(source);

    // Validate frontmatter to ensure type safety
    const validatedData = FrontmatterSchema.parse(data);

    return {
      data: {
        ...validatedData,
        wordCount: content.split(/\s+/g).length,
        readingTime: readingTime(content).text,
      } as ArticleData,
      filePath,
    };
  });

export const getPosts = (): PostData[] =>
  getPostMetadata().map((meta) => {
    const source = fs.readFileSync(path.join(ARTICLES_PATH, meta.filePath));
    const { content } = matter(source);

    return {
      ...meta,
      content,
    };
  });
