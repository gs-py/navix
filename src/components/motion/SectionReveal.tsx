import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({ children, className, id }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <section id={id} className={className}>{children}</section>;
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
};
