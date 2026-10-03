import { FadeUp } from '../motion';
import { ArrowRight } from 'lucide-react';

const TAGS = [
  "Strategy", "Branding", "Content", 
  "Digital Marketing", "Performance", "Web Experiences"
];

export function About() {
  return (
    <section id="about" className="bg-[#F7F7F7] text-[#000000] py-24 lg:py-40 px-8 lg:px-16 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Part 1 - Big Editorial Statement */}
        <div className="mb-24 lg:mb-36 flex flex-col items-start gap-2">
          <FadeUp delay={0.1}>
            <h2 className="text-display-md text-[#888888] font-[family-name:var(--font-display)] leading-none select-none">
              We're not here to
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-display-md text-[#000000] font-[family-name:var(--font-display)] leading-none">
              make brands look busy.
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <h2 className="text-display-md text-[#888888] font-[family-name:var(--font-display)] leading-none select-none">
              We're here to make them
            </h2>
          </FadeUp>
          <FadeUp delay={0.4}>
            <h2 className="text-display-md text-[#000000] font-[family-name:var(--font-display)] leading-none">
              impossible to ignore<span className="text-[#13FF00] font-black">.</span>
            </h2>
          </FadeUp>
        </div>

        {/* Part 2 - Split content with Editorial Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-20 lg:mt-32">
          
          {/* Left Column: Artistic Graphic Card */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.2}>
              <div className="relative aspect-[4/5] bg-black text-white p-8 lg:p-12 overflow-hidden flex flex-col justify-between shadow-2xl group">
                {/* Background decorative textures */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#13FF00]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#13FF00] font-mono font-bold">EST. 2026</span>
                    <span className="text-xs uppercase tracking-widest text-[#888888]">CRAFT × MOTION</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-[family-name:var(--font-display)] font-extrabold tracking-tight mt-6 uppercase leading-tight">
                    AN APPROACH THAT BRINGS DIFFERENCE
                  </h3>
                </div>

                {/* Center Abstract Monogram */}
                <div className="relative z-10 my-8 py-10 flex items-center justify-center">
                  <div className="relative">
                    <span className="text-8xl lg:text-9xl font-[family-name:var(--font-display)] font-black text-white/5 select-none block">
                      NAVIX
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-7xl lg:text-8xl font-black text-[#13FF00] drop-shadow-[0_0_30px_rgba(19,255,0,0.3)]">
                      ✕
                    </span>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#888888] font-mono uppercase tracking-wider">
                  <span>Strategy & Identity</span>
                  <span className="text-[#13FF00]">01 // DNA</span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Editorial Agency Description */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:pl-6">
            <FadeUp delay={0.3}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-black/30" />
                <h3 className="text-caption text-[#888888] uppercase tracking-widest font-mono">
                  ABOUT NAVIX
                </h3>
              </div>

              <h4 className="text-heading-lg text-[#000000] font-[family-name:var(--font-display)] font-bold leading-[1.08] uppercase mb-8">
                A CREATIVE MARKETING AGENCY TO ELEVATE YOUR BRAND
              </h4>

              <div className="pl-6 border-l-2 border-black/15 mb-10">
                <p className="text-body-lg text-[#444444] leading-relaxed">
                  Navix is a modern creative and digital marketing agency based in Bangalore that specializes in creative advertising and full-funnel marketing. We build distinctive brand campaigns that resonate with your target audience and drive measurable business impact.
                </p>
                <p className="text-body-md text-[#666666] leading-relaxed mt-4">
                  From brand positioning to high-performance acquisition, we turn complex challenges into clear, memorable digital experiences.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-12">
                {TAGS.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 border border-[#000000]/15 text-xs font-medium uppercase tracking-wider text-[#000000] hover:bg-[#000000] hover:text-[#F7F7F7] transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Circular Explore Us Button */}
              <div className="pt-2">
                <a 
                  href="#services" 
                  className="w-36 h-36 rounded-full border border-black/20 hover:border-black flex flex-col items-center justify-center gap-2 group transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-display)]">
                    Explore Us
                  </span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 group-hover:text-[#13FF00]" />
                </a>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
