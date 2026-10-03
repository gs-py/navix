import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CharsIn, MagneticButton, PageLines, WordsIn } from '../motion';
import { SectionLabel } from '../graphics/SectionLabel';
import { siteConfig } from '../../data';
import { EASE_OUT_EXPO } from '../../lib/intro';

const SERVICES = ['Branding', 'Social Media', 'Performance', 'Content & UGC', 'Website', 'SEO'];
const BUDGETS = ['Under ₹1L', '₹1L – ₹5L', '₹5L – ₹15L', '₹15L+', 'Not sure yet'];

const Chip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
      selected ? 'bg-[#13FF00] border-[#13FF00] text-black font-semibold' : 'border-white/15 text-[#AAAAAA] hover:border-white/40 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const Field = ({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-white/15 pt-6 pb-3 text-lg text-[#F7F7F7] focus:outline-none focus:border-[#13FF00] transition-colors"
      {...props}
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-6 text-[#888888] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#13FF00] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
    >
      {label}
    </label>
  </div>
);

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleService = (s: string) => setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactLinks = [
    { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
    { label: 'Studio', value: siteConfig.location, href: undefined },
  ];

  return (
    <section id="contact" className="relative bg-black text-[#F7F7F7] py-24 lg:py-40 overflow-hidden">
      <PageLines />
      <div className="container-x relative grid lg:grid-cols-12 gap-16 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionLabel index="10" label="Contact" className="mb-8" />
          <h2 className="font-[family-name:var(--font-display)] font-black uppercase tracking-[-0.04em] text-[clamp(3rem,7vw,6.5rem)] leading-[0.86]">
            <CharsIn text="Let's get" className="block" stagger={0.05} />
            <span className="block">
              <CharsIn text="in touch" stagger={0.05} delay={0.2} />
              <span className="text-[#13FF00]">.</span>
            </span>
          </h2>
          <WordsIn
            className="mt-8 text-[#888888] leading-relaxed max-w-md"
            text="You're a progressive leader who wants to grow your organisation and realise its full potential. If you're open to new ideas, you're exactly who we've been looking for."
          />

          <ul className="mt-12 border-t border-white/10">
            {contactLinks.map((item) => (
              <li key={item.label} className="border-b border-white/10">
                {item.href ? (
                  <a href={item.href} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="block text-xs uppercase tracking-[0.15em] text-[#666666]">{item.label}</span>
                      <span className="block mt-1 text-lg group-hover:text-[#13FF00] transition-colors">{item.value}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-[#666666] group-hover:text-[#13FF00] group-hover:rotate-45 transition-all duration-500" />
                  </a>
                ) : (
                  <div className="py-5">
                    <span className="block text-xs uppercase tracking-[0.15em] text-[#666666]">{item.label}</span>
                    <span className="block mt-1 text-lg">{item.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="relative bg-[#0A0A0A] border border-white/10 p-7 md:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="min-h-[520px] flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-[#13FF00] text-black flex items-center justify-center mb-8"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-3xl uppercase">Message received</h3>
                  <p className="mt-4 text-[#888888] max-w-sm">
                    Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. A partner from Navix will review your project and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-xs uppercase tracking-[0.2em] text-[#13FF00] border-b border-[#13FF00] pb-1 hover:text-white hover:border-white transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                    <Field id="name" label="Your name *" required value={form.name} onChange={handleChange} autoComplete="name" />
                    <Field id="email" label="Email *" type="email" required value={form.email} onChange={handleChange} autoComplete="email" />
                    <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />
                    <Field id="company" label="Company" value={form.company} onChange={handleChange} autoComplete="organization" />
                  </div>

                  <fieldset>
                    <legend className="text-xs uppercase tracking-[0.15em] text-[#666666] mb-4">I'm interested in</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {SERVICES.map((s) => (
                        <Chip key={s} label={s} selected={services.includes(s)} onClick={() => toggleService(s)} />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-xs uppercase tracking-[0.15em] text-[#666666] mb-4">Budget</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {BUDGETS.map((b) => (
                        <Chip key={b} label={b} selected={budget === b} onClick={() => setBudget(b)} />
                      ))}
                    </div>
                  </fieldset>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder=" "
                      value={form.message}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-white/15 pt-6 pb-3 text-lg text-[#F7F7F7] focus:outline-none focus:border-[#13FF00] transition-colors resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-6 text-[#888888] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#13FF00] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Tell us about your project *
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <p className="text-xs text-[#666666] max-w-xs">For business enquiries only. We reply within one working day.</p>
                    <MagneticButton className="group rounded-full bg-[#13FF00] text-black pl-7 pr-2 py-2 font-[family-name:var(--font-display)] font-bold uppercase tracking-wider hover:bg-[#F7F7F7] transition-colors">
                      Send message
                      <span className="w-11 h-11 rounded-full bg-black text-[#13FF00] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
