import React from 'react';

export interface NavixLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NavixLogo: React.FC<NavixLogoProps> = ({ 
  variant = 'light', 
  className = '', 
  size = 'md' 
}) => {
  const sizeClass = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-4xl' : 'text-2xl';
  
  return (
    <div className={`font-[family-name:var(--font-display)] font-bold tracking-tight inline-flex items-baseline select-none ${sizeClass} ${className}`}>
      <span className={variant === 'light' ? 'text-[#F7F7F7]' : 'text-[#000000]'}>
        Navi
      </span>
      <span className="text-[#13FF00]">x</span>
    </div>
  );
};
