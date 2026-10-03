import { Fragment } from 'react';
import { Marquee } from '../motion';

const BRANDS = ["ACME", "VERTEX", "NOMAD", "ATLAS", "FORGE", "EMBER", "ONYX", "APEX"];

export function ClientMarquee() {
  return (
    <section className="bg-[#000000] py-16 lg:py-24 border-y border-[#2A2A2A]">
      <div className="container mx-auto px-8 lg:px-16">
        <h2 className="text-caption text-[#888888] text-center mb-12 uppercase tracking-widest">
          Trusted by brands that move forward
        </h2>
      </div>
      
      <div className="w-full overflow-hidden flex">
        <Marquee>
          <div className="flex items-center">
            {BRANDS.map((brand, i) => (
              <Fragment key={i}>
                <div className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-bold text-[#888888]/30 mx-8 lg:mx-16 uppercase tracking-wider select-none hover:text-[#888888]/60 transition-colors duration-300">
                  {brand}
                </div>
                <div className="text-[#13FF00]/30 text-2xl lg:text-3xl font-[family-name:var(--font-display)] select-none">
                  ×
                </div>
              </Fragment>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
