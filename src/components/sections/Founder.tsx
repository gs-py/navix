import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CharsIn, FlipLines, PageLines, WordsIn } from '../motion';
import { NavixLogo } from '../common';
import { SectionLabel } from '../graphics/SectionLabel';
import { siteConfig } from '../../data';
import { EASE_OUT_EXPO } from '../../lib/intro';

const { founder } = siteConfig;
const [firstName, ...rest] = founder.name.split(' ');
const lastName = rest.join(' ');

/** Founder card: portrait rises out of a green frame that draws itself, name set over the body. */
const FounderCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['6%', '-4%']);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full max-w-[540px] mx-auto overflow-hidden"
      style={{ background: 'radial-gradient(90% 70% at 50% 35%, #161C28 0%, #0B0E14 70%, #08090C 100%)' }}
    >
      <div className="absolute top-[7%] right-[9%] z-30">
        <NavixLogo size="md" />
      </div>

      {/* Frame */}
      <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full z-10" aria-hidden="true" preserveAspectRatio="none">
        <motion.rect
          x="58" y="130" width="284" height="316" rx="12"
          fill="none" stroke="#13FF00" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 2, ease: EASE_OUT_EXPO }}
        />
      </svg>

      {/* Portrait (bottom edge sits on the frame's bottom line; head breaks out above it) */}
      <motion.div
        className="absolute left-[14.5%] right-[14.5%] bottom-[10.8%] top-[13%] z-20 flex items-end justify-center"
        style={{ y: portraitY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 }}
      >
        {!imageFailed ? (
          <img
            src={founder.image}
            alt={`${founder.name}, ${founder.role}`}
            className="h-full w-auto max-w-none object-contain object-bottom"
            onError={() => setImageFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-[78%] flex items-center justify-center" aria-label={founder.name} role="img">
            <span className="font-[family-name:var(--font-display)] font-black text-[9rem] md:text-[11rem] leading-none tracking-tighter text-[#13FF00]/25">
              {firstName[0]}
              {lastName[0]}
            </span>
          </div>
        )}
      </motion.div>

      {/* Name */}
      <p className="absolute left-[17%] bottom-[13%] z-30 font-[family-name:var(--font-display)] font-bold text-[#F7F7F7] leading-[0.95] tracking-tight text-[clamp(2.5rem,6vw,4.25rem)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        <CharsIn text={firstName} className="block" stagger={0.06} delay={0.6} />
        <CharsIn text={lastName} className="block" stagger={0.06} delay={0.85} />
      </p>
    </div>
  );
};

export const Founder = () => (
  <section id="founder" className="relative bg-black text-[#F7F7F7] py-24 lg:py-40 overflow-hidden">
    <PageLines />
    <div className="container-x relative grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
      <div className="lg:col-span-6">
        <FounderCard />
      </div>

      <div className="lg:col-span-6">
        <SectionLabel index="02" label="Founder" className="mb-8" />
        <h2 className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.92]">
          <FlipLines lines={['Meet the mind', <>behind the move<span className="text-[#13FF00]">.</span></>]} />
        </h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="relative mt-12 pl-8 border-l-2 border-[#13FF00] font-[family-name:var(--font-display)] text-2xl lg:text-[1.9rem] leading-snug font-medium"
        >
          “Great brands aren’t the loudest in the room — they’re the ones you can’t forget. I started Navix to make every brand we touch impossible to ignore.”
        </motion.blockquote>

        <WordsIn
          className="mt-8 text-[#888888] leading-relaxed max-w-xl"
          text="Abel leads strategy and creative at Navix, working side by side with founders and marketing teams to turn ambitious ideas into brands that grow. Every engagement gets his direct involvement — from the first workshop to the numbers on launch day."
        />

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <div>
            <p className="font-[family-name:var(--font-display)] font-bold text-xl">{founder.name}</p>
            <p className="text-sm text-[#888888]">{founder.role}</p>
          </div>
          <span className="hidden sm:block w-px h-10 bg-white/15" />
          <a
            href={founder.linkedin || '#contact'}
            {...(founder.linkedin ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 pl-5 pr-2 py-2 text-sm font-semibold hover:border-[#13FF00] hover:text-[#13FF00] transition-colors"
          >
            {founder.linkedin ? `Connect with ${firstName}` : `Talk to ${firstName}`}
            <span className="w-8 h-8 rounded-full bg-[#13FF00] text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
);
