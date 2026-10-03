import { NavixLogo } from '../common';
import { siteConfig } from '../../data';
import { FadeUp, SectionReveal } from '../motion';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-[#2A2A2A] pt-24 lg:pt-40 pb-8 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            
            {/* Column 1 */}
            <FadeUp>
              <div>
                <NavixLogo variant="light" size="lg" />
                <p className="text-body-md text-[#888888] mt-6 max-w-sm">
                  A modern creative and digital marketing agency building brands that move.
                </p>
              </div>
            </FadeUp>

            {/* Column 2 */}
            <FadeUp delay={0.1}>
              <div>
                <h4 className="text-caption text-[#888888] mb-6 uppercase tracking-wider">NAVIGATION</h4>
                <ul className="space-y-3">
                  {siteConfig.navigation.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-body-lg text-[#F7F7F7] hover:text-[#13FF00] transition-colors inline-block">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Column 3 */}
            <FadeUp delay={0.2}>
              <div>
                <h4 className="text-caption text-[#888888] mb-6 uppercase tracking-wider">CONNECT</h4>
                <a href={`mailto:${siteConfig.email}`} className="text-body-lg text-[#F7F7F7] hover:text-[#13FF00] transition-colors block mb-3">
                  {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone}`} className="text-body-lg text-[#F7F7F7] hover:text-[#13FF00] transition-colors block mb-3">
                  {siteConfig.phone}
                </a>
                <p className="text-body-md text-[#888888] mt-6 max-w-[250px]">
                  {siteConfig.location}
                </p>
                
                <div className="flex gap-4 mt-8">
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-[#13FF00] hover:text-[#13FF00] transition-all rounded-sm" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-[#13FF00] hover:text-[#13FF00] transition-all rounded-sm" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </SectionReveal>

        {/* Giant wordmark */}
        <SectionReveal>
          <FadeUp delay={0.3}>
            <div className="w-full overflow-hidden text-center select-none cursor-default mb-16 lg:mb-0">
              <h1 className="text-[20vw] lg:text-[15vw] font-[family-name:var(--font-display)] font-[900] uppercase leading-none tracking-tighter">
                <span className="text-[#F7F7F7]/5">NAVI</span>
                <span className="text-[#13FF00]/10">X</span>
              </h1>
            </div>
          </FadeUp>
        </SectionReveal>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2A2A] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-md text-[#888888]">
            © Navix 2026. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="text-caption text-[#888888] hover:text-[#13FF00] transition-colors cursor-pointer uppercase tracking-wider"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
