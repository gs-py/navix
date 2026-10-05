export interface Testimonial {
  id: string
  /** Draft wording: each quote goes live only after the named client approves it. */
  quote: string
  position: string
  company: string
  /** What Navix delivered for this client, shown beside the quote. */
  services: string[]
}

export const testimonials: Testimonial[] = [
  {
    id: 'bags-on-packs',
    quote: 'Navix gave Bags on Packs a look and voice that finally matches the quality of our products. Our customers notice the difference in every post and every ad.',
    position: 'Founder',
    company: 'Bags on Packs',
    services: ['Branding', 'Social Media Management', 'Digital Marketing'],
  },
  {
    id: 'interior-world',
    quote: 'They understood our spaces before we explained them. The content Navix creates shows our work the way we always wanted people to see it.',
    position: 'Founder',
    company: 'Interior World',
    services: ['Social Media Management', 'Video Editing', 'Graphic Designing'],
  },
  {
    id: 'fabric-affair',
    quote: 'From our launch creatives to everyday posts, Navix keeps Fabric Affair looking premium and consistent. They feel like part of our own team.',
    position: 'Founder',
    company: 'Fabric Affair',
    services: ['Branding', 'Graphic Designing', 'Social Media Management'],
  },
  {
    id: 'phottam-ai',
    quote: 'Explaining an AI product simply is hard. Navix turned Phottam AI into a brand people get in seconds, with a website that does the selling for us.',
    position: 'Founder',
    company: 'Phottam AI',
    services: ['Website Design & Development', 'Branding', 'Digital Marketing'],
  },
  {
    id: 'ezka',
    quote: 'Navix brings ideas every month that we would never have thought of, and they are usually the ones that perform best for EZKA.',
    position: 'Founder',
    company: 'EZKA',
    services: ['Digital Marketing', 'Social Media Management', 'Video Editing'],
  },
  {
    id: 'brandlab-7',
    quote: 'Sharp thinking, quick turnarounds and a real eye for design. Working with Navix made BrandLab 7 stronger in everything we put out.',
    position: 'Founder',
    company: 'BrandLab 7',
    services: ['Graphic Designing', 'Video Editing', 'Website Design & Development'],
  },
]
