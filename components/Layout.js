import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
