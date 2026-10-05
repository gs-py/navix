import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useInView, useMotionValue, type MotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedCounter, FlipLines, PageLines } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { testimonials } from '../../data';
import { useReducedMotion } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

const SLIDE_SECONDS = 7;

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Initials inside a ring that traces the autoplay timer. */
const AvatarRing = ({ name, progress }: { name: string; progress: MotionValue<number> }) => (
  <div className="relative w-16 h-16 shrink-0">
    <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
      <motion.circle cx="32" cy="32" r="30" fill="none" stroke="#13FF00" strokeWidth="1.5" style={{ pathLength: progress }} />
    </svg>
    <span className="absolute inset-[6px] rounded-full bg-[#1A1A1A] flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-[#F7F7F7]">
      {initials(name)}
    </span>
  </div>
);

/** Quote mark built from two green slabs that tip into place. */
const QuoteMark = () => (
  <svg viewBox="0 0 96 72" className="w-16 h-12 lg:w-20 lg:h-16" aria-hidden="true">
    {[0, 52].map((x, i) => (
      <motion.path
        key={x}
        d={`M${x + 4} 68 V36 C${x + 4} 18 ${x + 14} 6 ${x + 40} 4 V18 C${x + 26} 20 ${x + 22} 28 ${x + 22} 36 H${x + 40} V68 Z`}
        fill="#13FF00"
        initial={{ y: 30, opacity: 0, rotate: -12 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 + i * 0.1 }}
      />
    ))}
  </svg>
);

const RailItem = ({ index, active, progress, onSelect }: { index: number; active: boolean; progress: MotionValue<number>; onSelect: () => void }) => {
  const t = testimonials[index];
  return (
    <li>
      <button type="button" onClick={onSelect} className="w-full text-left py-5 group" aria-current={active}>
        <div className="flex items-baseline justify-between gap-4">
          <span className={`font-[family-name:var(--font-display)] text-xl font-semibold transition-colors duration-300 ${active ? 'text-black' : 'text-black/35 group-hover:text-black/70'}`}>
            {t.company}
          </span>
          <span className="font-mono text-[11px] text-black/40">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="relative h-px mt-4 bg-black/10 overflow-hidden">
          <motion.div className="absolute inset-0 bg-black origin-left" style={{ scaleX: active ? progress : 0 }} />
        </div>
      </button>
    </li>
  );
};

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '-20%' });
  const prefersReducedMotion = useReducedMotion();
  const t = testimonials[active];
  const go = (dir: number) => setActive((i) => (i + dir + testimonials.length) % testimonials.length);

  useEffect(() => {
    progress.set(0);
  }, [active, progress]);

  useEffect(() => {
    if (paused || !inView || prefersReducedMotion) return;
    const remaining = SLIDE_SECONDS * (1 - progress.get());
    const controls = animate(progress, 1, {
      duration: remaining,
      ease: 'linear',
      onComplete: () => setActive((i) => (i + 1) % testimonials.length),
    });
    return () => controls.stop();
  }, [active, paused, inView, prefersReducedMotion, progress]);

  return (
    <section ref={sectionRef} id="impact" className="relative bg-[#F7F7F7] text-black py-24 lg:py-40 overflow-hidden">
      <PageLines tone="light" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <SectionLabel index="06" label="Impact" tone="light" className="mb-8" />
            <h2 className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92]">
              <FlipLines lines={['The impact we create,', <>told by clients<span className="text-[#13FF00] [-webkit-text-stroke:2px_black]">.</span></>]} />
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-center gap-5 lg:justify-end">
            <span className="font-[family-name:var(--font-display)] font-black text-6xl leading-none">
              <AnimatedCounter target={4.9} decimals={1} />
            </span>
            <div>
              <div className="flex gap-1 mb-1.5" aria-label="Rated 4.9 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="w-3 h-3 bg-black [clip-path:polygon(50%_0,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.3 + i * 0.08 }}
                  />
                ))}
              </div>
              <p className="text-sm text-[#666666]">Average client rating</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Client rail */}
          <ul className="lg:col-span-4 order-2 lg:order-1 border-t border-black/10 lg:border-0">
            {testimonials.map((item, i) => (
              <RailItem key={item.id} index={i} active={i === active} progress={progress} onSelect={() => setActive(i)} />
            ))}
          </ul>

          {/* Spotlight card */}
          <div
            className="lg:col-span-8 order-1 lg:order-2 relative bg-black text-[#F7F7F7] p-7 md:p-12 lg:p-14 min-h-[480px] flex flex-col overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Corner ticks */}
            {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((pos) => (
              <span key={pos} className={`absolute w-4 h-4 border-white/30 ${pos}`} aria-hidden="true" />
            ))}
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#13FF00]/10 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                className="relative flex flex-col flex-1"
                exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.35 }}
              >
                <QuoteMark />
                <blockquote className="mt-8 font-[family-name:var(--font-display)] font-medium text-2xl md:text-3xl lg:text-[2.35rem] leading-[1.2] tracking-tight">
                  {t.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.25em]"
                      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.025 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </blockquote>

                <div className="mt-auto pt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <AvatarRing name={t.company} progress={progress} />
                    <div>
                      <p className="font-semibold">{t.company}</p>
                      <p className="text-sm text-[#888888]">{t.position}</p>
                    </div>
                  </div>
                  <motion.div
                    className="md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.4 }}
                  >
                    <p className="text-xs uppercase tracking-[0.15em] text-[#666666]">What we did</p>
                    <ul className="mt-3 space-y-1.5">
                      {t.services.map((service) => (
                        <li key={service} className="font-[family-name:var(--font-display)] font-semibold text-[#13FF00]">{service}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex gap-3 mt-10">
              {[
                { dir: -1, label: 'Previous testimonial', Icon: ArrowLeft },
                { dir: 1, label: 'Next testimonial', Icon: ArrowRight },
              ].map(({ dir, label, Icon }) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(dir)}
                  aria-label={label}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#13FF00] hover:border-[#13FF00] hover:text-black transition-colors"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
