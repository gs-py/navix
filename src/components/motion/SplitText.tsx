import type { FC } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'char' | 'word';
}

export const SplitText: FC<SplitTextProps> = ({ text, className = '', delay = 0, splitBy = 'word' }) => {
  const prefersReducedMotion = useReducedMotion();
  const elements = splitBy === 'word' ? text.split(' ') : text.split('');

  if (prefersReducedMotion) {
    return <div className={className}>{text}</div>;
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  };

  const child: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: splitBy === 'word' ? '0.25em' : '0' }}
    >
      {elements.map((el, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span variants={child} style={{ display: 'inline-block' }}>
            {el === ' ' ? '\u00A0' : el}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};
