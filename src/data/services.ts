export type PreviewKind =
  | 'wireframe'
  | 'browser'
  | 'vitals'
  | 'phone'
  | 'dashboard'
  | 'pipeline'
  | 'chat'
  | 'search'
  | 'identity'
  | 'flow'
  | 'growth';

export type Service = {
  slug: string;
  title: string;
  promise: string;
  detail: string;
  deliverables: string[];
  preview: PreviewKind;
};

/** The order is the order of engagement, so the numbering on /services is real. */
export const services: Service[] = [
  {
    slug: 'strategy',
    title: 'Strategy',
    promise: 'Map the workflow before anyone opens a design tool.',
    detail:
      'We sit with the people who actually do the work — the front desk, the accounts clerk, the ward nurse — and write down what happens today, including the spreadsheets nobody admits to. That map decides what gets built and in what order.',
    deliverables: ['Workflow audit', 'System map', 'Build sequence', 'Cost model'],
    preview: 'wireframe',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI / UX Design',
    promise: 'Interfaces staff can learn in an afternoon.',
    detail:
      'Adoption is the only metric that matters for internal software. We design for the person doing the same task four hundred times a day, then test it with them before a line of production code is written.',
    deliverables: ['Design system', 'Flows and states', 'Prototypes', 'Usability testing'],
    preview: 'dashboard',
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    promise: 'A site that carries the weight of the work behind it.',
    detail:
      'Editorial layout, real typography, motion that means something. We design in the browser so what you sign off is what ships, at every width.',
    deliverables: ['Art direction', 'Responsive layouts', 'Motion spec', 'Content structure'],
    preview: 'browser',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    promise: 'Fast, accessible, and maintainable by your team.',
    detail:
      'React and TypeScript, server-rendered where it helps, measured against Core Web Vitals on real devices. Keyboard navigation and screen-reader support are part of the build, not a later ticket.',
    deliverables: ['Component library', 'CMS integration', 'Performance budget', 'CI pipeline'],
    preview: 'vitals',
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    promise: 'The parts of the system that belong in a pocket.',
    detail:
      'Attendance, approvals, rounds, room status, field visits. We build focused apps for the tasks that happen away from a desk, sharing one API with the main platform.',
    deliverables: ['iOS and Android builds', 'Offline handling', 'Push notifications', 'Store release'],
    preview: 'phone',
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    promise: 'Built to your process, not a template you bend into.',
    detail:
      'When the off-the-shelf product only covers 60% of how you operate, the remaining 40% is where the cost hides. We build the whole thing, own the data model, and hand over the source.',
    deliverables: ['Architecture', 'Data model', 'Role model', 'Source handover'],
    preview: 'flow',
  },
  {
    slug: 'erp-crm',
    title: 'ERP / CRM',
    promise: 'One record for a student, patient, guest or customer.',
    detail:
      'Admissions, billing, inventory, payroll, pipeline. Modules that share one identity layer, so the same person is not re-entered in four systems and reconciled by hand at month end.',
    deliverables: ['Module rollout', 'Migration', 'Reporting layer', 'Staff training'],
    preview: 'pipeline',
  },
  {
    slug: 'seo',
    title: 'SEO',
    promise: 'Found by the people already looking for you.',
    detail:
      'Technical foundations first — crawlability, structured data, speed, internal linking — then content built around the questions your buyers actually type. Reported monthly against enquiries, not impressions.',
    deliverables: ['Technical audit', 'Schema markup', 'Content plan', 'Monthly reporting'],
    preview: 'search',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    promise: 'Agents that handle the repetitive half of the inbox.',
    detail:
      'Admission enquiries, appointment requests, booking questions, document extraction. The agent works inside your system, follows your rules, and hands off to a human the moment it is unsure.',
    deliverables: ['Agent design', 'Tooling and guardrails', 'Human handoff', 'Evaluation set'],
    preview: 'chat',
  },
  {
    slug: 'digital-growth',
    title: 'Digital Growth',
    promise: 'Keep improving the thing after it is live.',
    detail:
      'Analytics that answer questions, funnel work with real experiments, and a quarterly roadmap owned with you. Launch is the start of the engagement, not the end.',
    deliverables: ['Analytics setup', 'Experiment programme', 'Quarterly roadmap', 'Support SLA'],
    preview: 'growth',
  },
];

export const brandingWork = {
  title: 'Make the first impression count',
  lede: 'Identity work for organisations that will be judged on their software as much as their logo.',
  pieces: [
    { label: 'Wordmark and monogram', note: 'Built for a nav bar and a signboard' },
    { label: 'Type system', note: 'One display voice, one working face' },
    { label: 'Colour architecture', note: 'Flat, deliberate, contrast-tested' },
    { label: 'Product UI kit', note: 'The identity carried into the software' },
    { label: 'Print and signage', note: 'Prospectus, cards, wayfinding' },
    { label: 'Social templates', note: 'Editable by your own team' },
  ],
};
