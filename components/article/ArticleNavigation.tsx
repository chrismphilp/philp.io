import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './ArticleNavigation.module.css';

export type ArticleNavItem = {
  title: string;
  description: string;
  slug: string;
};

type ArticleNavigationProps = {
  olderPost: ArticleNavItem | null;
  newerPost: ArticleNavItem | null;
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

const ArticleNavigation = ({ olderPost, newerPost }: ArticleNavigationProps) => {
  return (
    <nav aria-label="Article navigation" className={`not-prose ${styles.navigation}`}>
      <div className={styles.posts}>
        {olderPost && (
          <ArticleNavigationLink post={olderPost} rel="prev">
            <span aria-hidden="true">←</span>
            Older post
          </ArticleNavigationLink>
        )}
        {newerPost && (
          <ArticleNavigationLink post={newerPost} rel="next">
            Newer post
            <span aria-hidden="true">→</span>
          </ArticleNavigationLink>
        )}
      </div>
      <div className={styles.archive}>
        <Link href="/" prefetch={false} className={styles.archiveLink}>
          All writing
        </Link>
      </div>
    </nav>
  );
};

export default ArticleNavigation;
