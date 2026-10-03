export interface Testimonial {
  id: string
  quote: string
  name: string
  position: string
  company: string
  /** Headline result for the engagement, e.g. 212 + '%'. */
  metric: number
  metricSuffix: string
  metricLabel: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Navix didn’t just redesign our brand — they reimagined how our audience sees us. The results have been nothing short of transformative.',
    name: 'Arjun Mehta',
    position: 'Founder & CEO',
    company: 'Noir Beauty',
    metric: 212,
    metricSuffix: '%',
    metricLabel: 'Growth in organic reach in six months',
  },
  {
    id: 'testimonial-2',
    quote: 'Working with Navix felt different from day one. They think like strategists, create like artists and execute like engineers.',
    name: 'Priya Sharma',
    position: 'Head of Marketing',
    company: 'The Grand',
    metric: 3.4,
    metricSuffix: '×',
    metricLabel: 'More direct bookings from digital',
  },
  {
    id: 'testimonial-3',
    quote: 'Our performance metrics tripled within four months. Navix brings a rare combination of creativity and data-driven thinking.',
    name: 'Vikram Patel',
    position: 'Co-founder',
    company: 'Pulse Technologies',
    metric: 61,
    metricSuffix: '%',
    metricLabel: 'Lower cost per acquisition',
  },
  {
    id: 'testimonial-4',
    quote: 'They understood our vision before we could fully articulate it. Navix is the creative partner every ambitious brand needs.',
    name: 'Sneha Iyer',
    position: 'Brand Director',
    company: 'Drift Lifestyle',
    metric: 1.2,
    metricSuffix: 'M',
    metricLabel: 'Views on our launch campaign',
  },
  {
    id: 'testimonial-5',
    quote: 'Reliable, sharp and genuinely invested. Every month the team brings ideas we didn’t ask for — and they usually become our best performers.',
    name: 'Karthik Rao',
    position: 'COO',
    company: 'Hexa',
    metric: 48,
    metricSuffix: '%',
    metricLabel: 'Increase in qualified demo requests',
  },
]
