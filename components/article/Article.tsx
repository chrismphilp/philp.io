import { FaArrowLeft } from 'react-icons/fa';
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
      <article className="prose dark:prose-invert prose-lg prose-a:no-underline text-sm sm:text-base">
        <div className="pb-5">
          <FaArrowLeft
            onClick={() => router.back()}
            className="cursor-pointer text-gray-400 hover:text-gray-500"
            size={25}
          />
        </div>
        <time className="order-first flex items-center text-zinc-400 dark:text-zinc-500">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
          <span className="ml-3">{dayjs(frontMatter.date).format('MMMM DD, YYYY')}</span>
        </time>
        <section className="text-justify">{children}</section>
      </article>
    </div>
  );
};

export default Article;
