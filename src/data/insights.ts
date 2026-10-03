export interface Insight {
  id: string
  slug: string
  title: string
  category: 'Branding' | 'Performance' | 'Strategy' | 'Content'
  date: string
  readTime: string
  excerpt: string
}

export const insights: Insight[] = [
  {
    id: 'insight-1',
    slug: 'why-your-brand-needs-a-pov',
    title: 'Why your brand needs a point of view, not just a logo',
    category: 'Branding',
    date: 'Sep 2026',
    readTime: '6 min',
    excerpt: 'In a saturated market a strong visual identity isn’t enough. Your brand needs a clear, opinionated perspective to cut through.',
  },
  {
    id: 'insight-2',
    slug: 'performance-marketing-beyond-roas',
    title: 'Performance marketing beyond ROAS: the metrics that actually matter',
    category: 'Performance',
    date: 'Aug 2026',
    readTime: '8 min',
    excerpt: 'ROAS tells one story. These are the metrics that reveal the full picture of your marketing effectiveness.',
  },
  {
    id: 'insight-3',
    slug: 'ugc-vs-influencers',
    title: 'UGC vs influencers: what really converts for D2C brands',
    category: 'Content',
    date: 'Jul 2026',
    readTime: '5 min',
    excerpt: 'Polished creators or raw customer content? We break down where each one earns its budget.',
  },
  {
    id: 'insight-4',
    slug: 'content-strategy-playbook',
    title: 'The content strategy playbook for search, social and AI answers',
    category: 'Strategy',
    date: 'Jun 2026',
    readTime: '9 min',
    excerpt: 'Algorithms change and platforms rise and fall, but a solid content strategy endures. Here’s how to build one.',
  },
]
