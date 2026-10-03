import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

interface WordsInProps {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}

/** Paragraph whose words drift in from the right one after another. */
export const WordsIn = ({ text, className = '', delay = 0, immediate = false }: WordsInProps) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <p className={className}>{text}</p>;

  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, margin: '-60px' } };

  return (
    <motion.p className={className} initial="hidden" {...trigger}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.27em]"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE_OUT_EXPO, delay: delay + i * 0.025 } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};
