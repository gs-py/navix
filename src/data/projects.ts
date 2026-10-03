export interface Project {
  id: string
  slug: string
  client: string
  title: string
  industry: string
  services: string[]
  year: string
  image: string
  layout: 'landscape' | 'portrait' | 'full' | 'split'
  color: string
}

export const projects: Project[] = [
  {
    id: 'noir-beauty',
    slug: 'noir-beauty',
    client: 'Noir Beauty',
    title: 'Redefining Luxury Skincare for the Modern Woman',
    industry: 'Fashion & Beauty',
    services: ['Brand Identity', 'Web Design', 'Social Media'],
    year: '2024',
    image: '/placeholder-project-1.jpg',
    layout: 'landscape',
    color: '#1a1a2e',
  },
  {
    id: 'the-grand',
    slug: 'the-grand',
    client: 'The Grand',
    title: 'A Digital Experience for India\'s Finest Hospitality',
    industry: 'Hospitality',
    services: ['Brand Strategy', 'Web Design', 'Content'],
    year: '2024',
    image: '/placeholder-project-2.jpg',
    layout: 'portrait',
    color: '#2d2016',
  },
  {
    id: 'pulse',
    slug: 'pulse',
    client: 'Pulse',
    title: 'Launching a Health-Tech Brand Into a Crowded Market',
    industry: 'Technology',
    services: ['Brand Strategy', 'Brand Identity', 'Performance Marketing'],
    year: '2023',
    image: '/placeholder-project-3.jpg',
    layout: 'full',
    color: '#0a1628',
  },
  {
    id: 'root-branch',
    slug: 'root-and-branch',
    client: 'Root & Branch',
    title: 'From Farm to Table — Building a D2C Food Brand',
    industry: 'D2C / Food',
    services: ['Brand Identity', 'Content & Campaigns', 'Social Media'],
    year: '2023',
    image: '/placeholder-project-4.jpg',
    layout: 'split',
    color: '#1a2e1a',
  },
  {
    id: 'drift',
    slug: 'drift',
    client: 'Drift',
    title: 'Capturing the Spirit of Modern Travel',
    industry: 'Lifestyle',
    services: ['Content & Campaigns', 'Social Media', 'Creative Production'],
    year: '2024',
    image: '/placeholder-project-5.jpg',
    layout: 'landscape',
    color: '#1e1e2a',
  },
  {
    id: 'hexa',
    slug: 'hexa',
    client: 'Hexa',
    title: 'Scaling a SaaS Brand Through Strategic Content',
    industry: 'Technology / SaaS',
    services: ['SEO', 'Content & Campaigns', 'Performance Marketing'],
    year: '2024',
    image: '/placeholder-project-6.jpg',
    layout: 'portrait',
    color: '#161622',
  },
]
