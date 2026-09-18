import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import {
  Menu,
  X,
  Phone,
  ArrowUpRight,
  Lock,
  ShieldCheck,
  Film,
  Sparkles,
  Layers,
  ShoppingBag,
  Info,
  Mail,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenEditor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenEditor,
}) => {
  const { data, isAuthenticated } = useSiteData();
  const heroData = data.heroData;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { id: 'about-us', label: 'About Us', icon: Info, subtitle: 'Our Cinema Philosophy & Team' },
    { id: 'our-services', label: 'Our Services', icon: Layers, subtitle: 'End-to-End Production Capabilities' },
    { id: 'our-equipment', label: 'Services Shop', icon: ShoppingBag, subtitle: 'Studio Packages & Equipment' },
    { id: 'our-work', label: 'Our Work', icon: Film, subtitle: 'Commercial Ads & Cinema Portfolio' },
    { id: 'contact-us', label: 'Contact Us', icon: Mail, subtitle: 'Mokattam Cairo Studio & Inquiry' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#0c0d10]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-4 sm:py-5 bg-gradient-to-b from-black/85 via-black/45 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center group cursor-pointer focus:outline-none py-1"
            aria-label="Kamal Azam Media Production Home"
          >
            <img
              src={heroData.logoUrl || '/kamal-azam-logo.png'}
              alt={heroData.name}
              className="h-8 sm:h-10 md:h-11 w-auto object-contain brightness-110 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_18px_rgba(192,132,252,0.6)] transition-all duration-300"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium rounded-full transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBadge"
                      className="absolute inset-0 bg-[#9333ea] rounded-full -z-10 shadow-[0_0_18px_rgba(168,85,247,0.55)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Editor Button, Phone Button & Book Button (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Editor / Admin access button */}
            <button
              onClick={onOpenEditor}
              title={isAuthenticated ? 'Open Studio CMS Editor' : 'Editor / Admin Sign In'}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-full border transition-all cursor-pointer ${
                isAuthenticated
                  ? 'bg-[#9333ea]/30 text-[#e879f9] border-[#a855f7]/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 border-white/10'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c084fc]" />
                  <span>Editor</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-neutral-400" />
                  <span>Editor</span>
                </>
              )}
            </button>

            <a
              id="nav-phone-cta"
              href={`tel:${heroData.phone}`}
              className="flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all duration-300 group"
              title="Call Kamal Azam Media Production"
            >
              <span className="w-5 h-5 rounded-full bg-[#a855f7] flex items-center justify-center text-white text-[10px] group-hover:scale-110 transition-transform">
                <Phone className="w-3 h-3" />
              </span>
              <span className="font-mono text-[13px] tracking-wide">{heroData.phoneDisplay}</span>
            </a>

            <button
              id="nav-book-cta"
              onClick={onOpenBooking}
              className="flex items-center space-x-1.5 px-4 py-1.5 text-xs uppercase font-semibold tracking-wider bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white rounded-full hover:brightness-110 transition-all shadow-[0_0_22px_rgba(168,85,247,0.45)] cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button & Quick Phone Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href={`tel:${heroData.phone}`}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/15 backdrop-blur-md active:scale-95 transition-all"
              aria-label="Call Kamal Azam"
            >
              <Phone className="w-4 h-4 text-[#c084fc]" />
            </a>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileOpen(true)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Open full screen navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* FULL-SCREEN SLIDE-OUT MOBILE NAVIGATION MENU                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop Dimmer with subtle blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Slide-out Full-Screen Navigation Drawer */}
            <motion.div
              id="mobile-fullscreen-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="relative w-full sm:max-w-md h-full bg-[#08090c] border-l border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto overscroll-contain z-10"
            >
              {/* Top Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#0e0f13]/90 backdrop-blur-xl sticky top-0 z-20">
                <div className="flex items-center space-x-3">
                  <img
                    src={heroData.logoUrl || '/kamal-azam-logo.png'}
                    alt={heroData.name}
                    className="h-9 w-auto object-contain brightness-110 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  />
                  <div>
                    <div className="text-xs font-bold text-white tracking-wider uppercase">Kamal Azam</div>
                    <div className="text-[10px] font-mono text-[#c084fc] uppercase">Media Production</div>
                  </div>
                </div>

                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 active:scale-90 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links Area */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center space-y-2">
                <div className="text-[11px] font-mono tracking-[0.2em] text-neutral-500 uppercase px-2 mb-1">
                  Menu Navigation
                </div>

                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;
                  return (
                    <motion.button
                      key={link.id}
                      id={`mobile-nav-link-${link.id}`}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                        isActive
                          ? 'bg-gradient-to-r from-[#9333ea]/30 via-[#a855f7]/20 to-transparent border border-[#a855f7]/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#9333ea] text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                              : 'bg-white/5 text-neutral-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-base font-bold uppercase tracking-wider ${
                              isActive ? 'text-[#e879f9]' : 'text-white'
                            }`}
                          >
                            {link.label}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {link.subtitle}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          isActive ? 'text-[#c084fc] translate-x-0.5' : 'text-neutral-500'
                        }`}
                      />
                    </motion.button>
                  );
                })}

                {/* CMS Studio Editor Button in Mobile Menu */}
                <motion.button
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenEditor();
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 flex items-center justify-between text-neutral-300 hover:text-white active:scale-[0.98] transition-all cursor-pointer mt-1"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-800/40 text-[#c084fc] flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#c084fc] uppercase tracking-wider">
                        CMS Studio Editor
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {isAuthenticated ? 'Authenticated & Ready' : 'Admin Login Access'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-500" />
                </motion.button>
              </div>

              {/* Bottom Quick Action CTAs */}
              <div className="p-5 sm:p-6 border-t border-white/10 bg-[#0c0d11]/90 backdrop-blur-xl space-y-3 sticky bottom-0 z-20">
                <button
                  id="mobile-menu-book-btn"
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Production Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${heroData.phone}`}
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center justify-center space-x-2 active:scale-95 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c084fc]" />
                    <span>Call Us</span>
                  </a>

                  <a
                    href={heroData.whatsappUrl || 'https://wa.me/201011633339'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-medium text-xs flex items-center justify-center space-x-2 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
