import React from 'react';
import { useReducedMotion } from '../../hooks';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = '',
  speed = 20,
  pauseOnHover = false,
  direction = 'left'
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden flex w-full group ${className}`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
        .animate-marquee[data-direction="right"] {
          animation-direction: reverse;
        }
        .group:hover .pause-on-hover {
          animation-play-state: paused;
        }
      `}</style>
      <div 
        className={`flex shrink-0 min-w-full ${prefersReducedMotion ? '' : 'animate-marquee'} ${pauseOnHover ? 'pause-on-hover' : ''}`}
        data-direction={direction}
      >
        {children}
      </div>
      {!prefersReducedMotion && (
        <div 
          className={`flex shrink-0 min-w-full animate-marquee ${pauseOnHover ? 'pause-on-hover' : ''}`}
          data-direction={direction}
          aria-hidden="true"
        >
          {children}
        </div>
      )}
    </div>
  );
};
