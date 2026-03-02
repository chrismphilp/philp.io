import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Article from '../../../components/article/Article';
import BrainrotLineChart from '../../../components/charts/BrainrotLineChart';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeImgSize from 'rehype-img-size';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import ExportedImage from 'next-image-export-optimizer';
import {
  ARTICLES_PATH,
  articleFilePaths,
  getPostMetadata,
  PostMeta,
} from '../../../utils/mdxUtils';

const components = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <ExportedImage
      className="mx-auto"
      {...(props as unknown as React.ComponentProps<typeof ExportedImage>)}
      src={(props.src as string) || ''}
      alt={props.alt || ''}
      priority={true}
      placeholder="blur"
      loading="eager"
      role="img"
    />
  ),
  BrainrotLineChart: BrainrotLineChart,
};

const postSlugFromPath = (filePath: string) => filePath.replace(/\.mdx?$/, '');

const buildNavItem = (post: PostMeta | null) =>
  post
    ? {
        title: post.data.title,
        description: post.data.description,
        slug: postSlugFromPath(post.filePath),
      }
    : null;

export async function generateStaticParams() {
  const paths = articleFilePaths.map((path) => ({
    slug: path.replace(/\.mdx?$/, ''),
  }));
  return paths;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const articleFilePath = path.join(ARTICLES_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(articleFilePath, 'utf8');
  const { data } = matter(source);
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const articleFilePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(articleFilePath, 'utf8');
  const { content, data } = matter(source);

  const sortedPosts = getPostMetadata()
    .filter((post) => !post.data.draft)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  const currentIndex = sortedPosts.findIndex(
    (post) => postSlugFromPath(post.filePath) === slug,
  );
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const previousPost =
    currentIndex >= 0 && currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return (
    <main className="flex flex-col items-stretch md:items-center py-2">
      <Article
        frontMatter={{ ...data, slug }}
        previousPost={buildNavItem(previousPost)}
        nextPost={buildNavItem(nextPost)}
      >
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              remarkPlugins: [remarkGfm] as any,
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  { behavior: 'wrap', properties: { className: ['anchor'] } },
                ],
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: 'monokai',
                      light: 'github-light',
                    },
                    keepBackground: true,
                  },
                ],
                [rehypeImgSize, { dir: 'public' }],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ] as any,
            },
          }}
        />
      </Article>
    </main>
  );
}
