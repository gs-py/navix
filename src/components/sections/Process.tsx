import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { RadarGraphic, BurstGraphic, AssembleGraphic, LaunchGraphic } from '../graphics/ProcessGraphics';
import { FlipLines, PageLines } from '../motion';
import { processSteps, type ProcessStep } from '../../data';
import { EASE_OUT_EXPO } from '../../lib/intro';

const STEPS = processSteps.length;
const PROCESS_GRAPHICS = [RadarGraphic, BurstGraphic, AssembleGraphic, LaunchGraphic];

/** Giant outlined letter that fills solid from the bottom as its slice of the scroll passes. */
const FillLetter = ({ letter, index, progress }: { letter: string; index: number; progress: MotionValue<number> }) => {
  const fill = useTransform(progress, [index / STEPS, (index + 0.85) / STEPS], [100, 0]);
  const clip = useMotionTemplate`inset(${fill}% 0% 0% 0%)`;
  const dotScale = useTransform(progress, [(index + 0.8) / STEPS, (index + 0.9) / STEPS], [0, 1]);

  return (
    <span className="relative inline-flex items-end">
      <span className="relative block">
        <span className="block text-black/[0.07]">{letter}</span>
        <motion.span aria-hidden="true" className="absolute inset-0 block text-black" style={{ clipPath: clip }}>
          {letter}
        </motion.span>
      </span>
      <motion.span
        aria-hidden="true"
        className="ml-[0.06em] mb-[0.12em] w-[0.14em] h-[0.14em] rounded-full bg-[#13FF00] border-[0.02em] border-black"
        style={{ scale: dotScale }}
      />
    </span>
  );
};

const StepDetail = ({ step, index }: { step: ProcessStep; index: number }) => {
  const Graphic = PROCESS_GRAPHICS[index];
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center">
      <div className="col-span-4 lg:col-span-3">
        <div className="aspect-square max-w-[220px] border border-black/10 bg-white/60 p-4">
          <Graphic />
        </div>
      </div>
      <div className="col-span-8 lg:col-span-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#666666]">
          {String(index + 1).padStart(2, '0')} · {step.tagline}
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-4xl lg:text-6xl leading-none">
          {step.title}
          <span className="text-[#13FF00] [-webkit-text-stroke:1.5px_black]">.</span>
        </h3>
        <p className="mt-5 text-[#444444] leading-relaxed max-w-lg">{step.description}</p>
      </div>
      <ul className="col-span-12 lg:col-span-4 lg:pl-10 lg:border-l border-black/10 space-y-3">
        {step.deliverables.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.08 }}
            className="flex items-center gap-3 text-sm lg:text-base font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

/** Desktop: the section pins while scroll drives the letters and swaps the step detail. */
const PinnedProcess = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(STEPS - 1, Math.max(0, Math.floor(v * STEPS)))));

  return (
    <div ref={ref} className="hidden lg:block relative" style={{ height: `${STEPS * 90 + 40}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center py-24">
        <div className="container-x w-full">
          <div className="flex items-end justify-between mb-8">
            <div>
              <SectionLabel index="04" label="Our process" tone="light" className="mb-6" />
              <h2 className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-4xl xl:text-5xl leading-[0.95]">
                <FlipLines lines={['Growth, unlocked', 'by our M.O.V.E']} />
              </h2>
            </div>
            <div className="text-right font-mono text-xs uppercase tracking-[0.2em] text-[#666666]">
              <span className="text-black text-base">{String(active + 1).padStart(2, '0')}</span> / {String(STEPS).padStart(2, '0')}
              <p className="mt-2">Scroll to move</p>
            </div>
          </div>

          <div className="font-[family-name:var(--font-display)] font-black uppercase leading-[0.8] tracking-[-0.04em] text-[min(19vw,32vh)] flex justify-between">
            {processSteps.map((step, i) => (
              <FillLetter key={step.id} letter={step.letter} index={i} progress={scrollYProgress} />
            ))}
          </div>

          <div className="relative h-px bg-black/10 mt-10 mb-10">
            <motion.div className="absolute inset-0 bg-black origin-left" style={{ scaleX: rail }} />
          </div>

          <div className="min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <StepDetail step={processSteps[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Mobile / tablet: stacked steps, each with its graphic. */
const StackedProcess = () => (
  <div className="lg:hidden container-x py-24">
    <SectionLabel index="04" label="Our process" tone="light" className="mb-6" />
    <h2 className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-4xl md:text-5xl leading-[0.95] mb-14">
      <FlipLines lines={['Growth, unlocked', 'by our M.O.V.E']} />
    </h2>
    <div className="space-y-6">
      {processSteps.map((step, i) => {
        const Graphic = PROCESS_GRAPHICS[i];
        return (
          <motion.article
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="border border-black/10 bg-white/60 p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-[family-name:var(--font-display)] font-black text-[6rem] leading-[0.8] tracking-tight">
                {step.letter}
                <span className="text-[#13FF00] [-webkit-text-stroke:2px_black]">.</span>
              </span>
              <div className="w-24 h-24 shrink-0">
                <Graphic />
              </div>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[#666666]">{step.tagline}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] font-extrabold uppercase text-3xl">{step.title}</h3>
            <p className="mt-3 text-[#444444] leading-relaxed">{step.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {step.deliverables.map((item) => (
                <li key={item} className="text-xs font-medium border border-black/15 rounded-full px-3 py-1.5">
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </div>
  </div>
);

export const Process = () => (
  <section id="process" className="relative bg-[#F7F7F7] text-black">
    <PageLines tone="light" />
    <PinnedProcess />
    <StackedProcess />
  </section>
);
