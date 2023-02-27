import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const Index = () => {
  return (
    <div className='flex flex-col bg-gray-800'>
      <div className='flex-1'>
        <Header />
      </div>
      <div className='flex-1'></div>
      <div className='flex-1'>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
