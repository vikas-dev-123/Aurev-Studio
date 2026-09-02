import type { Tone } from '../lib/colors';

export type DashboardKey = 'school' | 'hospital' | 'hotel' | 'crm' | 'analytics';

export type SystemDef = {
  key: 'school' | 'care' | 'stay' | 'business';
  name: string;
  industry: string;
  /** One line a principal, administrator or owner would repeat to a colleague. */
  tagline: string;
  /** The friction that exists before the system arrives. */
  problem: string;
  /** What changes once it is running. */
  shift: string;
  forWho: string;
  modules: string[];
  outcomes: { metric: string; label: string }[];
  dashboard: DashboardKey;
  /**
   * Tone used when this system gets its own panel on /industries and /products.
   * The four alternate deep/bright, starting deep — the page header owns the
   * bright variant, so the first panel has to differ from it.
   */
  industryTone: Tone;
  productTone: Tone;
};

export const systems: SystemDef[] = [
  {
    key: 'school',
    name: 'School OS',
    industry: 'Education',
    tagline: 'Admissions to alumni on one record.',
    problem:
      'Attendance in one register, fees in a spreadsheet, exam marks on a shared drive, transport on WhatsApp. Nobody can answer a parent question without calling three people.',
    shift:
      'One student record from enquiry to transfer certificate. Fees reconcile themselves, attendance reaches parents the same morning, and the principal sees the whole campus before the first bell.',
    forWho: 'Schools, colleges, coaching institutes and multi-campus trusts',
    modules: [
      'Students',
      'Teachers',
      'Attendance',
      'Fees',
      'Exams',
      'Timetable',
      'Transport',
      'Library',
      'Parent app',
      'Admissions',
    ],
    outcomes: [
      { metric: '2,842', label: 'students on one record' },
      { metric: '94.8%', label: 'attendance captured daily' },
      { metric: '11 min', label: 'to publish a result sheet' },
    ],
    dashboard: 'school',
    industryTone: 'green-deep',
    productTone: 'pink-deep',
  },
  {
    key: 'care',
    name: 'Care OS',
    industry: 'Healthcare',
    tagline: 'Front desk to discharge, without paper.',
    problem:
      'Appointments booked on a phone pad, beds tracked on a whiteboard, pharmacy stock counted at night, and billing assembled from three separate books at discharge.',
    shift:
      'One patient file across OPD, IPD, lab and pharmacy. Bed state is live, prescriptions reach the counter instantly, and the discharge bill is already assembled when the family asks for it.',
    forWho: 'Hospitals, multi-speciality clinics, diagnostic chains and day-care centres',
    modules: [
      'Appointments',
      'Patients',
      'Doctors',
      'Beds',
      'Pharmacy',
      'Laboratory',
      'Billing',
      'Insurance',
      'Reports',
      'Inventory',
    ],
    outcomes: [
      { metric: '1,180', label: 'OPD visits a month' },
      { metric: '86%', label: 'bed occupancy, live' },
      { metric: '4 min', label: 'to assemble a discharge bill' },
    ],
    dashboard: 'hospital',
    industryTone: 'green',
    productTone: 'pink',
  },
  {
    key: 'stay',
    name: 'Stay OS',
    industry: 'Hospitality',
    tagline: 'Every room, rate and rupee in one view.',
    problem:
      'Rates edited on four booking sites, housekeeping status shouted down a corridor, restaurant bills posted to the wrong room, and last night’s revenue known by lunchtime tomorrow.',
    shift:
      'One inventory pushed to every channel, housekeeping updated from a phone in the room, restaurant and spa posted to the folio automatically, and last night closed before breakfast service.',
    forWho: 'Hotels, resorts, serviced apartments and restaurant groups',
    modules: [
      'Reservations',
      'Rooms',
      'Housekeeping',
      'Guests',
      'Folio & billing',
      'Restaurant',
      'Inventory',
      'Channel manager',
      'Night audit',
    ],
    outcomes: [
      { metric: '78%', label: 'occupancy this week' },
      { metric: '₹6,410', label: 'average daily rate' },
      { metric: '0', label: 'rate mismatches across channels' },
    ],
    dashboard: 'hotel',
    industryTone: 'green-deep',
    productTone: 'pink-deep',
  },
  {
    key: 'business',
    name: 'Business OS',
    industry: 'Business',
    tagline: 'Pipeline, projects and payments in one place.',
    problem:
      'Leads in a personal inbox, quotations in a folder, project status in a standup, and revenue certainty that arrives with the accountant at quarter end.',
    shift:
      'Every enquiry lands in one pipeline with an owner and a next step. Won deals become projects with budgets, and revenue is visible the day it is invoiced.',
    forWho: 'Manufacturers, distributors, agencies, clinics chains and professional firms',
    modules: [
      'Pipeline',
      'Leads',
      'Customers',
      'Quotations',
      'Projects',
      'Revenue',
      'Team',
      'Tasks',
      'Analytics',
      'Approvals',
    ],
    outcomes: [
      { metric: '₹1.84Cr', label: 'weighted pipeline' },
      { metric: '31%', label: 'win rate, last quarter' },
      { metric: '2.4 days', label: 'average first response' },
    ],
    dashboard: 'crm',
    industryTone: 'green',
    productTone: 'pink',
  },
];

export const systemByKey = Object.fromEntries(systems.map((s) => [s.key, s])) as Record<
  SystemDef['key'],
  SystemDef
>;
