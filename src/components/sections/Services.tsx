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
    title: 'Digital Marketing',
    lead: 'Full-funnel growth with creative that stops the scroll and media that compounds. Every rupee tracked, every result measured.',
    ids: ['performance-marketing', 'seo', 'content-campaigns'],
    graphic: 'growth' as const,
  },
  {
    index: '02',
    title: 'Social Media Management',
    lead: 'Content that stops the scroll. Community management that builds real connection. Strategy that drives growth.',
    ids: ['social-media'],
    graphic: 'social' as const,
  },
  {
    index: '03',
    title: 'Website Design & Development',
    lead: 'Websites that are experiences. Fast, beautiful, conversion-focused digital presences.',
    ids: ['web-design'],
    graphic: 'web' as const,
  },
  {
    index: '04',
    title: 'Branding',
    lead: "We don't just slap a logo and colours on your brand. We find the idea worth building around, then make it unmistakable everywhere it shows up.",
    ids: ['brand-strategy', 'brand-identity'],
    graphic: 'shape' as const,
  },
  {
    index: '05',
    title: 'Graphic Designing',
    lead: 'Posts, ads, print and packaging designed to one visual language, so every piece looks unmistakably yours.',
    ids: ['graphic-design'],
    graphic: 'design' as const,
  },
  {
    index: '06',
    title: 'Video Editing',
    lead: 'From quick reels to full brand films, we shoot, cut and finish video that people actually watch to the end.',
    ids: ['video-editing', 'creative-production'],
    graphic: 'video' as const,
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

/** Social: a phone whose feed scrolls while likes float up and a notification pulses. */
const SocialGraphic = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 lg:w-28 lg:h-28" aria-hidden="true">
    <defs><clipPath id="social-screen"><rect x="40" y="22" width="40" height="72" rx="4" /></clipPath></defs>
    <rect x="36" y="16" width="48" height="88" rx="9" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
    <g clipPath="url(#social-screen)">
      <motion.g animate={{ y: [0, -36] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="44" y={26 + i * 36} width="32" height="20" rx="2" fill={i % 2 ? '#2A2A2A' : '#1C1C1C'} />
            <rect x="44" y={49 + i * 36} width="20" height="3" rx="1.5" fill="#2A2A2A" />
          </g>
        ))}
      </motion.g>
    </g>
    {[0, 1, 2].map((i) => (
      <motion.path
        key={i}
        d="M0 -3 C-3 -7 -8 -3 0 3 C8 -3 3 -7 0 -3Z"
        fill="#13FF00"
        initial={{ x: 92 + i * 6, y: 80, opacity: 0, scale: 0.6 }}
        animate={{ y: [80, 28], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.8 }}
      />
    ))}
    <motion.circle cx="82" cy="18" r="5" fill="#13FF00" animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
  </svg>
);

/** Web: a browser window whose layout blocks build in while a cursor clicks the call to action. */
const WebGraphic = () => {
  const loop = { duration: 4, repeat: Infinity, ease: [0.16, 1, 0.3, 1] as const };
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 lg:w-28 lg:h-28" aria-hidden="true">
      <rect x="10" y="20" width="100" height="78" rx="6" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="10" y1="32" x2="110" y2="32" stroke="white" strokeOpacity="0.15" />
      {[18, 25, 32].map((cx) => <circle key={cx} cx={cx} cy="26" r="2" fill="white" fillOpacity="0.3" />)}
      {[
        { x: 18, y: 40, w: 52, h: 6, t: 0.1 },
        { x: 18, y: 51, w: 36, h: 4, t: 0.2 },
        { x: 18, y: 62, w: 26, h: 10, t: 0.3, green: true },
        { x: 76, y: 40, w: 26, h: 32, t: 0.25 },
        { x: 18, y: 80, w: 84, h: 10, t: 0.4 },
      ].map((b, i) => (
        <motion.rect
          key={i}
          x={b.x} y={b.y} height={b.h} rx="2"
          fill={b.green ? '#13FF00' : '#2A2A2A'}
          animate={{ width: [0, b.w, b.w, 0] }}
          transition={{ ...loop, times: [0, 0.25 + b.t * 0.3, 0.85, 1] }}
        />
      ))}
      <motion.path
        d="M0 0 L0 12 L3.5 8.5 L6 14 L8 13 L5.5 7.5 L10 7.5Z"
        fill="#F7F7F7"
        animate={{ x: [96, 96, 34, 34, 96], y: [92, 92, 66, 66, 92], scale: [1, 1, 1, 0.8, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.55, 0.62, 1] }}
      />
    </svg>
  );
};

/** Graphic design: a pen-tool curve draws between anchor points while its handle swings. */
const DesignGraphic = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 lg:w-28 lg:h-28" aria-hidden="true">
    <motion.rect x="62" y="58" width="36" height="36" rx="4" fill="#2A2A2A" animate={{ rotate: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.circle cx="44" cy="44" r="20" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.path
      d="M16 96 C30 40, 70 110, 104 26"
      fill="none" stroke="#13FF00" strokeWidth="2" strokeLinecap="round"
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: [0.76, 0, 0.24, 1], times: [0, 0.45, 0.8, 1] }}
    />
    <motion.g style={{ originX: '60px', originY: '68px' }} animate={{ rotate: [-18, 18, -18] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
      <line x1="40" y1="78" x2="80" y2="58" stroke="white" strokeOpacity="0.5" />
      <circle cx="40" cy="78" r="3" fill="#F7F7F7" />
      <circle cx="80" cy="58" r="3" fill="#F7F7F7" />
    </motion.g>
    {[[16, 96], [104, 26]].map(([x, y]) => <rect key={x} x={x - 3.5} y={y - 3.5} width="7" height="7" fill="#0A0A0A" stroke="#13FF00" strokeWidth="1.5" />)}
  </svg>
);

/** Video: a play button pulses over a timeline whose playhead sweeps across the clips. */
const VideoGraphic = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 lg:w-28 lg:h-28" aria-hidden="true">
    <rect x="14" y="14" width="92" height="56" rx="6" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
    <motion.g style={{ originX: '60px', originY: '42px' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
      <circle cx="60" cy="42" r="13" fill="#13FF00" />
      <path d="M56 35 L67 42 L56 49Z" fill="black" />
    </motion.g>
    {[
      { x: 14, w: 26, y: 80 }, { x: 43, w: 38, y: 80 }, { x: 84, w: 22, y: 80 },
      { x: 14, w: 40, y: 94 }, { x: 57, w: 49, y: 94 },
    ].map((c, i) => <rect key={i} x={c.x} y={c.y} width={c.w} height="10" rx="2" fill={i === 1 ? '#13FF00' : '#2A2A2A'} fillOpacity={i === 1 ? 0.6 : 1} />)}
    <motion.g animate={{ x: [0, 92] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}>
      <line x1="14" y1="76" x2="14" y2="108" stroke="#F7F7F7" strokeWidth="1.5" />
      <path d="M10 74 L18 74 L14 79Z" fill="#F7F7F7" />
    </motion.g>
  </svg>
);

const GRAPHICS = { growth: GrowthGraphic, social: SocialGraphic, web: WebGraphic, shape: ShapeGraphic, design: DesignGraphic, video: VideoGraphic };

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
  const Graphic = GRAPHICS[group.graphic];
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
          <h3 className="mt-4 font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.95] text-[#F7F7F7]">
            {group.title}
          </h3>
        </div>
        <Graphic />
      </div>

      <p className="relative mt-8 text-[#888888] leading-relaxed max-w-lg">{group.lead}</p>

      {items.length > 1 ? (
        <ul className="relative mt-10 border-b border-white/10">
          {items.map((service) => (
            <ServiceRow key={service.id} service={service} active={activeId === service.id} onActivate={() => setActiveId(service.id)} />
          ))}
        </ul>
      ) : (
        <div className="relative mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-2">
          {items[0]?.capabilities.map((cap) => (
            <span key={cap} className="text-[11px] font-mono uppercase tracking-wider text-[#AAAAAA] border border-white/10 rounded-full px-3 py-1">
              {cap}
            </span>
          ))}
        </div>
      )}
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

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {GROUPS.map((group, i) => (
            <SolutionCard key={group.title} group={group} delay={(i % 2) * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
