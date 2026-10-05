import { motion } from 'framer-motion';
import { FlipLines, PageLines } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { EASE_OUT_EXPO } from '../../lib/intro';

/* Placeholder client marks set in type until real logo files are supplied. */
const CLIENTS: { name: string; className: string; mark?: string }[] = [
  { name: 'Bags on Packs', className: 'font-[family-name:var(--font-display)] font-bold uppercase tracking-[0.12em] text-xl' },
  { name: 'Interior World', className: 'font-serif text-3xl tracking-tight' },
  { name: 'Fabric Affair', className: 'font-serif italic text-3xl' },
  { name: 'Phottam AI', className: 'font-[family-name:var(--font-display)] font-extrabold text-2xl', mark: '●' },
  { name: 'EZKA', className: 'font-[family-name:var(--font-display)] font-black tracking-[0.35em] text-2xl' },
  { name: 'BRANDLAB 7', className: 'font-mono font-bold text-xl tracking-[0.15em]' },
];

/** "Partners in growth" — a logo wall whose cells flood green on hover. */
export function ClientMarquee() {
  return (
    <section aria-labelledby="clients-title" className="relative bg-black py-24 lg:py-36 overflow-hidden">
      <PageLines />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <SectionLabel index="05" label="Partners in growth" className="mb-8" />
            <h2 id="clients-title" className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92] text-[#F7F7F7]">
              <FlipLines lines={['Brands that chose', <>to move with us<span className="text-[#13FF00]">.</span></>]} />
            </h2>
          </div>
          <p className="lg:col-span-4 text-[#888888] leading-relaxed">
            From growing D2C labels to AI startups, across bags, interiors, fashion, tech and creative brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-white/10">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.12 }}
              className="group relative h-28 md:h-36 lg:h-40 border-r border-b border-white/10 flex items-center justify-center overflow-hidden cursor-default"
            >
              <span className="absolute inset-0 bg-[#13FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className={`relative flex items-center gap-2 text-[#F7F7F7]/45 group-hover:text-black transition-colors duration-300 ${client.className}`}>
                {client.mark && <span className="text-[0.7em]">{client.mark}</span>}
                {client.name}
              </span>
              <span className="absolute top-3 left-3 font-mono text-[10px] text-white/20 group-hover:text-black/50 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
