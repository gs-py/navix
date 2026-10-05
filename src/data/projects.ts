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
    id: 'bags-on-packs',
    slug: 'bags-on-packs',
    client: 'Bags on Packs',
    title: 'A Bold New Look for an Everyday Bag Brand',
    industry: 'Bags & Accessories',
    services: ['Branding', 'Social Media Management', 'Digital Marketing'],
    year: '2025',
    image: '/placeholder-project-1.jpg',
    layout: 'landscape',
    color: '#43234f',
  },
  {
    id: 'interior-world',
    slug: 'interior-world',
    client: 'Interior World',
    title: 'Showing Spaces the Way They Feel to Live In',
    industry: 'Interiors',
    services: ['Social Media Management', 'Video Editing', 'Graphic Designing'],
    year: '2025',
    image: '/placeholder-project-2.jpg',
    layout: 'portrait',
    color: '#5a3a1a',
  },
  {
    id: 'phottam-ai',
    slug: 'phottam-ai',
    client: 'Phottam AI',
    title: 'Making an AI Product Simple to Understand',
    industry: 'Technology / AI',
    services: ['Website Design & Development', 'Branding', 'Digital Marketing'],
    year: '2025',
    image: '/placeholder-project-3.jpg',
    layout: 'full',
    color: '#10305e',
  },
  {
    id: 'fabric-affair',
    slug: 'fabric-affair',
    client: 'Fabric Affair',
    title: 'A Premium, Consistent Identity for a Fashion Label',
    industry: 'Fashion',
    services: ['Branding', 'Graphic Designing', 'Social Media Management'],
    year: '2025',
    image: '/placeholder-project-4.jpg',
    layout: 'split',
    color: '#1e4a2a',
  },
  {
    id: 'ezka',
    slug: 'ezka',
    client: 'EZKA',
    title: 'Campaigns and Content That Keep EZKA Growing',
    industry: 'Lifestyle',
    services: ['Digital Marketing', 'Social Media Management', 'Video Editing'],
    year: '2025',
    image: '/placeholder-project-5.jpg',
    layout: 'landscape',
    color: '#2b3a52',
  },
  {
    id: 'brandlab-7',
    slug: 'brandlab-7',
    client: 'BrandLab 7',
    title: 'Design and Video Support for a Growing Studio',
    industry: 'Creative Studio',
    services: ['Graphic Designing', 'Video Editing', 'Website Design & Development'],
    year: '2025',
    image: '/placeholder-project-6.jpg',
    layout: 'portrait',
    color: '#33296b',
  },
]
