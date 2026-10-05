import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { NavixLogo } from '../common/NavixLogo';
import { getLenis } from '../../hooks';
import { INTRO_DELAY, EASE_OUT_EXPO } from '../../lib/intro';

/** Text that rolls up to a duplicate of itself on hover. */
const RollText = ({ children }: { children: string }) => (
  <span className="relative inline-flex overflow-hidden">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
      {children}
    </span>
    <span
      aria-hidden="true"
      className="absolute inset-0 translate-y-full text-[#13FF00] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
    >
      {children}
    </span>
  </span>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(y > 40);
    setIsHidden(y > 400 && y > previous && !isMenuOpen);
  });

  useEffect(() => {
    const lenis = getLenis();
    if (isMenuOpen) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const links = siteConfig.navigation;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: isHidden || isScrolled ? 0 : INTRO_DELAY - 0.2 }}
        className={`fixed top-0 inset-x-0 z-[120] transition-[background-color,border-color,padding] duration-500 border-b ${
          isScrolled && !isMenuOpen ? 'bg-black/70 backdrop-blur-xl border-white/[0.06] py-3' : 'bg-transparent border-transparent py-5 lg:py-7'
        }`}
      >
        <nav className="container-x flex items-center justify-between" aria-label="Primary">
          <a href="/#top" aria-label="Navix home" onClick={() => setIsMenuOpen(false)}>
            <NavixLogo variant="light" size="md" />
          </a>

          <ul className="hidden lg:flex items-center gap-12 xl:gap-16">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="group text-[15px] font-medium text-[#F7F7F7]">
                  <RollText>{link.label}</RollText>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a
              href="/#contact"
              className="group hidden md:inline-flex items-center gap-2 rounded-full bg-[#13FF00] text-black pl-5 pr-2 py-2 text-sm font-semibold font-[family-name:var(--font-display)] transition-colors hover:bg-[#F7F7F7]"
            >
              Let's talk
              <span className="w-7 h-7 rounded-full bg-black text-[#13FF00] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </a>
            <span className="hidden md:block w-px h-6 bg-white/30" />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              className="w-11 h-11 rounded-full flex flex-col items-end justify-center gap-[6px] pr-2.5 text-white"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <span className={`block h-[2px] bg-current transition-all duration-500 ${isMenuOpen ? 'w-6 translate-y-[4px] rotate-45' : 'w-6'}`} />
              <span className={`block h-[2px] bg-current transition-all duration-500 ${isMenuOpen ? 'w-6 -translate-y-[4px] -rotate-45' : 'w-4'}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[110] bg-black overflow-hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 48px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 48px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 60px) 48px)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            {/* Decorative green ribbon */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="absolute -right-40 -bottom-40 w-[60vh] h-[60vh] text-[#13FF00] opacity-90"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 }}
            >
              <motion.path
                d="M620 120 H420 C370 120 340 135 310 170 L40 620"
                fill="none"
                stroke="currentColor"
                strokeWidth="80"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.35 }}
              />
            </motion.svg>

            <div className="container-x relative h-full flex flex-col justify-center pt-24 pb-10">
              <div className="grid lg:grid-cols-12 gap-12">
                <ul className="lg:col-span-8 flex flex-col gap-1">
                  {links.map((link, i) => (
                    <li key={link.href} className="overflow-hidden">
                      <motion.a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-baseline gap-5 py-1"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '110%' }}
                        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.25 + i * 0.07 }}
                      >
                        <span className="font-mono text-xs text-[#13FF00]">0{i + 1}</span>
                        <span className="text-[13vw] sm:text-[10vw] lg:text-[6.5vw] font-[family-name:var(--font-display)] font-extrabold uppercase leading-[0.95] tracking-tight text-[#F7F7F7] transition-[color,transform] duration-500 group-hover:text-[#13FF00] group-hover:translate-x-4">
                          {link.label}
                        </span>
                      </motion.a>
                    </li>
                  ))}
                </ul>

                <motion.div
                  className="lg:col-span-4 flex flex-col justify-end gap-8 text-[#888888]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div>
                    <p className="text-caption mb-3">Get in touch</p>
                    <a href={`mailto:${siteConfig.email}`} className="block text-xl text-[#F7F7F7] hover:text-[#13FF00] transition-colors">
                      {siteConfig.email}
                    </a>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="block text-xl text-[#F7F7F7] hover:text-[#13FF00] transition-colors mt-1">
                      {siteConfig.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-caption mb-3">Studio</p>
                    <p className="text-[#F7F7F7]">{siteConfig.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {Object.entries(siteConfig.social).map(([label, href]) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wider text-[#F7F7F7] hover:text-[#13FF00] transition-colors">
                        {label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
