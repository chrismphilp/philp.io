'use client';

import Link from 'next/link';
import { formatDate } from '../../utils/dateUtils';

const ArticleCard = ({ post }) => {
  const link = `/articles/${post.filePath.replace(/\.mdx?$/, '')}`;

  return (
    <article className="group border-b border-accent-subtle/80 last:border-b-0 rounded-[1.75rem] transition-all duration-300 hover:bg-[rgba(240,239,231,0.72)] dark:hover:bg-[rgba(53,49,43,0.92)]">
      <Link className="block py-4 relative px-4 md:px-6" href={link} prefetch={false}>
        <div className="absolute left-0 top-0 bottom-0 hidden md:flex flex-col items-center">
          <div className="vertical-text font-sans text-[11px] uppercase text-accent-dark tracking-[0.24em] opacity-70 transform rotate-180">
            {formatDate(post.data.date)}
          </div>
          <div className="flex-grow border-l border-accent-subtle mt-4"></div>
        </div>

        <div className="md:ml-12">
          <div className="font-sans text-accent-dark text-[11px] uppercase md:hidden mb-3 tracking-[0.24em]">
            {formatDate(post.data.date)} — {post.data.readingTime}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 font-sans text-[11px] uppercase tracking-[0.24em] text-secondary">
            <span>{post.data.category}</span>
            <span className="hidden md:inline text-accent">/</span>
            <span className="hidden md:inline">{post.data.readingTime}</span>
          </div>

          <span className="block text-primary text-2xl md:text-[2rem] leading-tight mb-3 group-hover:text-accent-highlight transition-colors duration-300 font-light tracking-[-0.02em]">
            {post.data.title}
          </span>

          <p className="text-secondary text-base leading-8 pr-0 md:pr-12 font-light">
            {post.data.description}
          </p>

          <div className="hidden md:flex items-center gap-4 font-sans text-accent-dark text-[11px] uppercase mt-5 tracking-[0.24em]">
            <span>{post.data.wordCount.toLocaleString()} words</span>
            <span className="text-accent">/</span>
            <span>Open article</span>
          </div>
        </div>

        <div className="absolute top-1/2 right-4 w-10 h-10 border border-accent-highlight rounded-full opacity-0 group-hover:opacity-25 transition-all duration-500 transform group-hover:translate-x-1 -translate-y-1/2 flex items-center justify-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-accent-highlight">
            Go
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
