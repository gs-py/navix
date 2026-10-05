import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FlipLines, PageLines } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { InsightArt } from '../graphics/InsightArt';
import { insights } from '../../data';
import { useIsMobile } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

/** Editorial index of articles; on desktop a live preview card trails the cursor. */
export const Insights = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 25, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 25, mass: 0.4 });

  return (
    <section id="insights" className="relative bg-[#F7F7F7] text-black py-24 lg:py-40 overflow-hidden">
      <PageLines tone="light" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <SectionLabel index="09" label="Insights" tone="light" className="mb-8" />
            <h2 className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92]">
              <FlipLines lines={['Learn, grow & lead', <>with Navix insights<span className="text-[#13FF00] [-webkit-text-stroke:2px_black]">.</span></>]} />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-[#666666] leading-relaxed">
              Field notes from the studio: simple guides, trends and ideas to help your brand get found, get chosen and keep growing.
            </p>
            <a href="#insights" className="group inline-flex items-center gap-2 mt-6 text-sm font-semibold uppercase tracking-wider border-b border-black pb-1">
              All articles
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        <ul
          className="border-t border-black/15"
          onMouseMove={(e) => {
            const r = (e.currentTarget.parentElement ?? e.currentTarget).getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onMouseLeave={() => setHovered(null)}
        >
          {insights.map((post, i) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
              className="relative border-b border-black/15"
              onMouseEnter={() => setHovered(i)}
            >
              <a href="#insights" className="group grid grid-cols-12 gap-4 items-center py-7 lg:py-9">
                <span className="absolute left-0 bottom-[-1px] h-[2px] w-0 bg-black group-hover:w-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                {/* Mobile thumbnail */}
                <div className="col-span-12 md:hidden aspect-[16/9] bg-black mb-2 p-8">
                  <InsightArt category={post.category} />
                </div>

                <span className="col-span-6 md:col-span-2 font-mono text-xs uppercase tracking-[0.15em] text-[#666666]">{post.date}</span>
                <span className="col-span-6 md:col-span-2 justify-self-end md:justify-self-start">
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold border border-black/20 rounded-full px-3 py-1">{post.category}</span>
                </span>
                <h3 className="col-span-12 md:col-span-7 font-[family-name:var(--font-display)] font-semibold text-2xl lg:text-[2rem] leading-tight tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                  {post.title}
                  <span className="block text-sm font-[family-name:var(--font-body)] font-normal text-[#888888] mt-2 tracking-normal">{post.readTime} read</span>
                </h3>
                <span className="hidden md:flex col-span-1 justify-end">
                  <span className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center transition-all duration-500 group-hover:bg-black group-hover:text-[#13FF00] group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Cursor-trailing preview */}
        {!isMobile && (
          <motion.div className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block" style={{ x, y }} aria-hidden="true">
            <div className="-translate-x-1/2 -translate-y-[105%]">
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key="preview"
                  className="w-[260px] bg-black text-[#F7F7F7] overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={hovered}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    >
                      <div className="aspect-square p-8 bg-grid-fine">
                        <InsightArt category={insights[hovered].category} />
                      </div>
                      <p className="px-5 py-4 text-sm text-[#AAAAAA] leading-snug border-t border-white/10">{insights[hovered].excerpt}</p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
