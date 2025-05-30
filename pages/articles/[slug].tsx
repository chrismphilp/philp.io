import path from 'path';
import fs from 'fs';
import { articleFilePaths, ARTICLES_PATH } from 'utils/mdxUtils';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Article from 'components/article/Article';
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
};

const Articles = ({ source, frontMatter }) => (
  <main className="flex flex-col items-stretch md:items-center py-2">
    <Article frontMatter={frontMatter}>
      <MDXRemote {...source} components={components} />
    </Article>
  </main>
);

export async function getStaticProps({ params }) {
  const articleFilePath = path.join(ARTICLES_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(articleFilePath);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
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
            onVisitHighlightedLine(node) {
              // Each line node by default has `class="line"`.
              node.properties.className?.push('highlighted');
            },
            onVisitHighlightedWord(node) {
              node.properties.className = ['word-highlighted'];
            },
          },
        ],
        [rehypeImgSize, { dir: 'public' }],
      ],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content).text,
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
