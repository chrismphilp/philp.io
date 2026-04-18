'use client';
import Link from 'next/link';
import { formatDate } from '../../utils/dateUtils';

const ArticleCard = ({ post }) => {
  const link = `/articles/${post.filePath.replace(/\.mdx?$/, '')}`;

  return (
    <article className="border-b border-accent-subtle last:border-b-0">
      <Link className="group block py-6 relative" href={link} prefetch={false}>
        <div className="absolute left-0 top-0 bottom-0 hidden md:flex flex-col items-center">
          <div className="vertical-text text-xs text-accent-dark tracking-wider opacity-70 transform rotate-180">
            {formatDate(post.data.date)}
          </div>
          <div className="flex-grow border-l border-accent-subtle mt-4"></div>
        </div>

        <div className="md:ml-10">
          <div className="text-accent-dark text-xs md:hidden mb-2 tracking-wider">
            {formatDate(post.data.date)} — {post.data.readingTime}
          </div>

          <span className="block text-primary text-xl md:text-2xl mb-2 group-hover:text-accent-highlight transition-colors duration-300 font-light tracking-wide">
            {post.data.title}
          </span>

          <p className="text-secondary text-base leading-relaxed pr-0 md:pr-12 font-light">
            {post.data.description}
          </p>

          <div className="hidden md:block text-accent-dark text-xs mt-3 tracking-wider">
            {post.data.readingTime}
          </div>
        </div>

        <div className="absolute top-1/2 right-0 w-8 h-8 border-t border-r border-accent-highlight opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform translate-x-4 -translate-y-1/2"></div>
      </Link>
    </article>
  );
};

export default ArticleCard;
