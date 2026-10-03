import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BounceIn, CircleButton, FlipLines } from '../motion';
import { SparkleCluster } from '../graphics/Sparkle';

/** Closing call to action: an "X" is drawn by the scroll itself while the headline flips in. */
export const LargeCTA = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const drawA = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const drawB = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section ref={ref} className="relative bg-black text-[#F7F7F7] py-32 lg:py-48 overflow-hidden border-t border-white/10">
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <motion.path d="M-40 640 L1040 -40" stroke="#13FF00" strokeWidth="96" fill="none" style={{ pathLength: drawA }} />
        <motion.path d="M-40 -40 L1040 640" stroke="#13FF00" strokeOpacity="0.9" strokeWidth="2" fill="none" style={{ pathLength: drawB }} />
        <motion.path d="M-40 -10 L1040 670" stroke="#13FF00" strokeOpacity="0.9" strokeWidth="2" fill="none" style={{ pathLength: drawB }} />
      </svg>
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="container-x relative text-center flex flex-col items-center">
        <SparkleCluster className="w-14 h-14 text-[#F7F7F7] mb-8 animate-spin-slow" />
        <p className="text-caption text-[#AAAAAA] mb-6">Have a project in mind?</p>
        <h2 className="font-[family-name:var(--font-display)] font-black uppercase tracking-[-0.04em] leading-[0.88] text-[clamp(2.75rem,9vw,9rem)]">
          <FlipLines
            lines={[
              "Let's make",
              <span key="middle" className="text-[#F7F7F7]/25">something great</span>,
              <>together<span className="text-[#13FF00]">.</span></>,
            ]}
          />
        </h2>
        <BounceIn delay={0.3} className="mt-12">
          <CircleButton label="Start a project" href="#contact" size={180} />
        </BounceIn>
      </div>
    </section>
  );
};
