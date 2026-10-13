import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './ArticleNavigation.module.css';

export type ArticleNavItem = {
  title: string;
  description: string;
  slug: string;
};

type ArticleNavigationProps = {
  currentPostSlug: string;
  previousPost?: ArticleNavItem | null;
  nextPost?: ArticleNavItem | null;
};

type ArticleNavigationLinkProps = {
  post: ArticleNavItem;
  rel: 'prev' | 'next';
  children: ReactNode;
};

const ArticleNavigationLink = ({ post, rel, children }: ArticleNavigationLinkProps) => (
  <Link prefetch={false} href={`/articles/${post.slug}`} rel={rel} className={styles.postLink}>
    <span className={styles.direction}>{children}</span>
    <p className={styles.title}>{post.title}</p>
    {post.description && <p className={styles.description}>{post.description}</p>}
  </Link>
);

const ArticleNavigation = ({
  currentPostSlug,
  previousPost,
  nextPost,
}: ArticleNavigationProps) => {
  return (
    <nav aria-label="Article navigation" className={`not-prose ${styles.navigation}`}>
      <div className={styles.posts}>
        {previousPost && (
          <ArticleNavigationLink post={previousPost} rel="prev">
            <span aria-hidden="true">←</span>
            Older post
          </ArticleNavigationLink>
        )}
        {nextPost && (
          <ArticleNavigationLink post={nextPost} rel="next">
            Newer post
            <span aria-hidden="true">→</span>
          </ArticleNavigationLink>
        )}
      </div>
      <div className={styles.archive}>
        <Link
          href={`/#post-${currentPostSlug}`}
          prefetch={false}
          className={styles.archiveLink}
        >
          All writing
        </Link>
      </div>
    </nav>
  );
};

export default ArticleNavigation;
