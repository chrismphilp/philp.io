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
  getAdjacentPublishedPosts,
  getPublishedPostBySlug,
  getPublishedPostMetadata,
  type PostMeta,
  postSlugFromPath,
} from '../../../utils/mdxUtils';
import {
  buildArticleBreadcrumbs,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildMetadata,
} from '../../../utils/seo';

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
      // Match gutters and column caps; sizes uses the initial 16px font size,
      // so the md article cap of 75ch at 18px becomes 84.375ch here.
      sizes="(min-width: 1280px) min(100ch, calc(100vw - 32rem)), (min-width: 1024px) min(96ch, calc(100vw - 28rem)), (min-width: 768px) min(84.375ch, calc(100vw - 6rem)), (min-width: 640px) min(65ch, calc(100vw - 3rem)), calc(100vw - 3rem)"
    />
  ),
  BrainrotLineChart: BrainrotLineChart,
};

const buildNavItem = (post: PostMeta | null) => {
  if (!post) {
    return null;
  }

  return {
    title: post.data.title,
    description: post.data.description,
    slug: postSlugFromPath(post.filePath),
  };
};

export async function generateStaticParams() {
  return getPublishedPostMetadata().map((post) => ({
    slug: postSlugFromPath(post.filePath),
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
  const breadcrumbs = buildArticleBreadcrumbs(slug, data.category, data.title);

  const { older, newer } = getAdjacentPublishedPosts(slug);

  return (
    <section className="flex flex-col items-stretch py-2">
      <StructuredData data={buildBreadcrumbSchema(breadcrumbs)} />
      <StructuredData data={buildArticleSchema({ slug, post })} />

      <Article
        frontMatter={{ ...data, slug }}
        breadcrumbs={breadcrumbs}
        previousPost={buildNavItem(older)}
        nextPost={buildNavItem(newer)}
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
