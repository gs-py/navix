import { useRef, type FC } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MotionInterlude: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

  return (
    <section 
      ref={containerRef}
      className="bg-[#000000] min-h-[60vh] lg:min-h-screen overflow-hidden flex items-center relative"
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-4">
        <div className="absolute w-full h-px top-[20%] border-t border-[#2A2A2A]/30" />
        <div className="absolute w-full h-px top-[80%] border-t border-[#2A2A2A]/30" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[30vw] text-[#13FF00] opacity-[0.03] font-[family-name:var(--font-display)] font-[900] leading-none">
            X
          </span>
        </div>

        <motion.div 
          style={{ x: x1 }}
          className="text-[8vw] lg:text-[6vw] font-[family-name:var(--font-display)] font-[900] uppercase whitespace-nowrap text-[#F7F7F7]/10"
        >
          NAVIX <span className="text-[#13FF00]/20">×</span> IDEAS <span className="text-[#13FF00]/20">×</span> CULTURE <span className="text-[#13FF00]/20">×</span> GROWTH <span className="text-[#13FF00]/20">×</span> DESIGN <span className="text-[#13FF00]/20">×</span> NAVIX <span className="text-[#13FF00]/20">×</span> IDEAS <span className="text-[#13FF00]/20">×</span> CULTURE <span className="text-[#13FF00]/20">×</span> GROWTH <span className="text-[#13FF00]/20">×</span> DESIGN <span className="text-[#13FF00]/20">×</span>
        </motion.div>
        
        <motion.div 
          style={{ x: x2 }}
          className="text-[8vw] lg:text-[6vw] font-[family-name:var(--font-display)] font-[900] uppercase whitespace-nowrap text-[#F7F7F7]/5 -ml-[5%]"
        >
          STRATEGY <span className="text-[#13FF00]/20">×</span> BRANDS <span className="text-[#13FF00]/20">×</span> DIGITAL <span className="text-[#13FF00]/20">×</span> CREATIVE <span className="text-[#13FF00]/20">×</span> IMPACT <span className="text-[#13FF00]/20">×</span> STRATEGY <span className="text-[#13FF00]/20">×</span> BRANDS <span className="text-[#13FF00]/20">×</span> DIGITAL <span className="text-[#13FF00]/20">×</span> CREATIVE <span className="text-[#13FF00]/20">×</span> IMPACT <span className="text-[#13FF00]/20">×</span>
        </motion.div>
      </div>
    </section>
  );
};
