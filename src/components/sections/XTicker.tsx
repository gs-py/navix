import { Fragment } from 'react';
import { Marquee } from '../motion';
import { Sparkle } from '../graphics/Sparkle';

const PRIMARY = ['Brand Strategy', 'Identity', 'Content Creation', 'UGC & Influencers', 'Social Media', 'Performance', 'SEO', 'Web Experiences'];
const SECONDARY = ['Ideas', 'Culture', 'Growth', 'Design', 'Motion', 'Impact', 'Stories', 'Craft'];

const Row = ({ items, className }: { items: string[]; className: string }) => (
  <div className="flex items-center shrink-0">
    {items.map((item) => (
      <Fragment key={item}>
        <span className={`px-6 lg:px-10 whitespace-nowrap font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl ${className}`}>
          {item}
        </span>
        <Sparkle size={22} className={className} />
      </Fragment>
    ))}
  </div>
);

/** Two counter-scrolling bands crossed into an X — the Navix mark as a moving divider. */
export const XTicker = () => (
  <section aria-label="What we do" className="relative bg-black py-20 lg:py-28 overflow-hidden">
    <div className="relative h-[200px] lg:h-[260px]">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[5deg] bg-[#111111] border-y border-white/10 py-4 lg:py-5">
        <Marquee speed={40} direction="right">
          <Row items={SECONDARY} className="text-[#F7F7F7]/35" />
        </Marquee>
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[4deg] bg-[#13FF00] py-4 lg:py-5 shadow-[0_20px_60px_-20px_rgba(19,255,0,0.45)]">
        <Marquee speed={35}>
          <Row items={PRIMARY} className="text-black" />
        </Marquee>
      </div>
    </div>
  </section>
);
