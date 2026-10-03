import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharsIn, CircleButton, PageLines } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { EASE_OUT_EXPO } from '../../lib/intro';

const FAQS = [
  {
    q: 'Do we really need a creative marketing agency?',
    a: 'If your customers research online before they buy — and almost all of them do — then how your brand looks, sounds and shows up decides whether you’re found and chosen. We make that presence intentional, consistent and measurable.',
  },
  {
    q: 'Which channels are right for my business?',
    a: 'It depends entirely on where your audience spends time and how they decide. Our Map phase answers that with research, not guesswork, so budget goes to the platforms that actually move your numbers.',
  },
  {
    q: 'We already get referrals. Why invest in marketing?',
    a: 'Referrals prove you do great work, but they don’t scale on demand. Marketing turns that reputation into a predictable pipeline and protects you when word of mouth slows down.',
  },
  {
    q: 'What ROI should we expect, and how soon?',
    a: 'Paid performance can show results within weeks; brand, content and SEO compound over months. We agree targets up front and report on business outcomes — leads, sales, cost per acquisition — not vanity metrics.',
  },
  {
    q: 'What’s the difference between running ads and full-funnel marketing?',
    a: 'Ads invite people to the store. Full-funnel marketing designs the entire journey — awareness, consideration, conversion and loyalty — so every rupee spent at the top keeps paying off further down.',
  },
  {
    q: 'Why outsource instead of building an in-house team?',
    a: 'An in-house team means hiring strategists, designers, editors, media buyers and SEO specialists. With Navix you get the whole senior team from day one, for a fraction of the cost and with none of the ramp-up time.',
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#F7F7F7] text-black py-24 lg:py-40 overflow-hidden">
      <PageLines tone="light" />
      <div className="container-x relative grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="11" label="FAQ" tone="light" className="mb-8" />
            <h2 className="font-[family-name:var(--font-display)] font-black uppercase tracking-[-0.04em] text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85]">
              <CharsIn text="FAQ's" stagger={0.07} />
            </h2>
            <p className="mt-6 text-[#666666] max-w-xs leading-relaxed">Still curious? The fastest answer is a 20-minute call with the team.</p>
            <div className="mt-6 -ml-6">
              <CircleButton label="Ask us" href="#contact" tone="light" size={130} />
            </div>
          </div>
        </div>

        <ul className="lg:col-span-8 border-t border-black/15">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
                className="border-b border-black/15"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-6 py-7 text-left group"
                >
                  <span className="font-mono text-xs text-[#888888] pt-2 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`flex-1 font-[family-name:var(--font-display)] font-semibold text-xl lg:text-2xl leading-snug transition-colors ${isOpen ? 'text-black' : 'text-black/70 group-hover:text-black'}`}>
                    {item.q}
                  </span>
                  <span className={`relative w-10 h-10 shrink-0 rounded-full border transition-all duration-500 ${isOpen ? 'bg-black border-black rotate-180' : 'border-black/20 group-hover:border-black'}`}>
                    <span className={`absolute left-1/2 top-1/2 w-3.5 h-[1.5px] -translate-x-1/2 -translate-y-1/2 ${isOpen ? 'bg-[#13FF00]' : 'bg-black'}`} />
                    <span className={`absolute left-1/2 top-1/2 w-[1.5px] h-3.5 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${isOpen ? 'scale-y-0 bg-[#13FF00]' : 'bg-black'}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="pl-12 pr-16 pb-8 text-[#555555] leading-relaxed max-w-3xl">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
