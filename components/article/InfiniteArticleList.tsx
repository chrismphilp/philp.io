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
  const totalPages = Math.max(1, Math.ceil(allPosts.length / postsPerPage));
  const currentPage = Math.min(page, totalPages);
  const displayedPosts = allPosts.slice(0, currentPage * postsPerPage);
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const currentLoaderRef = loader.current;

    if (!currentLoaderRef) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          observer.unobserve(entry.target);
          setPage((current) => Math.min(current + 1, totalPages));
        }
      },
      { rootMargin: '100px' },
    );
    observer.observe(currentLoaderRef);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, totalPages]);

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
