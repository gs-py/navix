import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  direction = 'up'
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  let clipPathStart = 'inset(100% 0 0 0)';
  if (direction === 'left') clipPathStart = 'inset(0 100% 0 0)';
  if (direction === 'right') clipPathStart = 'inset(0 0 0 100%)';

  return (
    <motion.div
      className={`overflow-hidden relative ${className}`}
      initial={{ clipPath: clipPathStart }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
};
