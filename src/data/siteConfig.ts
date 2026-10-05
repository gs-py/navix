export const siteConfig = {
  name: 'Navix',
  tagline: 'We build brands that move.',
  description: 'Navix is a modern creative and digital marketing agency. Strategy, branding, content, and performance marketing that makes brands impossible to ignore.',
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://navix.agency',
  email: 'navixhere@gmail.com',
  phone: '+91 75102 68128',
  location: 'Kerala, India',
  social: {
    instagram: 'https://www.instagram.com/navix.in',
    linkedin: 'https://linkedin.com/company/navix',
  },
  founder: {
    name: 'Abel James',
    role: 'Founder, Navix',
    /** Finished 4:5 founder card (frame, name and logo are baked into the artwork). */
    image: '/founder.png',
    linkedin: '',
  },
  /** Showreel video URL (mp4 / YouTube embed). Leave empty to show the animated brand reel. */
  showreel: '',
  navigation: [
    { label: 'Agency', href: '/#about' },
    { label: 'About', href: '/about' },
    { label: 'Solutions', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Insights', href: '/#insights' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const

export type SiteConfig = typeof siteConfig
