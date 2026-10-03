import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp } from '../motion';
import { services, type Service } from '../../data';
import { useIsMobile } from '../../hooks';

export function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleToggle = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="services" className="bg-[#000000] py-24 lg:py-40 px-8 lg:px-16 text-[#F7F7F7]">
      <div className="container mx-auto max-w-7xl">
        <FadeUp>
          <h3 className="text-caption text-[#888888] mb-4 uppercase tracking-widest">WHAT WE DO</h3>
          <h2 className="text-display-lg font-[family-name:var(--font-display)] mb-16 lg:mb-24">Services</h2>
        </FadeUp>

        <div className="flex flex-col">
          {services.map((service: Service, index: number) => {
            const isExpanded = expandedIndex === index;
            const itemIndex = String(index + 1).padStart(2, '0');
            const isLast = index === services.length - 1;
            
            return (
              <FadeUp key={index} delay={index * 0.1}>
                <div 
                  className={`group py-8 lg:py-10 border-t border-[#2A2A2A] ${isLast ? 'border-b' : ''} cursor-pointer transition-colors duration-300`}
                  onMouseEnter={() => !isMobile && setExpandedIndex(index)}
                  onMouseLeave={() => !isMobile && setExpandedIndex(null)}
                  onClick={() => isMobile && handleToggle(index)}
                >
                  <div className="grid grid-cols-12 items-start gap-4">
                    {/* Index */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-2">
                      <span className="text-caption text-[#13FF00] font-mono pt-1 block">{itemIndex}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="col-span-8 md:col-span-9 lg:col-span-9 flex flex-col">
                      <h3 className={`text-heading-md lg:text-heading-lg font-[family-name:var(--font-display)] transition-colors duration-300 ${isExpanded ? 'text-[#13FF00]' : 'text-[#F7F7F7]'}`}>
                        {service.title}
                      </h3>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-body-md text-[#888888] mt-4 lg:mt-6 max-w-2xl leading-relaxed">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Icon */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1 flex justify-end">
                      <ArrowUpRight 
                        size={32} 
                        strokeWidth={1.5}
                        className={`transition-all duration-500 ease-out ${isExpanded ? 'text-[#13FF00] rotate-45' : 'text-[#888888]'}`} 
                      />
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
