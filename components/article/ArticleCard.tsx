import Link from 'next/link';
import dayjs from 'dayjs';

const ArticleCard = ({post}) => {

  const link = `/articles/${post.filePath.replace(/\.mdx?$/, '')}`;

  return (
    <div className='flex flex-col cursor-pointer pt-5'>
      <div className='text-gray-400 text-sm'>{dayjs(post.data.date).format('DD-MM-YYYY')}</div>
      <Link className='text-gray-400 ' as={link} href={'/articles/[slug]'}>{post.data.title}</Link>
      <h4 className='text-gray-500 '>{post.data.description}</h4>
    </div>
  )
};

export default ArticleCard;
