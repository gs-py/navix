import { motion } from 'framer-motion';
import type { Insight } from '../../data';

const loop = { repeat: Infinity, ease: 'easeInOut' as const };

/** Small generative animation per insight category. */
export const InsightArt = ({ category }: { category: Insight['category'] }) => (
  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
    {category === 'Branding' &&
      [70, 52, 34, 16].map((s, i) => (
        <motion.rect
          key={s}
          x={100 - s} y={100 - s} width={s * 2} height={s * 2}
          fill={i === 3 ? '#13FF00' : 'none'} stroke="#F7F7F7" strokeOpacity={0.3 + i * 0.2}
          animate={{ rotate: [0, i % 2 ? -90 : 90] }}
          transition={{ duration: 4 + i, ...loop, repeatType: 'reverse' }}
        />
      ))}
    {category === 'Performance' && (
      <>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.rect
            key={i}
            x={28 + i * 25} width="14" rx="2" fill={i === 5 ? '#13FF00' : '#F7F7F7'} fillOpacity={i === 5 ? 1 : 0.25}
            animate={{ height: [30 + i * 12, 50 + i * 16, 30 + i * 12], y: [160 - (30 + i * 12), 160 - (50 + i * 16), 160 - (30 + i * 12)] }}
            transition={{ duration: 2.4, ...loop, delay: i * 0.12 }}
          />
        ))}
        <line x1="20" x2="180" y1="160" y2="160" stroke="#F7F7F7" strokeOpacity="0.3" />
      </>
    )}
    {category === 'Content' &&
      [0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={58 + i * 14} y={40 + i * 12} width="70" height="110" rx="10"
          fill={i === 2 ? '#13FF00' : '#0A0A0A'} stroke="#F7F7F7" strokeOpacity="0.4"
          animate={{ y: [40 + i * 12, 30 + i * 12, 40 + i * 12], rotate: [-6 + i * 6, -2 + i * 6, -6 + i * 6] }}
          transition={{ duration: 3, ...loop, delay: i * 0.2 }}
        />
      ))}
    {category === 'Strategy' && (
      <>
        {[
          [40, 60, 100, 100], [100, 100, 160, 50], [100, 100, 150, 150], [40, 60, 60, 150], [60, 150, 150, 150],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F7F7F7" strokeOpacity="0.4"
            animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4, ...loop, delay: i * 0.25 }}
          />
        ))}
        {[[40, 60], [100, 100], [160, 50], [150, 150], [60, 150]].map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r={i === 1 ? 10 : 6} fill={i === 1 ? '#13FF00' : '#F7F7F7'}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, ...loop, delay: i * 0.3 }}
          />
        ))}
      </>
    )}
  </svg>
);
