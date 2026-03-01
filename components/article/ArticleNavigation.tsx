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
      className={`group flex flex-col justify-center p-6 border border-accent-subtle/30 hover:border-primary/20 hover:bg-primary/[0.02] dark:hover:bg-primary/10 transition-all duration-500 rounded-sm relative overflow-hidden ${
        isNext ? 'text-right items-end' : 'text-left items-start'
      }`}
    >
      <div className={`absolute top-0 bottom-0 w-1 bg-accent-highlight transition-transform duration-500 transform ${
        isNext ? 'right-0 translate-x-full group-hover:translate-x-0' : 'left-0 -translate-x-full group-hover:translate-x-0'
      }`} />
      
      <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-medium mb-3 flex items-center gap-2">
        {!isNext && (
          <span className="transform translate-x-1 group-hover:translate-x-0 transition-transform duration-300 opacity-50 group-hover:opacity-100">←</span>
        )}
        {isNext ? 'Next Article' : 'Previous Article'}
        {isNext && (
          <span className="transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300 opacity-50 group-hover:opacity-100">→</span>
        )}
      </span>
      <h4 className="text-primary text-lg md:text-xl font-medium tracking-wide group-hover:text-accent-highlight transition-colors duration-300">
        {post.title}
      </h4>
      {post.description && (
        <p className="text-secondary/80 text-sm mt-2 font-light line-clamp-2">
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
    <nav className="mt-16 md:mt-24 pt-8 border-t-[0.5px] border-accent-subtle/50 grid grid-cols-1 md:grid-cols-2 gap-4">
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
