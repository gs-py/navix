import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data';

export const Testimonials: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-[#F7F7F7] text-[#000000] py-24 lg:py-40 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-caption text-[#888888] mb-16 uppercase tracking-wider">TESTIMONIALS</h2>

        <div className="relative min-h-[400px]">
          <div className="absolute -top-8 -left-4 text-[8rem] text-[#13FF00] opacity-30 font-serif leading-none select-none">
            "
          </div>
          
          <AnimatePresence mode="wait">
            {testimonials.length > 0 && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <blockquote className="text-heading-lg lg:text-display-md text-[#000000] font-[family-name:var(--font-display)] max-w-4xl">
                  {testimonials[activeIndex].quote}
                </blockquote>
                
                <div className="mt-8">
                  <div className="text-body-lg text-[#000000] font-semibold">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-body-md text-[#888888]">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 mt-12">
          <button 
            onClick={handlePrev}
            className="border border-[#000000]/20 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#000000] hover:text-[#F7F7F7] transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="border border-[#000000]/20 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#000000] hover:text-[#F7F7F7] transition-colors duration-300"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};
