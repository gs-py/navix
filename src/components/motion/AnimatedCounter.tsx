import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  decimals = 0
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  
  const value = useMotionValue(0);
  const display = useTransform(value, (latest) => {
    return prefix + latest.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      value.set(target);
      return;
    }

    if (inView) {
      const controls = animate(value, target, {
        duration,
        ease: [0.16, 1, 0.3, 1]
      });
      return controls.stop;
    }
  }, [inView, target, duration, value, prefersReducedMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};
