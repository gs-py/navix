import { motion } from 'framer-motion';

interface PageLinesProps {
  tone?: 'dark' | 'light';
  className?: string;
}

/** Faint architectural guide lines (gutters) that grow down when a section enters. */
export const PageLines = ({ tone = 'dark', className = '' }: PageLinesProps) => {
  const color = tone === 'dark' ? 'bg-white/[0.06]' : 'bg-black/[0.07]';
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="container-x relative h-full">
        {['left-5 md:left-10 lg:left-16', 'right-5 md:right-10 lg:right-16'].map((pos, i) => (
          <motion.span
            key={i}
            className={`absolute top-0 bottom-0 w-px origin-top ${color} ${pos}`}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
};
