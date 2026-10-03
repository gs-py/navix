import type { FC } from 'react';
import { FadeUp, AnimatedCounter } from '../motion';

export const Impact: FC = () => {
  const stats = [
    { target: 50, suffix: "+", label: "Brands Transformed" },
    { target: 120, suffix: "+", label: "Campaigns Launched" },
    { target: 10, suffix: "M+", label: "People Reached" },
    { target: 4.9, suffix: "/5", label: "Client Satisfaction", decimals: 1 },
  ];

  return (
    <section className="bg-[#000000] py-24 lg:py-40 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-caption text-[#888888] mb-16 uppercase tracking-wider">IMPACT</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <FadeUp key={index} delay={index * 0.1}>
              <div className="flex flex-col">
                <div className="w-8 h-0.5 bg-[#13FF00] mb-6" />
                <div className="text-display-md lg:text-display-lg text-[#F7F7F7] font-[family-name:var(--font-display)] font-bold flex items-baseline">
                  <AnimatedCounter 
                    target={stat.target} 
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-body-md text-[#888888] mt-4">
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
