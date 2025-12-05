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
    className="group block rounded-md border border-transparent p-4 transition-colors duration-300 hover:border-accent-highlight"
  >
    <span className="text-xs uppercase tracking-widest text-secondary">{label}</span>
    <p className="text-primary text-lg font-light group-hover:text-accent-highlight">
      {post.title}
    </p>
    <p className="text-secondary text-sm mt-1">{post.description}</p>
  </Link>
);

const ArticleNavigation = ({ previousPost, nextPost }: ArticleNavigationProps) => {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-10 pt-6 border-t border-accent-subtle grid gap-6 md:grid-cols-2">
      {previousPost && <NavigationLink label="Previous" post={previousPost} />}
      {nextPost && <NavigationLink label="Next" post={nextPost} />}
    </nav>
  );
};

export default ArticleNavigation;
