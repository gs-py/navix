export interface ProcessStep {
  id: string
  index: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    index: '01',
    title: 'Discover',
    description: 'We immerse ourselves in your world — your market, your audience, your competition. Deep research and honest conversations lay the groundwork for everything that follows.',
  },
  {
    id: 'define',
    index: '02',
    title: 'Define',
    description: 'We distill insights into a clear strategic direction. Brand positioning, messaging frameworks, and creative territories that give your brand a real edge.',
  },
  {
    id: 'create',
    index: '03',
    title: 'Create',
    description: 'Strategy meets craft. We design, write, build, and produce — creating work that is bold, purposeful, and impossible to scroll past.',
  },
  {
    id: 'launch',
    index: '04',
    title: 'Launch',
    description: 'We deploy with precision across every channel. Paid media, organic content, web experiences — all orchestrated for maximum impact from day one.',
  },
  {
    id: 'grow',
    index: '05',
    title: 'Grow',
    description: 'Launch is the beginning. We optimize, iterate, and scale — turning initial traction into sustained, measurable growth.',
  },
]
