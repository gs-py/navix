import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FlipLines, WordsIn, PageLines, BounceIn, CircleButton, ScrollRevealText } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { Sparkle } from '../graphics/Sparkle';
import { EASE_OUT_EXPO } from '../../lib/intro';

const TAGS = ['Strategy', 'Branding', 'Content', 'Digital Marketing', 'Performance', 'Web Experiences'];

/** Black poster card: a mini ribbon draws itself while the whole card slowly zooms with scroll. */
const ApproachCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div ref={ref} className="relative aspect-[4/5] bg-black text-white overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div className="absolute inset-0 bg-grid-fine" />
        <motion.svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" style={{ rotate }} aria-hidden="true">
          <motion.path
            d="M440 150 H270 C240 150 222 158 204 180 L20 520"
            fill="none"
            stroke="#13FF00"
            strokeWidth="58"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
          />
          <motion.path
            d="M120 170 L420 520"
            fill="none"
            stroke="#13FF00"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.6 }}
          />
          <motion.circle
            cx="300"
            cy="330"
            r="90"
            fill="none"
            stroke="white"
            strokeOpacity="0.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: EASE_OUT_EXPO, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>

      <div className="relative z-10 h-full p-7 lg:p-10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em]">
          <span className="text-[#13FF00]">Navix / DNA</span>
          <span className="text-[#888888]">Craft × Motion</span>
        </div>
        <div>
          <Sparkle size={28} className="text-[#F7F7F7] mb-6 animate-spin-slow" />
          <h3 className="font-[family-name:var(--font-display)] font-extrabold uppercase text-3xl lg:text-[2.6rem] leading-[0.95] tracking-tight max-w-[12ch]">
            An approach that brings difference
          </h3>
        </div>
      </div>
    </div>
  );
};

export function About() {
  return (
    <section id="about" className="relative bg-[#F7F7F7] text-black py-24 lg:py-40 overflow-hidden">
      <PageLines tone="light" />
      <div className="container-x relative">
        <SectionLabel index="01" label="Agency" tone="light" className="mb-14 lg:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ApproachCard />
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <p className="font-[family-name:var(--font-display)] text-xl text-[#666666] mb-4 uppercase tracking-wide">If you're</p>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-[-0.03em] text-[clamp(2.4rem,5.4vw,5.25rem)] leading-[0.92]">
              <FlipLines lines={['Seeking a creative', 'agency to elevate', <>your brand<span className="text-[#13FF00] [-webkit-text-stroke:2px_black]">.</span></>]} />
            </h2>

            <div className="mt-12 lg:mt-16 grid md:grid-cols-[1fr_auto] gap-10 items-end">
              <div className="border-l border-black/15 pl-6">
                <WordsIn
                  className="text-body-lg text-[#444444] leading-relaxed"
                  text="Navix is a Kerala-born creative and digital marketing agency that specialises in creative advertising and full-funnel growth. As you bring unique products to market, we build distinctive campaigns that resonate with your audience — and move the numbers that matter."
                />
                <div className="flex flex-wrap gap-2.5 mt-8">
                  {TAGS.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.06 }}
                      className="px-4 py-2 rounded-full border border-black/15 text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-[#F7F7F7] transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <BounceIn delay={0.2}>
                <CircleButton label="Explore us" href="#services" tone="light" size={160} />
              </BounceIn>
            </div>
          </div>
        </div>

        <ScrollRevealText
          text="We're not here to make brands look busy. We're here to make them impossible to ignore."
          highlight={['impossible', 'ignore']}
          highlightClassName="text-black underline decoration-[#13FF00] decoration-[0.12em] underline-offset-[0.1em] [text-decoration-skip-ink:none]"
          className="mt-28 lg:mt-44 font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] text-[clamp(2rem,5vw,4.75rem)] leading-[1.02] max-w-[18ch] md:max-w-none"
        />
      </div>
    </section>
  );
}
