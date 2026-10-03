import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

interface FlipLinesProps {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

/** Headline lines that flip up out of the page in 3D as they scroll into view. */
export const FlipLines = ({ lines, className = '', lineClassName = '', delay = 0.1 }: FlipLinesProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className={`block [perspective:400px] ${className}`}>
      {lines.map((line, i) =>
        prefersReducedMotion ? (
          <span key={i} className={`block ${lineClassName}`}>{line}</span>
        ) : (
          <motion.span
            key={i}
            className={`block ${lineClassName}`}
            style={{ transformOrigin: '50% 0% -50px' }}
            initial={{ opacity: 0, rotateX: -80 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + i * 0.1 }}
          >
            {line}
          </motion.span>
        ),
      )}
    </span>
  );
};
