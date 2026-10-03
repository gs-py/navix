import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp, SectionReveal } from '../motion';

const philosophyItems = [
  {
    title: "Strategy Before Noise",
    content: "We don't start with tactics. We start with understanding — your market, your audience, your real competitive advantage."
  },
  {
    title: "Creativity With Purpose",
    content: "Every creative decision serves a strategic goal. Beautiful work that doesn't perform isn't beautiful to us."
  },
  {
    title: "Culture-First Thinking",
    content: "We build brands that tap into culture, not just trends. Trends fade. Cultural relevance compounds."
  },
  {
    title: "Measurable Outcomes",
    content: "We're allergic to vanity metrics. Every campaign is measured against real business outcomes."
  },
  {
    title: "Long-Term Partnerships",
    content: "We don't do one-off projects. We build relationships that grow your brand over years, not weeks."
  }
];

export const WhyNavix = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#000000] py-24 lg:py-40 px-8 lg:px-16 relative overflow-hidden">
      <SectionReveal>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <h2 className="mb-16 lg:mb-24">
              <span className="text-display-lg text-[#F7F7F7] uppercase block">WHY</span>
              <span className="text-display-lg text-[#F7F7F7] uppercase block">
                NAVIX<span className="text-[#13FF00]">?</span>
              </span>
            </h2>
          </FadeUp>

          <div className="w-full">
            {philosophyItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border-t border-[#2A2A2A] relative ${index === philosophyItems.length - 1 ? 'border-b' : ''}`}
                >
                  <div 
                    className="py-8 flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleItem(index)}
                  >
                    <h3 className="text-heading-md text-[#F7F7F7] font-[family-name:var(--font-display)] relative z-10">
                      {item.title}
                    </h3>
                    <div className={`text-[#13FF00] text-2xl transition-transform duration-300 relative z-10 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-body-lg text-[#888888] max-w-2xl pb-8 relative z-10">
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="text-[15vw] font-[family-name:var(--font-display)] font-[900] text-[#F7F7F7]/[0.02] absolute right-0 top-0 pointer-events-none select-none leading-none z-0">
                    0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
