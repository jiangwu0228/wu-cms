import Footer from './Footer';
import Navbar from './Navbar';

export default function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
