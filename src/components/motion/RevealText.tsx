import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({ children, className, delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
