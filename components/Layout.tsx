import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className='bg-gray-800'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
};

export default Layout;
