export interface ProcessStep {
  id: string
  letter: string
  title: string
  tagline: string
  description: string
  deliverables: string[]
}

/** The Navix M.O.V.E method. */
export const processSteps: ProcessStep[] = [
  {
    id: 'map',
    letter: 'M',
    title: 'Map',
    tagline: 'Research & observation',
    description: 'We study your market, audience and competitors until the real opportunity is obvious — through data, social listening and honest conversations with your customers.',
    deliverables: ['Market & audience research', 'Competitor audit', 'Brand health check'],
  },
  {
    id: 'originate',
    letter: 'O',
    title: 'Originate',
    tagline: 'The big idea',
    description: 'Insight becomes concept. We shape your positioning, creative territories and the one idea every campaign, post and pixel will hang on.',
    deliverables: ['Positioning & narrative', 'Creative concepts', 'Messaging framework'],
  },
  {
    id: 'visualise',
    letter: 'V',
    title: 'Visualise',
    tagline: 'Design & production',
    description: 'Identity, content, campaigns and web — crafted for each platform and produced in-house so the idea lands with the same force everywhere.',
    deliverables: ['Identity systems', 'Content & UGC production', 'Websites & landing pages'],
  },
  {
    id: 'execute',
    letter: 'E',
    title: 'Execute',
    tagline: 'Launch, measure, scale',
    description: 'We launch across every channel, then optimise every week — scaling what works, cutting what doesn’t and reporting on the numbers that matter.',
    deliverables: ['Media & launch plan', 'Performance dashboards', 'Ongoing optimisation'],
  },
]
