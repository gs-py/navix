import { motion } from 'framer-motion';

const INK = '#000000';
const GREEN = '#13FF00';
const loop = { repeat: Infinity, ease: 'easeInOut' as const };

/** M — Map: radar rings with a rotating sweep and blips that ping as it passes. */
export const RadarGraphic = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
    <defs>
      <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={GREEN} stopOpacity="0" />
        <stop offset="1" stopColor={GREEN} stopOpacity="0.55" />
      </linearGradient>
    </defs>
    {[30, 58, 86].map((r) => (
      <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={INK} strokeOpacity="0.25" strokeDasharray={r === 86 ? '0' : '3 5'} />
    ))}
    <line x1="14" y1="100" x2="186" y2="100" stroke={INK} strokeOpacity="0.15" />
    <line x1="100" y1="14" x2="100" y2="186" stroke={INK} strokeOpacity="0.15" />
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
      {/* invisible full circle keeps the group's box centred on the radar */}
      <circle cx="100" cy="100" r="86" fill="none" />
      <path d="M100 100 L186 100 A86 86 0 0 0 160.8 39.2 Z" fill="url(#sweep)" />
      <line x1="100" y1="100" x2="186" y2="100" stroke={INK} strokeWidth="1.5" />
    </motion.g>
    {[
      [140, 70, 0.4],
      [62, 132, 1.6],
      [126, 150, 2.7],
    ].map(([cx, cy, delay]) => (
      <motion.circle
        key={`${cx}-${cy}`}
        cx={cx} cy={cy} r="5" fill={INK}
        animate={{ scale: [0, 1.4, 1, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay, times: [0, 0.1, 0.6, 1] }}
      />
    ))}
    <circle cx="100" cy="100" r="4" fill={GREEN} stroke={INK} />
  </svg>
);

/** O — Originate: a spark that pulses while rays shoot out from the idea. */
export const BurstGraphic = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const x1 = 100 + Math.cos(a) * 38;
      const y1 = 100 + Math.sin(a) * 38;
      const x2 = 100 + Math.cos(a) * (i % 2 ? 72 : 88);
      const y2 = 100 + Math.sin(a) * (i % 2 ? 72 : 88);
      return (
        <motion.line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={INK} strokeWidth="1.5" strokeLinecap="round"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, ...loop, delay: (i % 4) * 0.12 }}
        />
      );
    })}
    <motion.path
      d="M100 52 C103 86 114 97 148 100 C114 103 103 114 100 148 C97 114 86 103 52 100 C86 97 97 86 100 52Z"
      fill={GREEN} stroke={INK} strokeWidth="1.5"
      animate={{ scale: [0.8, 1, 0.8], rotate: [0, 45, 90] }}
      transition={{ duration: 2.4, ...loop }}
    />
  </svg>
);

/** V — Visualise: scattered tiles snap into a composed grid, then drift apart again. */
export const AssembleGraphic = () => {
  const tiles = Array.from({ length: 9 }, (_, i) => ({
    x: 46 + (i % 3) * 38,
    y: 46 + Math.floor(i / 3) * 38,
    dx: [-40, 10, 45, -30, 0, 38, -46, -6, 30][i],
    dy: [-36, -50, -20, 8, 0, 14, 40, 50, 36][i],
    r: [-30, 20, 45, -15, 0, 25, 35, -40, 15][i],
  }));
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      <rect x="40" y="40" width="120" height="120" fill="none" stroke={INK} strokeOpacity="0.2" strokeDasharray="3 5" />
      {tiles.map((t, i) => (
        <motion.rect
          key={i}
          x={t.x} y={t.y} width="32" height="32" rx={i === 4 ? 16 : 2}
          fill={i === 4 ? GREEN : i % 2 ? INK : 'none'}
          stroke={INK} strokeWidth="1.5"
          animate={{ x: [t.dx, 0, 0, t.dx], y: [t.dy, 0, 0, t.dy], rotate: [t.r, 0, 0, t.r], opacity: [0.4, 1, 1, 0.4] }}
          transition={{ duration: 4, ...loop, times: [0, 0.35, 0.75, 1], delay: i * 0.04 }}
        />
      ))}
    </svg>
  );
};

/** E — Execute: a growth line draws itself while a marker rides it to the top. */
export const LaunchGraphic = () => {
  const pts: [number, number][] = [[24, 160], [62, 138], [92, 146], [124, 100], [150, 108], [178, 40]];
  const d = `M${pts.map((p) => p.join(' ')).join(' L')}`;
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      {[60, 100, 140].map((y) => (
        <line key={y} x1="20" x2="184" y1={y} y2={y} stroke={INK} strokeOpacity="0.12" />
      ))}
      <line x1="20" x2="184" y1="176" y2="176" stroke={INK} strokeOpacity="0.4" />
      <motion.path
        d={`${d} L178 176 L24 176 Z`}
        fill={GREEN} fillOpacity="0.35"
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 3.2, ...loop, times: [0, 0.5, 0.8, 1] }}
      />
      <motion.path
        d={d} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 3.2, ...loop, times: [0, 0.6, 1] }}
      />
      <motion.circle
        r="7" fill={GREEN} stroke={INK} strokeWidth="2"
        animate={{ cx: pts.map((p) => p[0]), cy: pts.map((p) => p[1]), opacity: [1, 1, 1, 1, 1, 0] }}
        transition={{ duration: 3.2 * 0.6, repeat: Infinity, repeatDelay: 3.2 * 0.4, ease: 'linear' }}
      />
      <motion.path
        d="M166 36 L184 34 L180 52" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 3.2, ...loop, times: [0, 0.55, 0.65, 1] }}
      />
    </svg>
  );
};
