import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CharsIn, WordsIn, PageLines } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { services, type Service } from '../../data';
import { EASE_OUT_EXPO } from '../../lib/intro';

const GROUPS = [
  {
    index: '01',
    title: 'Branding',
    lead: "We don't just slap a logo and colours on your brand. We find the idea worth building around — then make it unmistakable everywhere it shows up.",
    ids: ['brand-strategy', 'brand-identity', 'web-design', 'creative-production'],
    graphic: 'shape' as const,
  },
  {
    index: '02',
    title: 'Digital Marketing',
    lead: 'Full-funnel growth with creative that stops the scroll and media that compounds. Every rupee tracked, every result measured.',
    ids: ['social-media', 'content-campaigns', 'seo', 'performance-marketing'],
    graphic: 'growth' as const,
  },
];

/** Branding: one form morphing circle → square → diamond, orbited by a dot. */
const ShapeGraphic = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 lg:w-28 lg:h-28" aria-hidden="true">
    <motion.rect
      x="30" y="30" width="60" height="60"
      fill="none" stroke="#13FF00" strokeWidth="1.5"
      animate={{ rx: [30, 4, 4, 30], rotate: [0, 0, 45, 90] }}
      transition={{ duration: 6, repeat: Infinity, ease: [0.76, 0, 0.24, 1] }}
    />
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
      {/* invisible ring keeps the group's box centred so it orbits the middle */}
      <circle cx="60" cy="60" r="52" fill="none" />
      <circle cx="60" cy="8" r="4" fill="#F7F7F7" />
    </motion.g>
    <circle cx="60" cy="60" r="52" fill="none" stroke="white" strokeOpacity="0.12" strokeDasharray="2 5" />
  </svg>
);

/** Digital: bars that breathe up and down beneath a trend line that keeps redrawing. */
const GrowthGraphic = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 lg:w-28 lg:h-28" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.rect
        key={i}
        x={14 + i * 20} width="12" rx="2"
        fill={i === 4 ? '#13FF00' : '#2A2A2A'}
        animate={{ height: [20 + i * 10, 34 + i * 14, 20 + i * 10], y: [100 - (20 + i * 10), 100 - (34 + i * 14), 100 - (20 + i * 10)] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
      />
    ))}
    <motion.path
      d="M14 78 L40 66 L60 70 L82 44 L106 24"
      fill="none" stroke="#F7F7F7" strokeWidth="1.5" strokeLinecap="round"
      animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <line x1="10" y1="100" x2="112" y2="100" stroke="white" strokeOpacity="0.2" />
  </svg>
);

const ServiceRow = ({ service, active, onActivate }: { service: Service; active: boolean; onActivate: () => void }) => (
  <li className="border-t border-white/10">
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={active}
      className="w-full py-5 flex items-center justify-between gap-4 text-left group/row"
    >
      <span className={`font-[family-name:var(--font-display)] text-xl lg:text-2xl font-semibold transition-all duration-500 ${active ? 'text-[#13FF00] translate-x-2' : 'text-[#F7F7F7]'}`}>
        {service.title}
      </span>
      <span className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500 ${active ? 'bg-[#13FF00] border-[#13FF00] text-black rotate-45' : 'border-white/20 text-white'}`}>
        <ArrowUpRight size={16} />
      </span>
    </button>
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="overflow-hidden"
        >
          <p className="text-[#888888] leading-relaxed pb-4 max-w-md">{service.description}</p>
          <div className="flex flex-wrap gap-2 pb-6">
            {service.capabilities.map((cap) => (
              <span key={cap} className="text-[11px] font-mono uppercase tracking-wider text-[#AAAAAA] border border-white/10 rounded-full px-3 py-1">
                {cap}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </li>
);

const SolutionCard = ({ group, delay }: { group: (typeof GROUPS)[number]; delay: number }) => {
  const [activeId, setActiveId] = useState(group.ids[0]);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(19,255,0,0.10), transparent 60%)`;
  const items = group.ids.map((id) => services.find((s) => s.id === id)).filter((s): s is Service => Boolean(s));

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className="group relative bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-colors duration-500 p-7 md:p-10 lg:p-12 overflow-hidden"
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#13FF00] group-hover:w-full transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />

      <div className="relative flex items-start justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#13FF00]">({group.index})</span>
          <h3 className="mt-4 font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(2.25rem,4vw,3.75rem)] leading-[0.9] text-[#F7F7F7]">
            {group.title}
          </h3>
        </div>
        {group.graphic === 'shape' ? <ShapeGraphic /> : <GrowthGraphic />}
      </div>

      <p className="relative mt-8 text-[#888888] leading-relaxed max-w-lg">{group.lead}</p>

      <ul className="relative mt-10 border-b border-white/10">
        {items.map((service) => (
          <ServiceRow key={service.id} service={service} active={activeId === service.id} onActivate={() => setActiveId(service.id)} />
        ))}
      </ul>
    </motion.article>
  );
};

export function Services() {
  return (
    <section id="services" className="relative bg-black text-[#F7F7F7] py-24 lg:py-40 overflow-hidden">
      <PageLines />
      <div className="container-x relative">
        <SectionLabel index="03" label="Solutions" className="mb-10" />
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 lg:mb-24">
          <h2 className="lg:col-span-7 font-[family-name:var(--font-display)] font-black uppercase tracking-[-0.04em] text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.85]">
            <CharsIn text="Our" className="block" stagger={0.06} />
            <span className="block">
              <CharsIn text="solutions" stagger={0.05} delay={0.15} />
              <span className="text-[#13FF00]">.</span>
            </span>
          </h2>
          <div className="lg:col-span-5">
            <WordsIn
              className="text-body-lg text-[#888888] leading-relaxed"
              text="Today's customers research everything online before they buy. We make sure that when they look, your brand is the one they find, remember and choose."
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {GROUPS.map((group, i) => (
            <SolutionCard key={group.title} group={group} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
