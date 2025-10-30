import { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

export default function Layout({ children }) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <AnnouncementBar 
        isVisible={showAnnouncement} 
        onClose={handleCloseAnnouncement} 
      />
      <main className={showAnnouncement ? "pt-28" : "pt-24"}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
