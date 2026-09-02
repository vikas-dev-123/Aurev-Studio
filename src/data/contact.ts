import type { Tone } from '../lib/colors';

export type StepId = 'need' | 'industry' | 'context' | 'details' | 'budget';

export type StepDef = {
  id: StepId;
  tone: Tone;
  question: string;
  helper: string;
  kind: 'multi' | 'single' | 'text' | 'fields' | 'pair';
  options?: string[];
};

/** One solid colour per step — progress you can see without a progress bar. */
export const configuratorSteps: StepDef[] = [
  {
    id: 'need',
    tone: 'yellow',
    question: 'What are we building?',
    helper: 'Pick everything that applies. We will tell you what to sequence first.',
    kind: 'multi',
    options: [
      'Website',
      'ERP',
      'CRM',
      'Mobile app',
      'Automation',
      'AI solution',
      'Custom software',
      'Branding',
      'SEO',
    ],
  },
  {
    id: 'industry',
    tone: 'green',
    question: 'Where does it run?',
    helper: 'The industry decides which of our existing systems you can start from.',
    kind: 'single',
    options: ['Education', 'Healthcare', 'Hospitality', 'Business', 'Other'],
  },
  {
    id: 'context',
    tone: 'pink',
    question: 'What is broken today?',
    helper: 'The spreadsheet nobody admits to is usually the most useful thing you can tell us.',
    kind: 'text',
  },
  {
    id: 'details',
    tone: 'yellow',
    question: 'Who are we replying to?',
    helper: 'One person on your side is enough to start.',
    kind: 'fields',
  },
  {
    id: 'budget',
    tone: 'green',
    question: 'Budget and timeline',
    helper: 'A range is fine. It changes what we propose, not whether we reply.',
    kind: 'pair',
  },
];

export const budgetBands = [
  'Under ₹2L',
  '₹2L – ₹6L',
  '₹6L – ₹15L',
  '₹15L – ₹40L',
  'Above ₹40L',
  'Need help scoping',
];

export const timelineBands = [
  'Start immediately',
  'Within a month',
  'This quarter',
  'Planning for next year',
];
