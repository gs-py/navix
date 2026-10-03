import React from 'react';
import { useReducedMotion } from '../../hooks';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
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
  const trackStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        animation: `navix-marquee ${speed}s linear infinite`,
        animationDirection: direction === 'right' ? 'reverse' : 'normal',
      };
  const trackClass = `flex shrink-0 min-w-full ${pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''}`;

  return (
    <div className={`overflow-hidden flex w-full group/marquee ${className}`}>
      <div className={trackClass} style={trackStyle}>
        {children}
      </div>
      {!prefersReducedMotion && (
        <div className={trackClass} style={trackStyle} aria-hidden="true">
          {children}
        </div>
      )}
    </div>
  );
};
