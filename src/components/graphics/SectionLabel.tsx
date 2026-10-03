import { motion } from 'framer-motion';

interface SectionLabelProps {
  index: string;
  label: string;
  tone?: 'dark' | 'light';
  className?: string;
}

/** "(01) — Agency" eyebrow used to open every section. */
export const SectionLabel = ({ index, label, tone = 'dark', className = '' }: SectionLabelProps) => {
  const muted = tone === 'dark' ? 'text-[#888888]' : 'text-[#666666]';
  const line = tone === 'dark' ? 'bg-[#444444]' : 'bg-black/25';
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`font-mono text-xs tracking-widest ${tone === 'dark' ? 'text-[#13FF00]' : 'text-black'}`}>
        ({index})
      </span>
      <motion.span
        className={`h-px w-12 origin-left ${line}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className={`text-caption ${muted}`}>{label}</span>
    </div>
  );
};
