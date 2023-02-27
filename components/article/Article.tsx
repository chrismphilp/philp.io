const Article = ({ content }) => {
  return (
    <div className='pt-10'>
      <article className='max-w-2xl mx-auto prose prose-slate prose-sm prose-h1:text-zinc-100 prose-h2:text-zinc-400 prose-p:text-zinc-200'>
        <section className='text-justify'>{content}</section>
      </article>
    </div>
  );
};

export default Article;
