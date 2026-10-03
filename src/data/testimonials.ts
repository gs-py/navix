export interface Testimonial {
  id: string
  quote: string
  name: string
  position: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Navix didn\'t just redesign our brand — they reimagined how our audience sees us. The results have been nothing short of transformative.',
    name: 'Arjun Mehta',
    position: 'Founder & CEO',
    company: 'Noir Beauty',
  },
  {
    id: 'testimonial-2',
    quote: 'Working with Navix felt different from day one. They think like strategists, create like artists, and execute like engineers.',
    name: 'Priya Sharma',
    position: 'Head of Marketing',
    company: 'The Grand',
  },
  {
    id: 'testimonial-3',
    quote: 'Our performance metrics tripled within four months. Navix brings a rare combination of creativity and data-driven thinking.',
    name: 'Vikram Patel',
    position: 'Co-founder',
    company: 'Pulse Technologies',
  },
  {
    id: 'testimonial-4',
    quote: 'They understood our vision before we could fully articulate it. Navix is the creative partner every ambitious brand needs.',
    name: 'Sneha Iyer',
    position: 'Brand Director',
    company: 'Drift Lifestyle',
  },
]
