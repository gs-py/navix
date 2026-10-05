import { motion } from 'framer-motion';
import type { Project } from '../../data';

const loop = { repeat: Infinity, ease: 'easeInOut' as const };

/** Animated motif per project — stands in for photography until case-study imagery exists. */
const Motif = ({ id }: { id: string }) => {
  switch (id) {
    case 'bags-on-packs':
      return (
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <motion.circle cx="250" cy="200" r="130" fill="none" stroke="#F7F7F7" strokeOpacity="0.35" animate={{ r: [120, 140, 120] }} transition={{ duration: 6, ...loop }} />
          <motion.circle cx="250" cy="200" r="70" fill="#F7F7F7" fillOpacity="0.08" animate={{ cy: [190, 215, 190] }} transition={{ duration: 5, ...loop }} />
          <rect x="226" y="250" width="48" height="120" rx="24" fill="none" stroke="#13FF00" strokeWidth="2" />
        </svg>
      );
    case 'interior-world':
      return (
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${70 + i * 90} 420 V230 A45 45 0 0 1 ${160 + i * 90} 230 V420`}
              fill="none" stroke="#F7F7F7" strokeOpacity={0.25 + i * 0.15} strokeWidth="1.5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.2 + i * 0.2 }}
            />
          ))}
          <motion.circle cx="205" cy="150" r="10" fill="#13FF00" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, ...loop }} />
        </svg>
      );
    case 'phottam-ai':
      return (
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <motion.path
            d="M0 260 H120 L140 220 L160 300 L185 140 L210 360 L232 240 L250 260 H400"
            fill="none" stroke="#13FF00" strokeWidth="3" strokeLinejoin="round"
            animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }} transition={{ duration: 2.6, ...loop, times: [0, 0.7, 1] }}
          />
          <line x1="0" y1="260" x2="400" y2="260" stroke="#F7F7F7" strokeOpacity="0.1" />
        </svg>
      );
    case 'fabric-affair':
      return (
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {[40, 80, 120, 160].map((r, i) => (
            <motion.ellipse
              key={r} cx="200" cy="250" rx={r} ry={r * 1.25}
              fill="none" stroke={i === 1 ? '#13FF00' : '#F7F7F7'} strokeOpacity={i === 1 ? 0.9 : 0.2}
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 6 + i, ...loop }}
            />
          ))}
        </svg>
      );
    case 'ezka':
      return (
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M-20 ${220 + i * 34} Q 100 ${190 + i * 34} 200 ${220 + i * 34} T 420 ${220 + i * 34}`}
              fill="none" stroke={i === 2 ? '#13FF00' : '#F7F7F7'} strokeOpacity={i === 2 ? 1 : 0.2} strokeWidth="1.5"
              animate={{ x: [0, -30, 0] }} transition={{ duration: 5 + i * 0.6, ...loop }}
            />
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const cx = 80 + col * 80 + (row % 2) * 40;
            const cy = 170 + row * 70;
            return (
              <motion.polygon
                key={i}
                points={[0, 1, 2, 3, 4, 5].map((k) => `${cx + 30 * Math.cos((Math.PI / 3) * k)},${cy + 30 * Math.sin((Math.PI / 3) * k)}`).join(' ')}
                fill={i === 6 ? '#13FF00' : 'none'} stroke="#F7F7F7" strokeOpacity="0.25"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, ...loop, delay: (i % 5) * 0.3 }}
              />
            );
          })}
        </svg>
      );
  }
};

export const ProjectPoster = ({ project, index }: { project: Project; index: number }) => (
  <div
    className="relative w-full h-full overflow-hidden"
    style={{ background: `radial-gradient(120% 90% at 75% 15%, ${project.color} 0%, #0A0A0A 75%)` }}
  >
    <div className="absolute inset-0 bg-grid-fine opacity-70" />
    <Motif id={project.id} />
    <div className="relative z-10 h-full p-6 lg:p-8 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#13FF00] border border-[#13FF00]/30 rounded-full px-3 py-1 bg-black/40 backdrop-blur">
          {project.industry}
        </span>
        <span className="text-[11px] font-mono text-white/50">/{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="font-[family-name:var(--font-display)] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#F7F7F7] text-5xl lg:text-6xl">
        {project.client}
      </p>
    </div>
  </div>
);
