import type { FC } from 'react';
import { FadeUp } from '../motion';
import { processSteps } from '../../data';

export const Process: FC = () => {
  return (
    <section className="bg-[#F7F7F7] text-[#000000] py-24 lg:py-40 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-40">
              <h2 className="text-caption text-[#888888] mb-4 uppercase tracking-wider">OUR PROCESS</h2>
              <div className="text-display-md text-[#000000] font-[family-name:var(--font-display)] leading-tight">
                <div>How we</div>
                <div>work</div>
              </div>
              <div className="w-px h-24 bg-[#13FF00] mt-8 hidden lg:block" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col mt-16 lg:mt-0">
            {processSteps.map((step, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <div className="border-t border-[#000000]/10 pt-10 pb-16">
                  <div className="text-[#13FF00] text-caption mb-4 font-medium">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-heading-lg text-[#000000] font-[family-name:var(--font-display)] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-body-lg text-[#666666] max-w-lg">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
