import { FaArrowLeft } from 'react-icons/all';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Article = ({ frontMatter, children }) => {
  const router = useRouter();

  return (
    <div className='pt-10'>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article className='prose dark:prose-invert prose-sm '>
        <div className='pb-5'>
          <FaArrowLeft onClick={() => router.back()} className='cursor-pointer text-gray-400 hover:text-gray-500' size={25} />
        </div>
        <section className='text-justify'>{children}</section>
      </article>
    </div>
  );
};

export default Article;
