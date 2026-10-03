import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { FadeUp, SectionReveal, MagneticButton } from '../motion';
import { siteConfig } from '../../data';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-transparent border-b border-[#2A2A2A] py-4 text-[#F7F7F7] placeholder:text-[#888888]/50 focus:border-[#13FF00] focus:outline-none transition-colors text-body-md";
  const labelClass = "text-caption text-[#888888] mb-2 block uppercase tracking-wider";

  return (
    <section id="contact" className="bg-[#000000] py-24 lg:py-40 px-8 lg:px-16">
      <SectionReveal>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div>
            <FadeUp>
              <p className="text-caption text-[#888888] mb-4 uppercase tracking-wider">GET IN TOUCH</p>
              <h2 className="text-display-md text-[#F7F7F7] font-[family-name:var(--font-display)] mb-8 lg:mb-12">
                Let's start<br />something great
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2} className="space-y-6">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 text-body-lg text-[#888888] hover:text-[#13FF00] transition-colors w-fit">
                <Mail size={24} />
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-4 text-body-lg text-[#888888] hover:text-[#13FF00] transition-colors w-fit">
                <Phone size={24} />
                {siteConfig.phone}
              </a>
              <div className="flex items-center gap-4 text-body-lg text-[#888888]">
                <MapPin size={24} className="flex-shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
            </FadeUp>
          </div>

          {/* Right Column - Form */}
          <FadeUp delay={0.3}>
            {submitted ? (
              <div className="bg-[#111111] border border-[#13FF00]/40 p-12 text-center rounded-none flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[#13FF00]/10 border border-[#13FF00] flex items-center justify-center text-[#13FF00] mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold text-white uppercase mb-3">
                  Message Received
                </h3>
                <p className="text-body-md text-[#888888] max-w-md mb-8">
                  Thank you for reaching out. A partner from Navix will review your project details and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-[#13FF00] border-b border-[#13FF00] pb-1 hover:text-white hover:border-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Your Company Ltd." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">
                  <div>
                    <label htmlFor="service" className={labelClass}>Service *</label>
                    <div className="relative">
                      <select id="service" name="service" required value={formData.service} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value="" disabled>Select a service</option>
                        <option value="brand-strategy">Brand Strategy</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="creative-production">Creative Production</option>
                        <option value="web-development">Web Development</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#888888]">
                        ▼
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClass}>Budget Range *</label>
                    <div className="relative">
                      <select id="budget" name="budget" required value={formData.budget} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value="" disabled>Select budget</option>
                        <option value="<1L">Under ₹1L</option>
                        <option value="1L-5L">₹1L - ₹5L</option>
                        <option value="5L-15L">₹5L - ₹15L</option>
                        <option value="15L-50L">₹15L - ₹50L</option>
                        <option value="50L+">₹50L+</option>
                        <option value="unsure">Not sure</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#888888]">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className={labelClass}>Message *</label>
                  <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
                </div>

                <div className="mt-12">
                  <MagneticButton>
                    <button type="submit" className="bg-[#13FF00] text-[#000000] px-10 py-5 font-[family-name:var(--font-display)] font-bold text-lg uppercase tracking-wider hover:bg-[#F7F7F7] transition-colors flex items-center gap-3">
                      Send Message <Send size={20} />
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </FadeUp>
        </div>
      </SectionReveal>
    </section>
  );
};
