import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteConfig } from '../../data';
import { getLenis } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

const REEL_WORDS = ['Strategy', 'Branding', 'Content', 'Campaigns', 'Performance', 'Growth'];

/** Kinetic type loop shown until a real showreel URL is configured. */
const BrandReel = () => (
  <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-grid-fine opacity-60" />
    <motion.div
      className="absolute w-[60%] aspect-square rounded-full bg-[#13FF00]/20 blur-[100px]"
      animate={{ scale: [1, 1.25, 1], x: ['-10%', '10%', '-10%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="relative h-[1.1em] overflow-hidden text-[12vw] md:text-[7vw] font-[family-name:var(--font-display)] font-black uppercase leading-none tracking-tight text-[#F7F7F7]">
      <motion.div
        animate={{ y: REEL_WORDS.map((_, i) => `-${i * 1.1}em`) }}
        transition={{ duration: REEL_WORDS.length * 1.4, repeat: Infinity, ease: [0.76, 0, 0.24, 1], times: REEL_WORDS.map((_, i) => i / (REEL_WORDS.length - 1)) }}
      >
        {REEL_WORDS.map((word) => (
          <div key={word} className="h-[1.1em] flex items-center justify-center">
            {word}
            <span className="text-[#13FF00]">.</span>
          </div>
        ))}
      </motion.div>
    </div>
    <p className="absolute bottom-6 inset-x-0 text-center text-caption text-[#888888]">Showreel 2026 — full cut coming soon</p>
  </div>
);

interface ShowreelModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShowreelModal = ({ open, onClose }: ShowreelModalProps) => {
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const src: string = siteConfig.showreel;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Navix showreel"
        >
          <motion.div
            className="relative w-full max-w-6xl aspect-video border border-white/10 overflow-hidden"
            initial={{ scale: 0.85, opacity: 0, clipPath: 'inset(50% 0 50% 0)' }}
            animate={{ scale: 1, opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            onClick={(e) => e.stopPropagation()}
          >
            {src ? (
              src.includes('youtube') || src.includes('vimeo') ? (
                <iframe src={src} title="Navix showreel" className="w-full h-full" allow="autoplay; fullscreen" />
              ) : (
                <video src={src} className="w-full h-full object-cover" autoPlay controls playsInline />
              )
            ) : (
              <BrandReel />
            )}
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 md:top-8 md:right-8 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#13FF00] hover:text-black hover:border-[#13FF00] transition-colors"
            aria-label="Close showreel"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
