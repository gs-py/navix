import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** Words to paint in the accent colour once revealed. */
  highlight?: string[];
  highlightClassName?: string;
}

const Word = ({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: string }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative inline-block mr-[0.25em]">
      <motion.span style={{ opacity }} className={accent}>
        {children}
      </motion.span>
    </span>
  );
};

/** Large statement whose words light up one by one as it scrolls through the viewport. */
export const ScrollRevealText = ({ text, className = '', highlight = [], highlightClassName = '' }: ScrollRevealTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  if (prefersReducedMotion) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[^\w']/g, '').toLowerCase();
        const accent = highlight.includes(clean) ? highlightClassName : '';
        return (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
