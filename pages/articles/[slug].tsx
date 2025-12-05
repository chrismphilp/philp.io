import path from 'path';
import fs from 'fs';
import { articleFilePaths, ARTICLES_PATH, getPostMetadata } from 'utils/mdxUtils';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Article from 'components/article/Article';
import BrainrotLineChart from 'components/charts/BrainrotLineChart';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeImgSize from 'rehype-img-size';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import ExportedImage from 'next-image-export-optimizer';
import matter from 'gray-matter';

const components = {
  img: (props) => (
    <ExportedImage
      className="mx-auto"
      {...props}
      priority={true}
      placeholder="blur"
      loading="eager"
      role="img"
    />
  ),
  BrainrotLineChart: BrainrotLineChart,
};

const Articles = ({ source, frontMatter, previousPost, nextPost }) => (
  <main className="flex flex-col items-stretch md:items-center py-2">
    <Article frontMatter={frontMatter} previousPost={previousPost} nextPost={nextPost}>
      <MDXRemote {...source} components={components} />
    </Article>
  </main>
);

const postSlugFromPath = (filePath: string) => filePath.replace(/\.mdx?$/, '');

const buildNavItem = (post) =>
  post
    ? {
        title: post.data.title,
        description: post.data.description,
        slug: postSlugFromPath(post.filePath),
      }
    : null;

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const articleFilePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(articleFilePath);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      format: 'mdx',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['anchor'] } }],
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
      ],
    },
    parseFrontmatter: true,
    scope: data,
  });

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

  return {
    props: {
      source: mdxSource,
      frontMatter: { ...data, slug },
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content).text,
      previousPost: buildNavItem(previousPost),
      nextPost: buildNavItem(nextPost),
    },
  };
}

export function getStaticPaths() {
  const paths = articleFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default Articles;
