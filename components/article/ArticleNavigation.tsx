import Link from 'next/link';
import styles from './ArticleNavigation.module.css';

export type ArticleNavItem = {
  title: string;
  description: string;
  slug: string;
};

type ArticleNavigationProps = {
  previousPost?: ArticleNavItem | null;
  nextPost?: ArticleNavItem | null;
};

enum ArticleNavigationDirection {
  OLDER = 'older',
  NEWER = 'newer',
}

type NavigationDirectionConfig = {
  label: string;
  rel: string;
  arrow: string;
};

const navigationDirections: Record<ArticleNavigationDirection, NavigationDirectionConfig> = {
  [ArticleNavigationDirection.OLDER]: {
    label: 'Older post',
    rel: 'prev',
    arrow: '←',
  },
  [ArticleNavigationDirection.NEWER]: {
    label: 'Newer post',
    rel: 'next',
    arrow: '→',
  },
};

type NavigationLinkProps = {
  direction: ArticleNavigationDirection;
  post?: ArticleNavItem | null;
};

const NavigationLink = ({ direction, post }: NavigationLinkProps) => {
  if (!post) {
    return null;
  }

  const { label, rel, arrow } = navigationDirections[direction];

  return (
    <Link
      prefetch={false}
      href={`/articles/${post.slug}`}
      rel={rel}
      data-direction={direction}
      className={styles.postLink}
    >
      <span className={styles.direction}>
        <span aria-hidden="true">{arrow}</span>
        {label}
      </span>
      <p className={styles.title}>{post.title}</p>
      {post.description && <p className={styles.description}>{post.description}</p>}
    </Link>
  );
};

const ArticleNavigation = ({ previousPost, nextPost }: ArticleNavigationProps) => {
  return (
    <nav aria-label="Article navigation" className={`not-prose ${styles.navigation}`}>
      <div className={styles.posts}>
        <NavigationLink direction={ArticleNavigationDirection.OLDER} post={previousPost} />
        <NavigationLink direction={ArticleNavigationDirection.NEWER} post={nextPost} />
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
