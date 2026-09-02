export type ProcessStep = {
  label: string;
  duration: string;
  summary: string;
  work: string[];
  output: string;
};

/** A real sequence, so the numbering on /approach is earned. */
export const processSteps: ProcessStep[] = [
  {
    label: 'Discover',
    duration: '1–2 weeks',
    summary: 'We watch the work happen before we describe it.',
    work: ['Shadow the people doing the task', 'Collect the shadow spreadsheets', 'Find the real bottleneck'],
    output: 'A workflow map both sides agree is accurate',
  },
  {
    label: 'Define',
    duration: '1 week',
    summary: 'Scope, sequence and the cost of each phase.',
    work: ['Module list with priorities', 'Role and permission model', 'Migration plan for existing data'],
    output: 'A build sequence with fixed phase pricing',
  },
  {
    label: 'Design',
    duration: '2–4 weeks',
    summary: 'Screens tested with the staff who will live in them.',
    work: ['Flows for the highest-frequency tasks', 'Interface design and states', 'Prototype walkthroughs'],
    output: 'Signed-off design system and prototypes',
  },
  {
    label: 'Build',
    duration: '6–16 weeks',
    summary: 'Shipping in fortnightly increments you can open.',
    work: ['Module-by-module delivery', 'Data migration rehearsals', 'Automated tests on core flows'],
    output: 'A staging environment updated every two weeks',
  },
  {
    label: 'Launch',
    duration: '1–2 weeks',
    summary: 'Cutover planned around your calendar, not ours.',
    work: ['Parallel run against the old process', 'On-site training by role', 'Go-live support window'],
    output: 'Live system with staff trained and data migrated',
  },
  {
    label: 'Evolve',
    duration: 'Ongoing',
    summary: 'The roadmap keeps moving after the invoice clears.',
    work: ['Quarterly roadmap review', 'Usage analytics and cleanup', 'New modules as you grow'],
    output: 'A support SLA and a roadmap you own',
  },
];

export const whyUs = [
  {
    title: 'Built around your workflow',
    detail:
      'We do not ask you to change how admissions or discharge works to suit a template. The system takes the shape of the process, and where the process is broken we say so.',
  },
  {
    title: 'Designed for adoption',
    detail:
      'Internal software fails on training, not features. Every screen is judged by how fast a new staff member gets through it unaided.',
  },
  {
    title: 'Engineered to scale',
    detail:
      'One campus becomes four. One clinic becomes nine. The data model and role system assume that from day one.',
  },
  {
    title: 'AI where it earns its place',
    detail:
      'Automation goes where the volume and the repetition are. Everywhere else, a well-designed form beats a chatbot.',
  },
  {
    title: 'One long-term partner',
    detail:
      'Strategy, design, engineering and support from the same small team. No handover to an account manager after signing.',
  },
];

export const techStack = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP'] },
  { group: 'Backend', items: ['Node.js', 'Python', 'REST & GraphQL', 'Queue workers', 'Webhooks'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'Object storage', 'Warehouse sync'] },
  { group: 'Infrastructure', items: ['Docker', 'CI/CD', 'CDN', 'Managed hosting', 'Backups & restore drills'] },
  { group: 'AI', items: ['LLM agents', 'RAG over your documents', 'Speech to text', 'OCR & extraction', 'Evaluation harness'] },
  { group: 'Security', items: ['SSO & MFA', 'Role-based access', 'Encryption at rest', 'Audit logging', 'Monitoring'] },
];

export const securityPractices = [
  { title: 'Secure authentication', detail: 'MFA, session policy and SSO against your existing directory.' },
  { title: 'Role-based access', detail: 'Roles mapped to actual job functions, reviewed at every launch.' },
  { title: 'Granular permissions', detail: 'Field-level visibility where records are sensitive.' },
  { title: 'Audit logs', detail: 'Who saw it, who changed it, when — exportable.' },
  { title: 'Backups', detail: 'Automated, encrypted, with restore tested on a schedule.' },
  { title: 'Monitoring', detail: 'Uptime, error rate and job failure alerting to a real person.' },
  { title: 'API security', detail: 'Scoped tokens, rate limits and request signing.' },
  { title: 'Scalable infrastructure', detail: 'Horizontal scaling and staged rollouts to avoid downtime.' },
];

export const values = [
  {
    title: 'Say the difficult thing early',
    detail: 'A scope problem raised in week one costs a conversation. Raised in month four it costs the project.',
  },
  {
    title: 'Ship something openable every fortnight',
    detail: 'Progress you can click beats a status report you have to trust.',
  },
  {
    title: 'Design for the four-hundredth time',
    detail: 'The person doing the task all day is the primary user, not the person approving the design.',
  },
  {
    title: 'Leave the source behind',
    detail: 'You own the code, the data model and the documentation. No hostage situations.',
  },
];

export const stats = [
  { value: '04', label: 'Core industries' },
  { value: '10+', label: 'Digital capabilities' },
  { value: '∞', label: 'Custom workflows' },
  { value: '01', label: 'Long-term partner' },
];
