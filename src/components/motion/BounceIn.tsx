import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface BounceInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Drops an element in from above and lets it bounce to rest. */
export const BounceIn = ({ children, className = '', delay = 0 }: BounceInProps) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 11, mass: 1, delay }}
    >
      {children}
    </motion.div>
  );
};
