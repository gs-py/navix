import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useIsMobile, useReducedMotion } from '../../hooks';

interface CircleButtonProps {
  label: string;
  href: string;
  size?: number;
  tone?: 'dark' | 'light' | 'green';
  className?: string;
}

const tones = {
  // ring / text colour, fill colour, text colour on fill
  dark: { ring: 'border-white/25 text-[#F7F7F7]', fill: 'bg-[#13FF00]', hoverText: 'group-hover:text-black' },
  light: { ring: 'border-black/25 text-black', fill: 'bg-black', hoverText: 'group-hover:text-[#F7F7F7]' },
  green: { ring: 'border-black text-black', fill: 'bg-black', hoverText: 'group-hover:text-[#13FF00]' },
};

/**
 * Large round CTA: the disc is pulled toward the cursor inside a wider hit area, and on hover a
 * fill blooms out from the exact point the pointer entered.
 */
export const CircleButton = ({ label, href, size = 170, tone = 'dark', className = '' }: CircleButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const x = useSpring(useMotionValue(0), { stiffness: 160, damping: 14, mass: 0.2 });
  const y = useSpring(useMotionValue(0), { stiffness: 160, damping: 14, mass: 0.2 });
  const t = tones[tone];

  const handleMove = (e: React.MouseEvent) => {
    if (isMobile || prefersReducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 60);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 60);
  };

  const handleEnter = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={(e) => {
        handleEnter(e);
        x.set(0);
        y.set(0);
      }}
      className={`group relative inline-flex items-center justify-center p-6 ${className}`}
    >
      <motion.span
        style={{ x, y, width: size, height: size }}
        className={`relative rounded-full border overflow-hidden flex items-center justify-center ${t.ring}`}
      >
        <span
          className={`absolute w-[220%] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${t.fill}`}
          style={{ left: `${origin.x}%`, top: `${origin.y}%` }}
        />
        <span className={`relative flex items-center gap-1.5 font-[family-name:var(--font-display)] font-semibold text-base transition-colors duration-300 ${t.hoverText}`}>
          {label}
          <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </motion.span>
    </a>
  );
};
