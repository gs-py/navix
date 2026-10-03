import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { getLenis, useReducedMotion } from '../../hooks';
import { INTRO_DELAY, EASE_OUT_EXPO } from '../../lib/intro';
import { NavixLogo } from './NavixLogo';

/** Intro curtain: a 0→100 counter, then a black + green double panel that lifts off the hero. */
export const Preloader = () => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReducedMotion);
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    if (!visible) return;
    window.scrollTo(0, 0);
    const stopScroll = setTimeout(() => getLenis()?.stop(), 0);
    const controls = animate(progress, 100, { duration: INTRO_DELAY - 0.65, ease: [0.65, 0, 0.35, 1] });
    const hide = setTimeout(() => setVisible(false), (INTRO_DELAY - 0.6) * 1000);
    return () => {
      controls.stop();
      clearTimeout(stopScroll);
      clearTimeout(hide);
      getLenis()?.start();
    };
  }, [visible, progress]);

  return (
    <AnimatePresence onExitComplete={() => getLenis()?.start()}>
      {visible && (
        <motion.div key="preloader" className="fixed inset-0 z-[200] pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute inset-0 bg-[#13FF00]"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.12 }}
          />
          <motion.div
            className="absolute inset-0 bg-black flex flex-col justify-between p-5 md:p-10 lg:p-16"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <div className="flex items-center justify-between text-caption text-[#888888]">
              <NavixLogo size="md" />
              <span className="hidden sm:inline">Creative &amp; Digital Agency</span>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                className="font-[family-name:var(--font-display)] font-black text-[#F7F7F7] leading-[0.8] tracking-[-0.04em] text-[28vw] md:text-[18vw] tabular-nums"
              >
                <motion.span>{rounded}</motion.span>
                <span className="text-[#13FF00]">.</span>
              </motion.div>
            </div>

            <div>
              <div className="flex items-center justify-between text-caption text-[#888888] mb-4">
                <span>Building brands that move</span>
                <span>Loading</span>
              </div>
              <div className="h-px bg-[#2A2A2A] overflow-hidden">
                <motion.div className="h-full bg-[#13FF00] origin-left" style={{ scaleX: barScale }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
