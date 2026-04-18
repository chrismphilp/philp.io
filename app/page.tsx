import Link from 'next/link';
import StructuredData from '../components/seo/StructuredData';
import InfiniteArticleList from '../components/article/InfiniteArticleList';
import { ArticleType } from '../components/types';
import { formatDate } from '../utils/dateUtils';
import { getPublishedPostMetadata, sortPostsByDateDescending } from '../utils/mdxUtils';
import { buildHomeSchema, buildMetadata, siteConfig } from '../utils/seo';

const homeDescription =
  'Essays and articles by Christopher Philp on software, science, ethics, language, books, and everyday life.';

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.siteName,
  description: homeDescription,
  pathname: '/',
});

export default function Homepage() {
  const posts = sortPostsByDateDescending(getPublishedPostMetadata());
  const [featuredPost, ...remainingPosts] = posts;

  if (!featuredPost) {
    return null;
  }

  const postCount = posts.length;
  const topicCount = new Set(posts.map((post) => post.data.category)).size;
  const techCount = posts.filter(
    (post) => post.data.category === ArticleType.TECHNOLOGY,
  ).length;
  const miscCount = postCount - techCount;
  const featuredLink = `/articles/${featuredPost.filePath.replace(/\.mdx?$/, '')}`;
  const quickLinks = [
    {
      href: '/tech',
      label: 'Tech archive',
      description: `${techCount} posts on software, tooling, and engineering edges.`,
    },
    {
      href: '/misc',
      label: 'Misc archive',
      description: `${miscCount} essays that sit outside the tech lane.`,
    },
    {
      href: '/quotes',
      label: 'Quotes shelf',
      description: 'A quieter page for fragments worth keeping around.',
    },
  ];

  return (
    <section className="pb-20 md:pb-28 relative pt-6 md:pt-8">
      <StructuredData data={buildHomeSchema(posts)} />

      <div className="paper-hero rounded-[2rem] md:rounded-[2.5rem] px-6 py-8 md:px-10 md:py-12 lg:px-12 overflow-hidden relative">
        <div className="absolute right-6 top-6 hidden md:block h-20 w-20 rounded-full border border-accent-subtle/70" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] lg:gap-12">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
              Personal blog
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.04em] text-primary font-light">
              Long-form notes on software, ethics, language, and whatever else survives
              revision.
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-secondary">
              The design stays quiet, but the hierarchy is sharper: featured work up front,
              clearer wayfinding, and better reading tools once you are inside an essay.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[11px] uppercase tracking-[0.24em] rounded-full border border-accent-subtle/80 px-4 py-2 text-primary transition-colors duration-300 hover:border-accent-highlight hover:text-accent-highlight"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="paper-surface rounded-[1.5rem] px-5 py-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-secondary">
                Posts
              </p>
              <p className="mt-3 text-3xl text-primary font-light">{postCount}</p>
              <p className="mt-2 text-sm leading-6 text-secondary">
                Essays published across {topicCount} recurring subjects.
              </p>
            </div>
            <div className="paper-surface rounded-[1.5rem] px-5 py-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-secondary">
                Latest
              </p>
              <p className="mt-3 text-xl text-primary font-light">
                {formatDate(featuredPost.data.date)}
              </p>
              <p className="mt-2 text-sm leading-6 text-secondary">
                Freshly surfaced on the homepage instead of disappearing into the archive
                stack.
              </p>
            </div>
            <div className="paper-surface rounded-[1.5rem] px-5 py-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-secondary">
                Reading mode
              </p>
              <p className="mt-3 text-xl text-primary font-light">TOC + progress</p>
              <p className="mt-2 text-sm leading-6 text-secondary">
                Long essays now expose structure while you read instead of acting like one
                undifferentiated page.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <Link
          href={featuredLink}
          className="group paper-surface rounded-[2rem] px-6 py-7 md:px-8 md:py-8 transition-transform duration-300 hover:-translate-y-1"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
            Featured essay
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl leading-tight tracking-[-0.03em] text-primary font-light max-w-3xl group-hover:text-accent-highlight transition-colors duration-300">
            {featuredPost.data.title}
          </h2>
          <p className="mt-5 text-base md:text-lg leading-8 text-secondary max-w-3xl">
            {featuredPost.data.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[11px] uppercase tracking-[0.24em] text-secondary">
            <span>{formatDate(featuredPost.data.date)}</span>
            <span>{featuredPost.data.category}</span>
            <span>{featuredPost.data.readingTime}</span>
            <span>{featuredPost.data.wordCount.toLocaleString()} words</span>
          </div>
        </Link>

        <div className="paper-surface rounded-[2rem] px-6 py-7 md:px-7">
          <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
            Wayfinding
          </p>
          <div className="mt-5 space-y-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-[1.25rem] border border-accent-subtle/70 px-4 py-4 transition-colors duration-300 hover:border-accent-highlight"
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-secondary">
                  {link.label}
                </p>
                <p className="mt-2 text-base text-primary font-light leading-7">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
              Recent writing
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl text-primary font-light tracking-[-0.03em]">
              The archive, minus the featured lead.
            </h2>
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-secondary">
            Scroll to continue through the archive
          </p>
        </div>

        <div className="asymmetric-element">
          <InfiniteArticleList allPosts={remainingPosts} initialPostCount={10} />
        </div>
      </div>
    </section>
  );
}
