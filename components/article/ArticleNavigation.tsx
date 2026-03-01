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
}: {
  direction: 'previous' | 'next';
  post: ArticleNavItem;
}) => {
  const isNext = direction === 'next';
  
  return (
    <Link
      prefetch={false}
      href={getArticlePath(post.slug)}
      className={`group block transition-colors duration-300 ${
        isNext ? 'text-right' : 'text-left'
      }`}
    >
      <span className={`text-xs uppercase tracking-[0.2em] text-secondary font-light mb-3 flex items-center gap-3 ${isNext ? 'justify-end' : 'justify-start'}`}>
        {!isNext && (
          <span className="text-accent-highlight transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
        )}
        {isNext ? 'Next' : 'Previous'}
        {isNext && (
          <span className="text-accent-highlight transform transition-transform duration-300 group-hover:translate-x-1">→</span>
        )}
      </span>
      <h4 className="text-primary text-lg md:text-xl font-medium tracking-wide group-hover:text-accent-highlight transition-colors duration-300">
        {post.title}
      </h4>
      {post.description && (
        <p className="text-secondary/70 text-sm mt-2 font-light line-clamp-2">
          {post.description}
        </p>
      )}
    </Link>
  );
};

const ArticleNavigation = ({ previousPost, nextPost }: ArticleNavigationProps) => {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-16 md:mt-24 pt-10 border-t-[0.5px] border-accent-subtle/50 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
      <div className="w-full">
        {previousPost && <NavigationLink direction="previous" post={previousPost} />}
      </div>
      <div className="w-full">
        {nextPost && <NavigationLink direction="next" post={nextPost} />}
      </div>
    </nav>
  );
};

export default ArticleNavigation;
