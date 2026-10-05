import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import { CharsIn, WordsIn, MagneticButton } from '../motion';
import { SparkleCluster } from '../graphics/Sparkle';
import { RotatingBadge } from '../graphics/RotatingBadge';
import { ShowreelModal } from './ShowreelModal';
import { useMediaQuery, useReducedMotion } from '../../hooks';
import { INTRO_DELAY, EASE_OUT_EXPO } from '../../lib/intro';

/*
 * The hero graphic is a thick green ribbon (one stroke of the Navix "X") that enters from the
 * right edge, bends and sweeps down-left through the headline. It lives in a 1000×1000 box
 * anchored to the hero's bottom-right corner and sized to the hero's height. The same path is
 * used as a CSS mask for an overlay that repeats the headline in black, so letters that cross
 * the ribbon flip from white to black and stay legible.
 */
const RIBBON = 'M1100 540 H760 C700 540 660 556 620 600 L230 1060';
const RIBBON_ECHO = 'M1100 700 H835 C792 700 765 712 738 744 L440 1100';
const CROSS_STROKE = 'M300 600 L860 1100';

const ribbonMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><path d='${RIBBON}' fill='none' stroke='black' stroke-width='130'/></svg>`,
)}")`;

const DESCRIPTION =
  'As a modern creative and digital marketing agency in Kerala, we obsess over brand aesthetics and craft digital experiences that deliver results, and that you will genuinely enjoy building with us.';

interface HeroLayerProps {
  /** Ghost layer: identical layout, black type, no chrome — rendered inside the ribbon mask. */
  ghost?: boolean;
  spreadLeft: MotionValue<string>;
  spreadRight: MotionValue<string>;
  onPlay?: () => void;
}

const HeroLayer = ({ ghost = false, spreadLeft, spreadRight, onPlay }: HeroLayerProps) => {
  const chrome = ghost ? 'invisible' : '';
  const type = ghost ? 'text-black' : 'text-[#F7F7F7]';
  const start = INTRO_DELAY - 0.25;

  return (
    <div className="container-x relative pt-28 md:pt-32 lg:pt-36" aria-hidden={ghost || undefined}>
      {/* Tagline row */}
      <div className={`flex items-center justify-between ${chrome}`}>
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: start }}
        >
          <span className="italic font-light text-[#AAAAAA] text-lg md:text-2xl lg:text-[1.75rem] tracking-tight">
            Your Digital Compass
          </span>
          <motion.span
            className="hidden sm:block h-px w-16 lg:w-24 bg-[#AAAAAA] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: start + 0.4 }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: start + 0.6 }}
          className="text-[#F7F7F7] hidden sm:block"
        >
          <SparkleCluster className="w-12 h-12 lg:w-16 lg:h-16 animate-[spin-slow_14s_linear_infinite]" />
        </motion.div>
      </div>

      {/* Everything below sizes off the headline's em, so positions track the giant type */}
      <div className="relative text-hero mt-4 lg:mt-2">
        <h1 className={`uppercase ${type}`}>
          <span className="sr-only">We move brands. Navix creative and digital marketing agency</span>
          <motion.span className="block" style={{ x: spreadLeft }} aria-hidden="true">
            <CharsIn text="We move" immediate delay={start} stagger={0.09} x={100} />
          </motion.span>
          {/* Line 2, offset right like a second beat */}
          <motion.span className="block mt-[0.06em] pl-[0.7em] lg:pl-[1.75em]" style={{ x: spreadRight }} aria-hidden="true">
            <CharsIn text="Brands." immediate delay={start + 0.35} stagger={0.07} x={100} />
          </motion.span>
        </h1>

        <div className="font-[family-name:var(--font-body)] font-normal normal-case tracking-normal leading-normal">
          {/* Description + CTAs: left of line 2 on desktop, below it on mobile */}
          <div className={`relative mt-8 lg:mt-0 lg:absolute lg:left-0 lg:top-[1.02em] lg:w-[1.5em] lg:min-w-[19rem] ${chrome}`}>
            <WordsIn
              text={DESCRIPTION}
              immediate
              delay={start + 0.9}
              className="text-[15px] xl:text-base leading-relaxed text-[#888888] max-w-md"
            />
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: start + 1.4 }}
            >
              <MagneticButton href="#contact" strength={0.25} className="group rounded-full bg-[#13FF00] text-black pl-6 pr-2 py-2 font-[family-name:var(--font-display)] font-semibold text-sm uppercase tracking-wider hover:bg-[#F7F7F7] transition-colors">
                Start a project
                <span className="w-9 h-9 rounded-full bg-black text-[#13FF00] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </MagneticButton>
              <a href="#work" className="text-sm font-semibold uppercase tracking-wider text-[#F7F7F7] border-b border-white/30 pb-1 hover:text-[#13FF00] hover:border-[#13FF00] transition-colors">
                See our work
              </a>
            </motion.div>
          </div>

          {/* Watch video intro: right of line 1 on desktop */}
          <motion.button
            type="button"
            onClick={onPlay}
            tabIndex={ghost ? -1 : 0}
            className={`group flex items-center gap-5 mt-10 lg:mt-0 lg:absolute lg:right-0 lg:top-[0.12em] text-left ${chrome}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: start + 1 }}
            aria-label="Watch the Navix video intro"
          >
            <RotatingBadge text="Watch showreel • Navix 2026 • " size={132} className="text-[#F7F7F7]/70 rounded-full bg-[#0D0D0D] border border-white/10">
              <span className="w-12 h-12 rounded-full bg-[#13FF00] text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-125">
                <Play size={16} className="fill-current ml-0.5" />
              </span>
            </RotatingBadge>
            <span className="font-[family-name:var(--font-display)] uppercase leading-tight">
              <span className="block text-sm font-semibold text-[#AAAAAA]">Watch</span>
              <span className="block text-lg font-bold text-[#F7F7F7] group-hover:text-[#13FF00] transition-colors">Video intro</span>
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [reelOpen, setReelOpen] = useState(false);
  // Desktop: ribbon box = hero height, crossing the headline. Below lg: full-width square under the copy.
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Lines drift apart and the ribbon slides down its diagonal as the hero scrolls away.
  const spreadLeft = useTransform(scrollYProgress, [0, 1], ['0vw', prefersReducedMotion ? '0vw' : '-12vw']);
  const spreadRight = useTransform(scrollYProgress, [0, 1], ['0vw', prefersReducedMotion ? '0vw' : '10vw']);
  const ribbonX = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -160]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 190]);
  const maskPosition = useMotionTemplate`calc(100% + ${ribbonX}px) calc(100% + ${ribbonY}px)`;
  const ribbonSize = isDesktop ? 'auto 100%' : '100% auto';
  const ribbonStart = INTRO_DELAY + 0.15;

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] lg:h-[max(100svh,760px)] overflow-hidden bg-black pb-[62vw] lg:pb-0">
      {/* Thin echo line + outlined cross stroke, aligned with the ribbon box */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        className={`absolute right-0 bottom-0 aspect-square z-0 text-[#13FF00] ${isDesktop ? 'h-full' : 'w-full'}`}
        style={{ x: ribbonX, y: ribbonY }}
        fill="none"
      >
        <motion.path
          d={CROSS_STROKE}
          stroke="currentColor"
          strokeWidth="112"
          strokeOpacity="0.9"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: ribbonStart + 0.5 }}
        />
        <motion.path
          d={CROSS_STROKE}
          stroke="black"
          strokeWidth="108"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: ribbonStart + 0.5 }}
        />
        <motion.path
          d={RIBBON_ECHO}
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: EASE_OUT_EXPO, delay: ribbonStart + 0.3 }}
        />
      </motion.svg>

      {/* Architectural guide lines */}
      <div aria-hidden="true" className="hidden lg:block absolute inset-x-0 bottom-0 h-[24%] z-0 pointer-events-none">
        <motion.span
          className="absolute top-0 left-[30%] w-[38%] h-px bg-white/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: INTRO_DELAY + 0.6 }}
        />
        {['left-[36%]', 'left-[57%]'].map((pos, i) => (
          <motion.span
            key={pos}
            className={`absolute top-0 bottom-0 w-px bg-white/20 origin-top ${pos}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: INTRO_DELAY + 1 + i * 0.15 }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <HeroLayer spreadLeft={spreadLeft} spreadRight={spreadRight} onPlay={() => setReelOpen(true)} />
      </div>

      {/* Ribbon: green fill + black copy of the headline, both cut to the ribbon shape */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          maskImage: ribbonMask,
          WebkitMaskImage: ribbonMask,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: ribbonSize,
          WebkitMaskSize: ribbonSize,
          maskPosition,
          WebkitMaskPosition: maskPosition,
        }}
        initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: ribbonStart }}
      >
        <div className="absolute inset-0 bg-[#13FF00]" />
        <div className="relative">
          <HeroLayer ghost spreadLeft={spreadLeft} spreadRight={spreadRight} />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        className="hidden sm:flex absolute z-30 bottom-8 left-5 md:left-10 lg:left-16 w-10 h-20 rounded-full border border-white/40 items-start justify-center pt-3 text-white hover:border-[#13FF00] hover:text-[#13FF00] transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: INTRO_DELAY + 1.2 }}
      >
        <motion.span animate={{ y: [0, 22, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.a>

      <ShowreelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </section>
  );
};
