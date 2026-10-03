import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

interface CharsInProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Horizontal travel of every character, in px. */
  x?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Splits text into characters that slide in from the right and fade up. */
export const CharsIn = ({ text, className = '', delay = 0, stagger = 0.05, x = 70, immediate = false }: CharsInProps) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <span className={className}>{text}</span>;

  const words = text.split(' ');
  let charIndex = 0;
  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, margin: '-60px' } };

  return (
    <motion.span className={className} initial="hidden" {...trigger} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, x },
                  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE_OUT_EXPO, delay: delay + i * stagger } },
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};
