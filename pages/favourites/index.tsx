import Head from 'next/head';

const Favourites = () => {
  return (
    <>
      <Head>
        <title>Favourites</title>
      </Head>
      <div className='max-w-2xl mx-auto prose dark:prose-invert pt-10 prose-a:no-underline'>
        <h1 className='text-3xl font-bold'>Software and gadgets I love.</h1>

        <h3><a href='https://insomnia.rest'>Insomnia</a></h3>
        <h5>I've found Insomnia a pretty good replacement for Postman, with better history
          tracking for requests made and with a minimalistic design principle.</h5>

        <h3><a href='https://www.zsh.org'>zsh</a></h3>
        <h5>zsh </h5>

        <h3><a href='https://www.home-assistant.io'>HomeAssistant</a></h3>
        <h5>I currently have HomeAssistant installed on a Raspberry Pi 4. Integrating my Ring
          hardware with my Google Nest Minis has never been simpler.</h5>
      </div>
    </>
  );
};

export default Favourites;
