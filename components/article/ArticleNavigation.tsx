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
  label,
  post,
}: {
  label: 'Previous' | 'Next';
  post: ArticleNavItem;
}) => (
  <Link
    prefetch={false}
    href={getArticlePath(post.slug)}
    className="group block rounded-[1.5rem] border border-accent-subtle/70 px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-highlight hover:shadow-washi"
  >
    <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-secondary">
      {label}
    </span>
    <p className="mt-3 text-primary text-xl font-light leading-snug group-hover:text-accent-highlight">
      {post.title}
    </p>
    <p className="text-secondary text-sm mt-2 leading-6">{post.description}</p>
  </Link>
);

const ArticleNavigation = ({ previousPost, nextPost }: ArticleNavigationProps) => {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-14 mb-16 pt-8 border-t border-accent-subtle/70 grid gap-6 md:grid-cols-2">
      {previousPost && <NavigationLink label="Previous" post={previousPost} />}
      {nextPost && <NavigationLink label="Next" post={nextPost} />}
    </nav>
  );
};

export default ArticleNavigation;
