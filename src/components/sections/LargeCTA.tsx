import { ArrowRight } from 'lucide-react';
import { FadeUp, SplitText, MagneticButton, SectionReveal } from '../motion';

export const LargeCTA = () => {
  return (
    <section className="bg-[#000000] py-32 lg:py-48 px-8 lg:px-16 text-center relative overflow-hidden flex flex-col items-center justify-center">
      <SectionReveal>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[40vw] text-[#13FF00] opacity-[0.03] font-[family-name:var(--font-display)] font-[900] leading-none select-none">
            X
          </span>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="flex flex-col items-center">
            <span className="text-display-lg lg:text-display-xl text-[#F7F7F7] uppercase leading-tight font-[family-name:var(--font-display)]">
              <SplitText text="GOT AN IDEA?" />
            </span>
            <span className="text-display-lg lg:text-display-xl uppercase leading-tight font-[family-name:var(--font-display)] flex whitespace-nowrap">
              <span className="text-[#F7F7F7] mr-4"><SplitText text="LET'S" /></span>
              <span className="text-[#13FF00]"><SplitText text="MOVE IT." /></span>
            </span>
          </h2>
          
          <div className="mt-12 lg:mt-16">
            <FadeUp delay={0.4}>
              <MagneticButton>
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-3 border-2 border-[#13FF00] text-[#13FF00] px-10 py-5 text-lg uppercase tracking-wider font-bold hover:bg-[#13FF00] hover:text-[#000000] transition-all duration-300"
                >
                  Start a project <ArrowRight size={20} />
                </a>
              </MagneticButton>
            </FadeUp>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
