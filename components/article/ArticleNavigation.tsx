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

const ArticleNavigation = ({ olderPost, newerPost }: ArticleNavigationProps) => {
  return (
    <nav aria-label="Article navigation" className={`not-prose ${styles.navigation}`}>
      <div className={styles.posts}>
        {olderPost && (
          <Link
            prefetch={false}
            href={`/articles/${olderPost.slug}`}
            rel="prev"
            className={styles.postLink}
          >
            <span className={styles.direction}>
              <span aria-hidden="true">←</span>
              Older post
            </span>
            <p className={styles.title}>{olderPost.title}</p>
            {olderPost.description && (
              <p className={styles.description}>{olderPost.description}</p>
            )}
          </Link>
        )}
        {newerPost && (
          <Link
            prefetch={false}
            href={`/articles/${newerPost.slug}`}
            rel="next"
            className={styles.postLink}
          >
            <span className={styles.direction}>
              Newer post
              <span aria-hidden="true">→</span>
            </span>
            <p className={styles.title}>{newerPost.title}</p>
            {newerPost.description && (
              <p className={styles.description}>{newerPost.description}</p>
            )}
          </Link>
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
