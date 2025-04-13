import { useState, useEffect, useRef } from 'react';
import ArticleCard from './ArticleCard';
import { PostData } from '../../utils/mdxUtils';

interface InfiniteArticleListProps {
  allPosts: PostData[];
  initialPostCount?: number;
}

const InfiniteArticleList = ({ allPosts, initialPostCount = 5 }: InfiniteArticleListProps) => {
  const [displayedPosts, setDisplayedPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement>(null);
  const postsPerPage = initialPostCount;

  // Initialize with the first batch of posts
  useEffect(() => {
    setDisplayedPosts(allPosts.slice(0, initialPostCount));
    setHasMore(allPosts.length > initialPostCount);
  }, [allPosts, initialPostCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          const nextPage = page + 1;
          const newPosts = allPosts.slice(0, nextPage * postsPerPage);

          setDisplayedPosts(newPosts);
          setPage(nextPage);

          if (newPosts.length >= allPosts.length) {
            setHasMore(false);
          }
        }
      },
      { rootMargin: '100px' },
    );

    const currentLoaderRef = loader.current;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [page, hasMore, allPosts, postsPerPage]);

  return (
    <div className="space-y-6">
      {displayedPosts.map((post) => (
        <ArticleCard key={post.data.title} post={post} />
      ))}

      {hasMore && (
        <div ref={loader} className="h-10 w-full flex justify-center items-center">
          <div className="w-6 h-6 border-t-2 border-accent-subtle rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default InfiniteArticleList;
