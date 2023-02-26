import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import CloudFormation from '../src/assets/posts/cloud-formation/CloudFormation';

const Index = () => {
  return (
    <div className='h-full flex flex-col bg-gray-800'>
      <div className='flex-1'>
        <Header />
      </div>
      <div className='flex-1'>
        <CloudFormation />
      </div>
      <div className='flex-1'>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
