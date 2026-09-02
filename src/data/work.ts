import type { Tone } from '../lib/colors';
import type { DashboardKey } from './systems';

export type Project = {
  slug: string;
  title: string;
  /** Sector label, used instead of a client name where the work is under NDA. */
  sector: string;
  year: string;
  summary: string;
  scope: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  /** Which real dashboard renders inside the card. */
  preview: DashboardKey | 'site';
  tone: Tone;
  /** Column span out of 12 on desktop — deliberately uneven. */
  span: 7 | 5 | 8 | 4 | 6 | 12;
  tall?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'school-management-platform',
    title: 'School Management Platform',
    sector: 'Education group, four campuses',
    year: '2025',
    summary:
      'Replaced eleven spreadsheets and two disconnected portals with one student record spanning admissions, attendance, fees, exams and transport.',
    scope: ['Workflow audit', 'Data migration', 'Parent app', 'Staff training'],
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Node'],
    metrics: [
      { value: '2,842', label: 'students migrated' },
      { value: '9 days', label: 'to full staff adoption' },
      { value: '94.8%', label: 'daily attendance capture' },
    ],
    preview: 'school',
    tone: 'yellow',
    span: 7,
    tall: true,
  },
  {
    slug: 'hospital-operations-platform',
    title: 'Hospital Operations Platform',
    sector: 'Multi-speciality hospital, 140 beds',
    year: '2025',
    summary:
      'Live bed state, OPD queueing, pharmacy stock and insurance-ready billing built around the way the wards already ran.',
    scope: ['OPD & IPD flows', 'Pharmacy stock', 'Insurance billing', 'Role model'],
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Redis'],
    metrics: [
      { value: '4 min', label: 'discharge bill assembly' },
      { value: '86%', label: 'occupancy visibility' },
    ],
    preview: 'hospital',
    tone: 'pink',
    span: 5,
    tall: true,
  },
  {
    slug: 'hotel-management-platform',
    title: 'Hotel Management Platform',
    sector: 'Resort group, three properties',
    year: '2024',
    summary:
      'One rate and inventory source pushed to every channel, with housekeeping updated from the room and the night audit closed automatically.',
    scope: ['Channel manager', 'Housekeeping app', 'Folio & POS', 'Night audit'],
    stack: ['React', 'TypeScript', 'Node', 'MySQL'],
    metrics: [
      { value: '0', label: 'rate mismatches' },
      { value: '3am', label: 'automated night audit' },
    ],
    preview: 'hotel',
    tone: 'green',
    span: 5,
  },
  {
    slug: 'business-crm',
    title: 'Business CRM',
    sector: 'Industrial distributor',
    year: '2024',
    summary:
      'Enquiries from six sources into one pipeline with owners, next steps and quotation versioning that survives an audit.',
    scope: ['Pipeline design', 'Quotation engine', 'Approvals', 'Reporting'],
    stack: ['React', 'TypeScript', 'PostgreSQL'],
    metrics: [
      { value: '31%', label: 'win rate' },
      { value: '2.4 days', label: 'first response' },
    ],
    preview: 'crm',
    tone: 'yellow',
    span: 7,
  },
  {
    slug: 'corporate-website',
    title: 'Corporate Website',
    sector: 'Engineering manufacturer',
    year: '2025',
    summary:
      'A technical catalogue that loads on a factory-floor connection and ranks for the part numbers buyers actually search.',
    scope: ['Art direction', 'Catalogue architecture', 'Schema markup', 'CMS'],
    stack: ['React', 'Vite', 'Headless CMS'],
    metrics: [
      { value: '0.9s', label: 'largest contentful paint' },
      { value: '2.7×', label: 'organic enquiries' },
    ],
    preview: 'site',
    tone: 'green',
    span: 4,
  },
  {
    slug: 'custom-automation-platform',
    title: 'Custom Automation Platform',
    sector: 'Diagnostics chain, nine centres',
    year: '2026',
    summary:
      'Document intelligence and agent workflows that read incoming lab reports, file them against patients and escalate anything abnormal.',
    scope: ['Agent design', 'Document extraction', 'Escalation rules', 'Audit log'],
    stack: ['TypeScript', 'Python', 'Queue workers'],
    metrics: [
      { value: '1,900', label: 'reports filed monthly' },
      { value: '12 min', label: 'to escalate an abnormal result' },
    ],
    preview: 'analytics',
    tone: 'pink',
    span: 8,
  },
];
