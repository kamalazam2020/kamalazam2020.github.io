import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, KeyRound, X, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onLoginSuccess?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onLoginSuccess,
}) => {
  const { login } = useSiteData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(username, password);
      setIsSubmitting(false);
      if (res.success) {
        setUsername('');
        setPassword('');
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess();
        } else if (typeof onSuccess === 'function') {
          onSuccess();
        }
        onClose();
      } else {
        setError(res.error || 'Invalid username or password. Please try again.');
      }
    } catch {
      setIsSubmitting(false);
      setError('An error occurred during sign-in. Please try again.');
    }
  };

  const handleQuickFill = () => {
    setUsername('kamalazam');
    setPassword('Apple4321');
    setError(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md bg-[#141518] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#a855f7]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9333ea]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#9333ea] to-[#c084fc] flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)]">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#c084fc] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studio CMS Portal</span>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">
              Admin & Editor Login
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Sign in with your administrator credentials to manage published content.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="kamalazam"
                  required
                  className="w-full bg-[#0a0b0d] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#0a0b0d] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] hover:brightness-110 text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating with Firebase...' : 'Sign In to Editor'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Helper / Demo Credential shortcut */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>Kamal Azam Creator Admin</span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[#c084fc] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Fill Credentials
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
