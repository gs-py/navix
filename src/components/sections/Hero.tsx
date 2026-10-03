import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { ArrowRight, Play, ArrowDown } from 'lucide-react';
import { MagneticButton } from '../motion/MagneticButton';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Rotate based on scroll, translate based on mouse
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-50, 50]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-50, 50]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const lineVariants: Variants = {
    hidden: { y: '100%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        delay: i * 0.2 + 0.4, // Staggered delays starting from 0.4s
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black relative overflow-hidden pt-32 pb-16 px-8 lg:px-16 flex flex-col justify-between"
    >
      {/* Sparkle Star & Showreel Video Intro Button (Top Right) */}
      <div className="hidden lg:flex items-center gap-6 absolute top-32 right-16 z-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70 animate-pulse">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
        </svg>
        <a 
          href="#work"
          className="group flex items-center gap-4 bg-[#111111]/90 hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#13FF00]/40 rounded-full pl-3 pr-6 py-2.5 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-black border border-[#13FF00]/60 flex items-center justify-center text-[#13FF00] group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-[family-name:var(--font-body)] uppercase tracking-widest text-[#888888]">WATCH</span>
            <span className="block text-xs font-[family-name:var(--font-display)] uppercase tracking-wider text-white font-semibold group-hover:text-[#13FF00] transition-colors">
              SHOWREEL 2026
            </span>
          </div>
        </a>
      </div>

      {/* Giant Background X Motif */}
      <motion.div 
        className="absolute right-[-10vw] top-[50%] -translate-y-1/2 pointer-events-none select-none z-0"
        style={{
          x: translateX,
          y: translateY,
          rotate: rotateX,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <span className="font-[family-name:var(--font-display)] text-[45vw] text-[#13FF00] font-black leading-none block transform translate-y-[10%] drop-shadow-[0_0_100px_rgba(19,255,0,0.15)]">
          X
        </span>
      </motion.div>

      {/* Top Left: Subtitle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center z-10"
      >
        <span className="text-caption font-[family-name:var(--font-body)] text-grey-400 uppercase tracking-[0.15em] italic">
          Your Brand Growth, Our Obsession
        </span>
        <span className="w-16 h-px bg-grey-400 inline-block ml-4"></span>
      </motion.div>

      {/* Center: Massive Typography */}
      <div className="flex-1 flex flex-col justify-center z-10 mt-12 lg:mt-0">
        <div className="overflow-hidden py-1">
          <motion.h1 
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-display-xl text-white uppercase leading-[0.85] font-[family-name:var(--font-display)]"
          >
            WE BUILD
          </motion.h1>
        </div>
        <div className="overflow-hidden py-1">
          <motion.h1 
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-display-xl text-white uppercase leading-[0.85] font-[family-name:var(--font-display)]"
          >
            BRANDS THAT
          </motion.h1>
        </div>
        <div className="overflow-hidden py-1">
          <motion.h1 
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-display-xl text-[#13FF00] uppercase leading-[0.85] font-[family-name:var(--font-display)]"
          >
            MOVE<span className="text-white">.</span>
          </motion.h1>
        </div>

        {/* Tags Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-8 text-caption font-[family-name:var(--font-body)] text-grey-500 uppercase tracking-widest flex items-center space-x-4"
        >
          <span>Strategy</span>
          <span className="w-1 h-1 rounded-full bg-grey-700"></span>
          <span>Creative</span>
          <span className="w-1 h-1 rounded-full bg-grey-700"></span>
          <span>Digital</span>
          <span className="w-1 h-1 rounded-full bg-grey-700"></span>
          <span>Growth</span>
        </motion.div>
      </div>

      {/* Bottom Area: Description and CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end z-10 mt-12 lg:mt-0 pb-12 lg:pb-0">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-body-md text-grey-400 max-w-md font-[family-name:var(--font-body)] leading-relaxed"
        >
          As a modern creative and digital marketing agency, we focus on brand aesthetics and creation of unique digital experiences that will not only deliver results but that you will enjoy working with as well.
        </motion.p>
        
        <div className="flex justify-start lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <MagneticButton>
              <a href="#contact" className="group flex items-center space-x-3 text-lg lg:text-xl font-medium border-b-2 border-[#13FF00] pb-2 text-white hover:text-[#13FF00] transition-colors font-[family-name:var(--font-display)]">
                <span>Let's build something</span>
                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Pill-shaped Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-8 lg:left-16 z-10 hidden sm:block"
      >
        <a 
          href="#about" 
          aria-label="Scroll to About section"
          className="w-8 h-16 rounded-full border border-white/20 hover:border-[#13FF00] flex flex-col items-center justify-between py-2 transition-colors duration-300 group"
        >
          <motion.div 
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#13FF00]" 
          />
          <ArrowDown className="w-3.5 h-3.5 text-white/50 group-hover:text-[#13FF00] transition-colors" />
        </a>
      </motion.div>
    </section>
  );
};
