import { ArrowUpRight } from 'lucide-react';
import { FadeUp, SectionReveal } from '../motion';
import { insights } from '../../data';

export const Insights = () => {
  return (
    <section id="insights" className="bg-[#F7F7F7] text-[#000000] py-24 lg:py-40 px-8 lg:px-16">
      <SectionReveal>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <p className="text-caption text-[#888888] mb-4 uppercase tracking-wider">INSIGHTS</p>
                <h2 className="text-display-md text-[#000000] font-[family-name:var(--font-display)]">Latest Thinking</h2>
              </div>
              <a href="#insights" className="text-body-md text-[#000000] border-b border-[#000000] pb-1 hover:border-[#13FF00] hover:text-[#13FF00] transition-colors inline-block">
                View all →
              </a>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.slice(0, 3).map((post, index) => (
              <FadeUp key={post.id} delay={index * 0.1} className={index === 0 ? "lg:col-span-2" : ""}>
                <div className="group cursor-pointer h-full">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#E0E0E0] to-[#AAAAAA] overflow-hidden mb-6 relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:scale-105 transition-transform duration-500 ease-out" />
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-caption text-[#13FF00] mb-2 uppercase tracking-wider">{post.category}</span>
                    <h3 className="text-heading-sm text-[#000000] font-[family-name:var(--font-display)] group-hover:text-[#13FF00] transition-colors mb-2 flex items-start justify-between">
                      <span className="pr-4">{post.title}</span>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </h3>
                    <span className="text-body-md text-[#888888]">{post.date}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
