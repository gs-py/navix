import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FlipLines, PageLines, WordsIn } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { siteConfig } from '../../data';
import { EASE_OUT_EXPO } from '../../lib/intro';

const { founder } = siteConfig;
const [firstName] = founder.name.split(' ');

/** Founder card artwork (frame, name and logo are part of the image): wipes up into view, eases in scale on scroll. */
const FounderCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  // The in-view trigger sits on an unclipped wrapper: a fully clipped element reads as zero-area to the observer.
  return (
    <motion.div ref={ref} className="w-full max-w-[540px] mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#0B0E14]"
        variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, visible: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
      >
        <motion.img
          src={founder.image}
          alt={`${founder.name}, ${founder.role}`}
          width={1080}
          height={1350}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ scale }}
        />
      </motion.div>
    </motion.div>
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
