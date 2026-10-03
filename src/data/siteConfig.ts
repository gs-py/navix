export const siteConfig = {
  name: 'Navix',
  tagline: 'We build brands that move.',
  description: 'Navix is a modern creative and digital marketing agency. Strategy, branding, content, and performance marketing that makes brands impossible to ignore.',
  url: 'https://navix.agency',
  email: 'hello@navix.agency',
  phone: '+91 98765 43210',
  location: 'Bangalore, India',
  social: {
    instagram: 'https://instagram.com/navix.agency',
    linkedin: 'https://linkedin.com/company/navix',
    behance: 'https://behance.net/navix',
    dribbble: 'https://dribbble.com/navix',
  },
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ],
} as const

export type SiteConfig = typeof siteConfig
