export interface Service {
  id: string
  index: string
  title: string
  description: string
  capabilities: string[]
}

export const services: Service[] = [
  {
    id: 'brand-strategy',
    index: '01',
    title: 'Brand Strategy',
    description: 'We dig deep into your market, audience, and competition to build a strategy that actually works, not just a PDF that collects dust.',
    capabilities: ['Market Research', 'Audience Analysis', 'Competitive Audit', 'Brand Positioning', 'Go-to-Market Strategy'],
  },
  {
    id: 'brand-identity',
    index: '02',
    title: 'Brand Identity',
    description: 'From logo systems to visual languages, we create identities that are unmistakable and built to scale.',
    capabilities: ['Logo Design', 'Visual Identity', 'Brand Guidelines', 'Typography Systems', 'Color Strategy'],
  },
  {
    id: 'social-media',
    index: '03',
    title: 'Social Media',
    description: 'Content that stops the scroll. Community management that builds real connection. Strategy that drives growth.',
    capabilities: ['Content Strategy', 'Community Management', 'Influencer Partnerships', 'Social Analytics'],
  },
  {
    id: 'performance-marketing',
    index: '04',
    title: 'Performance Marketing',
    description: 'Data-driven campaigns across Google, Meta, and beyond. Every rupee tracked, every result measured.',
    capabilities: ['Google Ads', 'Meta Ads', 'Programmatic', 'Conversion Optimization', 'Analytics'],
  },
  {
    id: 'content-campaigns',
    index: '05',
    title: 'Content & Campaigns',
    description: 'Storytelling that converts. We create campaigns that live across platforms and stay in minds.',
    capabilities: ['Campaign Ideation', 'Copywriting', 'Content Production', 'Multi-platform Strategy'],
  },
  {
    id: 'web-design',
    index: '06',
    title: 'Web Design & Development',
    description: 'Websites that are experiences. Fast, beautiful, conversion-focused digital presences.',
    capabilities: ['UX Design', 'UI Design', 'Frontend Development', 'CMS Integration', 'E-commerce'],
  },
  {
    id: 'seo',
    index: '07',
    title: 'SEO',
    description: 'Technical SEO, content strategy, and link building that puts you where your audience is already looking.',
    capabilities: ['Technical SEO', 'Content SEO', 'Link Building', 'Local SEO', 'SEO Audits'],
  },
  {
    id: 'creative-production',
    index: '08',
    title: 'Creative Production',
    description: 'Photography, video and motion graphics: production that elevates your brand across every touchpoint.',
    capabilities: ['Photography', 'Video Production', 'Motion Graphics', '3D & CGI', 'Post-production'],
  },
  {
    id: 'graphic-design',
    index: '09',
    title: 'Graphic Designing',
    description: 'Posts, ads, print and packaging designed to one visual language, so every piece looks unmistakably yours.',
    capabilities: ['Social Creatives', 'Ad Creatives', 'Print & Packaging', 'Brochures & Decks', 'Illustration'],
  },
  {
    id: 'video-editing',
    index: '10',
    title: 'Video Editing',
    description: 'Reels, ads and brand films cut for attention: tight pacing, clean motion and sound that makes people stay.',
    capabilities: ['Reels & Shorts', 'Ad Edits', 'Motion Graphics', 'Colour Grading', 'Subtitles & Captions'],
  },
]
