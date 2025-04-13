import { useRouter } from 'next/router';
import Head from 'next/head';
import dayjs from 'dayjs';

const Article = ({ frontMatter, children }) => {
  const router = useRouter();

  return (
    <div className="pt-5 md:pt-10">
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="title" content={frontMatter.title} />
        <meta name="description" content={frontMatter.description} />
        <meta name="date" content={frontMatter.date} />
      </Head>
      <article className="prose prose-slate dark:prose-invert dark:text-background-dark md:prose-lg lg:prose-xl prose-a:no-underline text-sm sm:text-base mx-auto">
        <div className="pb-5">
          <button
            onClick={() => router.back()}
            className="text-secondary hover:text-primary transition-colors duration-300 flex items-center group"
          >
            <span className="border-b border-accent-subtle transition-all duration-300 group-hover:border-primary mr-2 w-6"></span>
            <span className="text-sm">Back</span>
          </button>
        </div>
        <time className="order-first flex items-center text-secondary">
          <span className="text-sm font-light tracking-wider">
            {dayjs(frontMatter.date).format('YYYY.MM.DD')}
          </span>
        </time>
        <section className="text-justify dark:text-background-dark">{children}</section>
      </article>
    </div>
  );
};

export default Article;
