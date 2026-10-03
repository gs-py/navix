import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { NavixLogo } from '../common';
import { siteConfig } from '../../data';
import { getLenis } from '../../hooks';
import { EASE_OUT_EXPO } from '../../lib/intro';

const WORDMARK = ['N', 'A', 'V', 'I', 'X'];
const YEAR = new Date().getFullYear();

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="relative bg-black text-[#F7F7F7] pt-24 lg:pt-32 pb-8 overflow-hidden border-t border-white/10">
      <div className="container-x">
        {/* Top call */}
        <div className="grid lg:grid-cols-12 gap-10 pb-16 lg:pb-24 border-b border-white/10">
          <div className="lg:col-span-7">
            <p className="text-caption text-[#888888]">Have a project in mind?</p>
            <a href="#contact" className="group mt-5 inline-flex items-center gap-5">
              <span className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] group-hover:text-[#13FF00] transition-colors">
                Don't wait. Take a call<span className="text-[#13FF00]">!</span>
              </span>
              <span className="hidden sm:flex w-16 h-16 shrink-0 rounded-full bg-[#13FF00] text-black items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={26} />
              </span>
            </a>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="font-[family-name:var(--font-display)] font-semibold text-xl">What's moving this week</p>
            <p className="text-sm text-[#888888] mt-2">A short weekly newsletter on brand, content and growth. No spam.</p>
            {subscribed ? (
              <p className="mt-6 text-[#13FF00]">You're on the list — see you in your inbox.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex items-center border-b border-white/20 focus-within:border-[#13FF00] transition-colors">
                <label htmlFor="newsletter" className="sr-only">Email address</label>
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-transparent py-4 text-lg placeholder:text-[#555555] focus:outline-none"
                />
                <button type="submit" className="text-sm font-semibold uppercase tracking-wider text-[#13FF00] hover:text-white transition-colors">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          <div className="col-span-2 md:col-span-1">
            <NavixLogo size="lg" />
            <p className="text-sm text-[#888888] mt-5 max-w-xs leading-relaxed">A creative and digital marketing agency building brands that move.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#666666] mb-5">Explore</p>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-[#13FF00] transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#666666] mb-5">Social</p>
            <ul className="space-y-3">
              {Object.entries(siteConfig.social).map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-[#13FF00] transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-[0.15em] text-[#666666] mb-5">Contact</p>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-[#13FF00] transition-colors">{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="block mt-3 hover:text-[#13FF00] transition-colors">{siteConfig.phone}</a>
            <p className="mt-3 text-[#888888]">{siteConfig.location}</p>
          </div>
        </div>

        {/* Giant wordmark: letters rise in one after another */}
        <div aria-hidden="true" className="flex justify-between font-[family-name:var(--font-display)] font-black uppercase leading-[0.78] tracking-[-0.04em] text-[21vw] select-none overflow-hidden">
          {WORDMARK.map((letter, i) => (
            <motion.span
              key={letter}
              className={letter === 'X' ? 'text-[#13FF00]' : 'text-[#F7F7F7]/[0.08]'}
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <div className="border-t border-white/10 mt-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#666666]">
          <p>© {YEAR} Navix. All rights reserved.</p>
          <button type="button" onClick={scrollToTop} className="group inline-flex items-center gap-3 uppercase tracking-[0.15em] text-xs hover:text-[#13FF00] transition-colors">
            Back to top
            <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#13FF00] group-hover:-translate-y-1 transition-all">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
