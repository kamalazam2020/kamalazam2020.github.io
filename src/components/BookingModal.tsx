import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { X, Send, CheckCircle, Phone, Calendar, Mail, User, Building, Film } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const { data } = useSiteData();
  const heroData = data.heroData;

  const [service, setService] = useState(preselectedService || 'Commercial Ads');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '$5,000 - $15,000',
    date: '',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#181818] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl my-8 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="mb-8">
                <div className="text-xs uppercase font-mono tracking-widest text-[#a855f7] mb-1">
                  Start a Production
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight">
                  Book Your Project Brief
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                  Tell us about your brand vision, campaign goals, or production deliverables.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Service Required
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'TV Commercial Production',
                      'Social Video Sprint (30 Reels)',
                      'Brand Documentary Film',
                      'Editorial & Luxury Stills',
                      'E-Commerce Product Suite',
                      'Turnkey 4K Vodcast Production',
                      'DaVinci HDR Color Grade',
                      '3D Motion Graphics & VFX',
                      'On-Location Cinematic Film Set',
                    ].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setService(s)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                          service === s
                            ? 'bg-[#9333ea] text-white border-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Brand or Agency Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                      <input
                        type="tel"
                        required
                        placeholder="+20 100 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Brief Details */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Project Brief & Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief synopsis, target deliverable length, preferred shoot location, or filming dates..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                {/* Direct quick call info */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-neutral-400">
                  <span>Immediate inquiry needed?</span>
                  <a
                    href={`tel:${heroData.phone}`}
                    className="text-[#c084fc] font-mono hover:underline"
                  >
                    Call {heroData.phoneDisplay}
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-semibold uppercase tracking-wider text-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Production Brief</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold uppercase font-display mb-2">
                Brief Received!
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our production team will review your brief for <span className="text-[#c084fc]">{service}</span> and connect with you within 24 business hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/+201011633339?text=Hello%2C%20I%20just%20submitted%20a%20brief%20for%20${encodeURIComponent(service)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  Chat on WhatsApp Now
                </a>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Back to Site
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
