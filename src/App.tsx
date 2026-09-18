import React, { useState, useEffect } from 'react';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { ProcessSection } from './components/ProcessSection';
import { RockBanner } from './components/RockBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { WorkPortfolio } from './components/WorkPortfolio';
import { EquipmentSection } from './components/EquipmentSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { SoundBarFloat } from './components/SoundBarFloat';
import { AdminLoginModal } from './components/AdminEditor/AdminLoginModal';
import { AdminEditorPage } from './components/AdminEditor/AdminEditorPage';
import { PortfolioProject, ServiceItem } from './types';

function MainStudioApp() {
  const { data, isAuthenticated } = useSiteData();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>('TV Commercial Production');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'our-services',
        'services-grid',
        'our-work',
        'our-equipment',
        'about-us',
        'contact-us',
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl + Shift + E) to open Editor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        handleOpenEditor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenShowreel = () => {
    // Open the primary showreel project
    const showreel = data.portfolioProjects[0] || {
      id: 'showreel-main',
      title: data.heroData.brandTagline,
      category: 'Showreel',
      duration: '01:45',
      videoUrl: data.heroData.backgroundVideoUrl,
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      description: 'Official Showreel showcasing cinema & commercial film direction.',
      client: 'Kamal Azam Media Production'
    };
    setActiveProject(showreel);
    setVideoModalOpen(true);
  };

  const handlePlayVideo = (project: PortfolioProject) => {
    setActiveProject(project);
    setVideoModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setPreselectedService(service.title);
    setBookingModalOpen(true);
  };

  const handleOpenEditor = () => {
    if (isAuthenticated) {
      setIsEditorOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setIsEditorOpen(true);
  };

  // If Editor page is full-screen open
  if (isEditorOpen && isAuthenticated) {
    return <AdminEditorPage onClose={() => setIsEditorOpen(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#08090b] text-white selection:bg-[#a855f7] selection:text-white">
      {/* Clean Modern Welcome Intro Animation */}
      <Preloader />

      {/* Glassmorphic Navbar with Editor portal trigger */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setPreselectedService('Commercial Ads');
          setBookingModalOpen(true);
        }}
        onOpenEditor={handleOpenEditor}
      />

      {/* Main Website Flow */}
      <main>
        {/* Fullscreen Video Hero with Controls */}
        <Hero
          onWatchShowreel={handleOpenShowreel}
          onExploreWork={() => handleNavigate('our-work')}
          onOpenBooking={() => setBookingModalOpen(true)}
          isDucked={videoModalOpen}
        />

        {/* 3-Step Process: Pre-Production, Production, Post-Production */}
        <ProcessSection onViewAllServices={() => handleNavigate('services-grid')} />

        {/* Giant Interactive Kinetic Header: R o c k  m e d i a */}
        <RockBanner />

        {/* 6 Capabilities Cards */}
        <ServicesGrid
          onSelectService={handleSelectService}
          onViewAllWork={() => handleNavigate('our-work')}
        />

        {/* Filterable Work & Video Portfolio */}
        <WorkPortfolio
          onPlayVideo={handlePlayVideo}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Media Production Services & Packages Catalog */}
        <EquipmentSection
          onOpenBooking={(serviceName) => {
            setPreselectedService(serviceName || 'TV Commercial Production');
            setBookingModalOpen(true);
          }}
        />

        {/* About, Team & FAQ */}
        <AboutSection />
      </main>

      {/* Footer with Cairo Mokattam Map and Editor Portal trigger */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenEditor={handleOpenEditor}
      />

      {/* Floating Sound Controller & WhatsApp Action Widget */}
      <SoundBarFloat />
      <WhatsAppFloat />

      {/* Cinematic Video Player Popup */}
      <VideoModal
        isOpen={videoModalOpen}
        project={activeProject}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Project Brief & Consultation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        preselectedService={preselectedService}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Admin / Editor Sign In Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <AudioProvider>
        <MainStudioApp />
      </AudioProvider>
    </SiteDataProvider>
  );
}

