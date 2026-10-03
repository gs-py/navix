import type { FC } from 'react';
import { FadeUp } from '../motion';
import { useCursor } from '../common';
import { projects } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export const SelectedWork: FC = () => {
  const { setCursorVariant } = useCursor();
  const displayedProjects = projects.slice(0, 4);

  return (
    <section id="work" className="bg-[#000000] py-24 lg:py-40 px-8 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-caption text-[#888888] mb-4 block uppercase font-mono tracking-widest">
              // CASE STUDIES
            </span>
            <div className="text-display-lg text-[#F7F7F7] uppercase font-[family-name:var(--font-display)] leading-none">
              <div>SELECTED</div>
              <div className="text-white">WORK<span className="text-[#13FF00]">.</span></div>
            </div>
          </div>
          <p className="text-body-md text-[#888888] max-w-sm">
            A curated selection of brands we've helped scale through bold creative and disciplined strategy.
          </p>
        </div>

        <div className="flex flex-col gap-20 lg:gap-32">
          {displayedProjects.map((project, index) => {
            const layout = project.layout || 'landscape';
            
            let containerClass = "w-full";
            let wrapperClass = "relative overflow-hidden w-full border border-white/10 group-hover:border-[#13FF00]/40 transition-colors duration-500";
            let flexClass = "group flex flex-col cursor-pointer";
            
            if (layout === 'landscape') {
              wrapperClass += " aspect-video";
            } else if (layout === 'portrait') {
              flexClass = "group grid grid-cols-12 gap-8 cursor-pointer";
              containerClass = "col-span-12 lg:col-span-6 lg:col-start-7";
              wrapperClass += " aspect-[4/5]";
            } else if (layout === 'full') {
              wrapperClass += " aspect-[21/9]";
            } else if (layout === 'split') {
              flexClass = "group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center cursor-pointer";
              wrapperClass += " aspect-[4/3] lg:aspect-square";
            }
            
            return (
              <FadeUp key={project.id || index} delay={0.1}>
                <div 
                  className={flexClass}
                  onMouseEnter={() => setCursorVariant('project')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className={containerClass}>
                    <div className={wrapperClass}>
                      {/* Project Artistic Visual Background */}
                      <div 
                        className="w-full h-full p-8 lg:p-12 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03] relative overflow-hidden"
                        style={{ 
                          background: project.color 
                            ? `radial-gradient(circle at 80% 20%, ${project.color} 0%, #080808 70%)` 
                            : 'radial-gradient(circle at 80% 20%, #1a1a2e 0%, #080808 70%)' 
                        }}
                      >
                        {/* Background Subtle Grid Texture */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

                        {/* Top Metadata in Card */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-widest text-[#13FF00] bg-black/60 backdrop-blur-md px-3 py-1 border border-[#13FF00]/20 rounded-full">
                            {project.industry}
                          </span>
                          <span className="text-xs font-mono text-[#888888]">
                            // {project.year}
                          </span>
                        </div>

                        {/* Center Large Brand Typographic Watermark */}
                        <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center">
                          <span className="text-5xl lg:text-7xl font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tighter text-white/10 group-hover:text-white/20 transition-colors select-none">
                            {project.client}
                          </span>
                          <span className="text-xs font-mono uppercase tracking-widest text-[#13FF00]/70 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            View Case Study ↗
                          </span>
                        </div>

                        {/* Bottom Tagline */}
                        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-[#888888]">
                          <span>0{index + 1} // NAVIX CASE STUDY</span>
                          <span className="group-hover:text-[#13FF00] transition-colors">EXPLORE</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Info Below Image */}
                    <div className="mt-6 transition-transform duration-500 group-hover:translate-x-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-caption text-[#13FF00] uppercase tracking-wider font-mono">
                            {project.client}
                          </span>
                          <h3 className="text-heading-md text-[#F7F7F7] font-[family-name:var(--font-display)] font-bold mt-1 group-hover:text-[#13FF00] transition-colors">
                            {project.title}
                          </h3>
                          <div className="text-body-md text-[#888888] mt-2">
                            {project.industry} • {project.year}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-[#13FF00] group-hover:bg-[#13FF00] group-hover:text-black transition-all duration-300 shrink-0">
                          <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.services?.map((service: string, sIndex: number) => (
                          <span key={sIndex} className="text-xs font-mono uppercase tracking-wider text-[#888888] border border-[#2A2A2A] px-2.5 py-1 rounded-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <div className="mt-28 flex justify-center">
          <a 
            href="#contact" 
            className="group px-8 py-4 border border-[#13FF00] text-[#13FF00] hover:bg-[#13FF00] hover:text-black font-[family-name:var(--font-display)] text-sm uppercase tracking-widest font-semibold transition-all duration-300 inline-flex items-center gap-3"
          >
            <span>Have a project in mind?</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
