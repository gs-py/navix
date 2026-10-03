import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedCounter, BounceIn, CharsIn, PageLines, WordsIn } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { EASE_OUT_EXPO } from '../../lib/intro';

const BELIEFS = [
  { value: 95, title: 'Creativity', text: 'Ideas with a point of view, built to reach the right audience — never decoration for its own sake.' },
  { value: 90, title: 'Consistency', text: 'Promises kept and deliverables on time, every month. Momentum is a strategy.' },
  { value: 100, title: 'Coffee', text: 'Yes, coffee. We brainstorm, plan and create — all of it fuelled by far too much filter coffee.' },
];

const STATS = [
  { target: 50, suffix: '+', label: 'Brands transformed' },
  { target: 120, suffix: '+', label: 'Campaigns launched' },
  { target: 10, suffix: 'M+', label: 'People reached' },
  { target: 90, suffix: '%', label: 'Client retention' },
];

const BeliefBar = ({ value, title, text, delay }: { value: number; title: string; text: string; delay: number }) => (
  <div className="py-7 border-t border-white/10">
    <div className="flex items-baseline justify-between mb-4">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#F7F7F7]">{title}</h3>
      <span className="font-mono text-sm text-[#13FF00]">
        <AnimatedCounter target={value} suffix="%" duration={1.8} />
      </span>
    </div>
    <div className="relative h-[3px] bg-white/10 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-[#13FF00]"
        initial={{ width: '0%' }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay }}
      />
    </div>
    <p className="mt-4 text-[#888888] leading-relaxed max-w-md">{text}</p>
  </div>
);

export const WhyNavix = () => {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section id="why" className="relative bg-black text-[#F7F7F7] overflow-hidden">
      {/* Green statement band */}
      <div ref={bandRef} className="relative bg-[#13FF00] text-black py-10 lg:py-14 overflow-hidden">
        <motion.h2
          style={{ x }}
          className="font-[family-name:var(--font-display)] font-black uppercase text-center leading-[0.85] tracking-[-0.045em] text-[17vw] lg:text-[13.5vw] whitespace-nowrap"
        >
          <CharsIn text="Why" className="block" stagger={0.08} />
          <CharsIn text="choose us" className="block" stagger={0.05} delay={0.2} />
        </motion.h2>
      </div>

      <div className="relative py-24 lg:py-36">
        <PageLines />
        <div className="container-x relative grid lg:grid-cols-12 gap-14 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="08" label="Why Navix" className="mb-8" />
            <p className="font-[family-name:var(--font-display)] text-xl uppercase text-[#888888]">Why</p>
            <h3 className="font-[family-name:var(--font-display)] font-extrabold uppercase text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-tight mt-2">
              We believe<span className="text-[#13FF00]">.</span>
            </h3>
            <WordsIn
              className="mt-8 text-body-lg text-[#888888] leading-relaxed"
              text="We're driven by creativity, innovation and a genuine obsession with your growth. Strategy before noise, craft with purpose, and outcomes you can measure — that's the deal."
            />
          </div>
          <div className="lg:col-span-7">
            {BELIEFS.map((belief, i) => (
              <BeliefBar key={belief.title} {...belief} delay={0.2 + i * 0.15} />
            ))}
          </div>
        </div>

        <div className="container-x relative mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {STATS.map((stat, i) => (
            <BounceIn key={stat.label} delay={i * 0.18} className="border-r border-b border-white/10 p-6 md:p-10">
              <p className="font-[family-name:var(--font-display)] font-black text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.15em] text-[#888888]">{stat.label}</p>
            </BounceIn>
          ))}
        </div>
      </div>
    </section>
  );
};
