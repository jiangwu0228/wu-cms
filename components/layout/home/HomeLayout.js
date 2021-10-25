import Footer from './Footer';
import Navbar from './navbar';

export default function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
