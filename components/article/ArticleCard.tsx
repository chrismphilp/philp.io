import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const ArticleCard = ({post}) => {
  const router = useRouter();
  const link = `/articles/${post.filePath.replace(/\.mdx?$/, '')}`;

  return (
    <div className='group flex flex-col cursor-pointer pt-5 first:pt-0' onClick={() => router.push(link)}>
      <div className='text-gray-400 text-md'>{dayjs(post.data.date).format('DD-MM-YYYY')} - {post.data.readingTime}</div>
      <Link className='text-orange-300 group-hover:text-orange-400 text-xl' as={link} href={'/articles/[slug]'}>{post.data.title}</Link>
      <h4 className='text-gray-500 text-base'>{post.data.description}</h4>
    </div>
  )
};

export default ArticleCard;
