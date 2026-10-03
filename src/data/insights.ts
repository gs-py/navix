export interface Insight {
  id: string
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
}

export const insights: Insight[] = [
  {
    id: 'insight-1',
    slug: 'why-your-brand-needs-a-pov',
    title: 'Why Your Brand Needs a Point of View, Not Just a Logo',
    category: 'Branding',
    date: 'September 2024',
    excerpt: 'In a saturated market, a strong visual identity isn\'t enough. Your brand needs a clear, opinionated perspective to cut through.',
    image: '/placeholder-insight-1.jpg',
  },
  {
    id: 'insight-2',
    slug: 'performance-marketing-beyond-roas',
    title: 'Performance Marketing Beyond ROAS: Metrics That Actually Matter',
    category: 'Performance',
    date: 'August 2024',
    excerpt: 'ROAS tells one story. We explore the metrics that reveal the full picture of your marketing effectiveness.',
    image: '/placeholder-insight-2.jpg',
  },
  {
    id: 'insight-3',
    slug: 'content-strategy-2025',
    title: 'The Content Strategy Playbook for 2025',
    category: 'Strategy',
    date: 'July 2024',
    excerpt: 'Algorithms change. Platforms rise and fall. But a solid content strategy endures. Here\'s how to build one.',
    image: '/placeholder-insight-3.jpg',
  },
]
