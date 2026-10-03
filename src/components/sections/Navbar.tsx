import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { NavixLogo } from '../common/NavixLogo';
import { MagneticButton } from '../motion/MagneticButton';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use siteConfig navigation or fallback if it's structured differently
  const links = siteConfig?.navigation || [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  const menuVariants = {
    closed: {
      clipPath: 'circle(0px at calc(100% - 64px) 44px)',
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 64px) 44px)',
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 20,
        restDelta: 2,
        opacity: { duration: 0.2 }
      }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }
    })
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-grey-800/50 py-4' : 'bg-transparent py-5 lg:py-8'
        } px-8 lg:px-16`}
      >
        <div className="flex items-center justify-between">
          <div className="z-[101]">
            <NavixLogo variant="light" size="md" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-[family-name:var(--font-body)] font-medium uppercase tracking-[0.1em] text-grey-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#13FF00] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <MagneticButton>
              <a href="#start" className="inline-block border border-[#13FF00] text-[#13FF00] px-6 py-3 text-sm uppercase tracking-wider hover:bg-[#13FF00] hover:text-black transition-all duration-300">
                Start a Project
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden z-[101] text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black z-[100] flex flex-col justify-center px-8 lg:px-16"
          >
            <div className="flex flex-col space-y-6">
              {links.map((link, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-display-md font-[family-name:var(--font-display)] text-white hover:text-[#13FF00] transition-colors relative group inline-block uppercase leading-tight"
                  >
                    {link.label}
                    <span className="absolute bottom-2 left-0 w-0 h-1 bg-[#13FF00] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-16 pt-8 border-t border-grey-800/50 flex flex-col space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a href={`mailto:${siteConfig.email}`} className="text-body-md font-[family-name:var(--font-body)] text-grey-400 hover:text-white transition-colors">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="text-body-md font-[family-name:var(--font-body)] text-grey-400 hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
              <div className="flex space-x-6 mt-4">
                {Object.entries(siteConfig.social).map(([label, href]) => (
                  <a key={label} href={href} className="text-sm font-[family-name:var(--font-body)] uppercase tracking-wider text-white hover:text-[#13FF00] transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
