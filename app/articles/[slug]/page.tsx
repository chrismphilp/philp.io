import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Article from '../../../components/article/Article';
import BrainrotLineChart from '../../../components/charts/BrainrotLineChart';
import StructuredData from '../../../components/seo/StructuredData';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeImgSize from 'rehype-img-size';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import ExportedImage from 'next-image-export-optimizer';
import {
  getPublishedPostBySlug,
  getPublishedPostMetadata,
  PostMeta,
  sortPostsByDateDescending,
} from '../../../utils/mdxUtils';
import { buildArticleSchema, buildMetadata } from '../../../utils/seo';

const components = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <ExportedImage
      className="mx-auto"
      {...(props as unknown as React.ComponentProps<typeof ExportedImage>)}
      src={(props.src as string) || ''}
      alt={props.alt || ''}
      priority={props.loading === 'eager'}
      placeholder="blur"
      loading={props.loading ?? 'lazy'}
      role="img"
      sizes="(min-width: 1024px) 80ch, 100vw"
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
  return getPublishedPostMetadata().map((post) => ({
    slug: post.filePath.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPublishedPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      pathname: `/articles/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.data.title,
    description: post.data.description,
    pathname: `/articles/${params.slug}`,
    type: 'article',
    publishedTime: new Date(post.data.date).toISOString(),
    modifiedTime: post.data.lastModified,
    section: post.data.category,
  });
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const post = getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content, data } = post;

  const sortedPosts = sortPostsByDateDescending(getPublishedPostMetadata());

  const currentIndex = sortedPosts.findIndex(
    (post) => postSlugFromPath(post.filePath) === slug,
  );
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const previousPost =
    currentIndex >= 0 && currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return (
    <section className="flex flex-col items-stretch py-2">
      <StructuredData data={buildArticleSchema({ slug, post })} />

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
    </section>
  );
}
