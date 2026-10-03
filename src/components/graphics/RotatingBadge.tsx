import type { ReactNode } from 'react';

interface RotatingBadgeProps {
  text: string;
  size?: number;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
}

/** Circular text ring that rotates slowly, with arbitrary centre content. */
export const RotatingBadge = ({
  text,
  size = 160,
  className = '',
  textClassName = 'fill-current',
  children,
}: RotatingBadgeProps) => {
  const id = `badge-${text.replace(/[^a-z]/gi, '').slice(0, 12)}-${size}`;
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className={`${textClassName} uppercase`} style={{ fontSize: 15, letterSpacing: '0.32em', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};
