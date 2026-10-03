import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform, useVelocity, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../common';
import { CircleButton, PageLines } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { ProjectPoster } from '../graphics/ProjectPoster';
import { projects, type Project } from '../../data';
import { useReducedMotion } from '../../hooks';

interface WorkItemProps {
  project: Project;
  index: number;
  skew: MotionValue<number>;
  onActive: (index: number) => void;
}

const WorkItem = ({ project, index, skew, onActive }: WorkItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useCursor();
  const centred = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tilt = index % 2 ? 7 : -7;
  // Poster straightens as it reaches the centre of the viewport, then tips the other way.
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [tilt, tilt * 0.35, -tilt * 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  return (
    <div ref={ref} className={`relative py-10 lg:py-16 ${index % 2 ? 'lg:pl-[14%]' : 'lg:pr-[14%]'}`}>
      <a
        href="#contact"
        className="group block relative"
        onMouseEnter={() => setCursorVariant('project')}
        onMouseLeave={() => setCursorVariant('default')}
        aria-label={`${project.client}: ${project.title}`}
      >
        <div className="relative aspect-[4/5] max-w-[440px] mx-auto">
          {/* Green backing slab */}
          <motion.div className={`absolute top-[10%] bottom-[10%] bg-[#13FF00] ${index % 2 ? '-left-[9%] right-[18%]' : 'left-[18%] -right-[9%]'}`} style={{ y }} />
          <motion.div className="absolute inset-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]" style={{ rotate, skewY: skew }}>
            <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.96]">
              <ProjectPoster project={project} index={index} />
            </div>
          </motion.div>
        </div>
      </a>

      {/* Mobile caption */}
      <div className="lg:hidden mt-8">
        <p className="text-caption text-[#13FF00]">{project.industry}</p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] font-bold text-2xl text-[#F7F7F7]">{project.title}</h3>
      </div>
    </div>
  );
};

export const SelectedWork = () => {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewRaw = useTransform(velocity, [-2500, 0, 2500], prefersReducedMotion ? [0, 0, 0] : [6, 0, -6], { clamp: true });
  const skew = useSpring(skewRaw, { stiffness: 220, damping: 40 });

  return (
    <section id="work" className="relative bg-black text-[#F7F7F7] py-24 lg:py-36 overflow-x-clip">
      <PageLines />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Posters */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {projects.map((project, i) => (
              <WorkItem key={project.id} project={project} index={i} skew={skew} onActive={setActive} />
            ))}
          </div>

          {/* Sticky index */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col lg:py-10">
              <SectionLabel index="07" label="Selected work" className="mb-8" />
              <div className="flex items-end justify-between lg:justify-end gap-6">
                <h2 className="lg:hidden font-[family-name:var(--font-display)] font-black uppercase text-7xl tracking-tight leading-none">
                  Work<span className="text-[#13FF00]">.</span>
                </h2>
              </div>

              <ol className="hidden lg:block mt-2 space-y-4 text-right">
                {projects.map((project, i) => {
                  const isActive = i === active;
                  return (
                    <li key={project.id} className="flex items-start justify-end gap-4">
                      <div>
                        <p
                          className={`font-[family-name:var(--font-display)] font-bold uppercase leading-[1] tracking-tight transition-all duration-500 ${
                            isActive ? 'text-[#F7F7F7] text-[2.25rem]' : 'text-white/25 text-xl'
                          }`}
                        >
                          {project.client}
                        </p>
                        <p className={`text-xs uppercase tracking-[0.15em] mt-1.5 transition-colors duration-500 ${isActive ? 'text-[#888888]' : 'text-white/15'}`}>
                          {project.industry} · {project.year}
                        </p>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-[#AAAAAA] mt-3 max-w-xs ml-auto leading-relaxed"
                          >
                            {project.title}
                          </motion.p>
                        )}
                      </div>
                      <span className={`mt-3 h-px transition-all duration-500 ${isActive ? 'w-10 bg-[#13FF00]' : 'w-4 bg-white/20'}`} />
                    </li>
                  );
                })}
              </ol>

              <div className="hidden lg:flex items-end justify-between mt-auto">
                <CircleButton label="All work" href="#contact" size={130} />
                <span
                  aria-hidden="true"
                  className="font-[family-name:var(--font-display)] font-black uppercase text-[6rem] xl:text-[7rem] leading-[0.75] tracking-[-0.04em] text-white/[0.07] [writing-mode:vertical-rl] rotate-180 select-none"
                >
                  Work
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-10 flex justify-center">
          <a href="#contact" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold border-b border-[#13FF00] pb-1">
            Start your project <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
