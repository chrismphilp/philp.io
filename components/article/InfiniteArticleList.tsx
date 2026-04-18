'use client';
import { useEffect, useRef, useState } from 'react';
import ArticleCard from './ArticleCard';
import { PostMeta } from '../../utils/mdxUtils';

interface InfiniteArticleListProps {
  allPosts: PostMeta[];
  initialPostCount?: number;
}

const InfiniteArticleList = ({ allPosts, initialPostCount = 5 }: InfiniteArticleListProps) => {
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);
  const postsPerPage = initialPostCount;
  const displayedPosts = allPosts.slice(0, page * postsPerPage);
  const hasMore = displayedPosts.length < allPosts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target?.isIntersecting && hasMore) {
          setPage((currentPage) => currentPage + 1);
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
  }, [hasMore]);

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
