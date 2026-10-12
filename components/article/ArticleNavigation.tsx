import Link from 'next/link';

export type ArticleNavItem = {
  title: string;
  description: string;
  slug: string;
};

type ArticleNavigationProps = {
  previousPost?: ArticleNavItem | null;
  nextPost?: ArticleNavItem | null;
};

const getArticlePath = (slug: string) => `/articles/${slug}`;

const NavigationLink = ({
  direction,
  post,
  hasOlderPost = false,
}: {
  direction: 'older' | 'newer';
  post: ArticleNavItem;
  hasOlderPost?: boolean;
}) => (
  <Link
    prefetch={false}
    href={getArticlePath(post.slug)}
    rel={direction === 'older' ? 'prev' : 'next'}
    className={`group block min-w-0 py-6 text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4 motion-reduce:transition-none ${
      direction === 'newer' ? 'md:col-start-2 md:text-right' : ''
    } ${hasOlderPost ? 'border-t border-accent-subtle dark:border-secondary md:border-t-0' : ''}`}
  >
    <span className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-secondary">
      {direction === 'older' && <span aria-hidden="true">←</span>}
      {direction === 'older' ? 'Older post' : 'Newer post'}
      {direction === 'newer' && <span aria-hidden="true">→</span>}
    </span>
    <p className="mt-3 text-[1.375rem] leading-snug font-normal text-primary underline decoration-accent/70 decoration-1 underline-offset-4 transition-colors duration-200 group-hover:decoration-accent-highlight group-focus-visible:decoration-accent-highlight motion-reduce:transition-none">
      {post.title}
    </p>
    {post.description && (
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary">
        {post.description}
      </p>
    )}
  </Link>
);

const ArticleNavigation = ({ previousPost, nextPost }: ArticleNavigationProps) => {
  return (
    <nav
      aria-label="Article navigation"
      className="not-prose mt-12 mb-16 border-t border-accent-subtle pt-2 dark:border-secondary lg:mb-[4.125rem] xl:mb-[5.125rem]"
    >
      <div className="grid gap-x-12 md:grid-cols-2">
        {previousPost && <NavigationLink direction="older" post={previousPost} />}
        {nextPost && (
          <NavigationLink
            direction="newer"
            post={nextPost}
            hasOlderPost={Boolean(previousPost)}
          />
        )}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/"
          prefetch={false}
          className="inline-flex min-h-11 items-center justify-center px-4 text-sm text-primary underline decoration-accent/70 decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-accent-highlight focus-visible:decoration-accent-highlight focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4 motion-reduce:transition-none"
        >
          All writing
        </Link>
      </div>
    </nav>
  );
};

export default ArticleNavigation;
