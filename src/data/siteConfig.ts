export const siteConfig = {
  name: 'Navix',
  tagline: 'We build brands that move.',
  description: 'Navix is a modern creative and digital marketing agency. Strategy, branding, content, and performance marketing that makes brands impossible to ignore.',
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://navix.agency',
  email: 'hello@navix.agency',
  phone: '+91 98765 43210',
  location: 'Bangalore, India',
  social: {
    instagram: 'https://instagram.com/navix.agency',
    linkedin: 'https://linkedin.com/company/navix',
    behance: 'https://behance.net/navix',
    dribbble: 'https://dribbble.com/navix',
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
    { label: 'Agency', href: '#about' },
    { label: 'Solutions', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ],
} as const

export type SiteConfig = typeof siteConfig
