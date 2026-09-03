/**
 * Single source of truth for brand + routing metadata.
 * Nothing about the company is hardcoded inside components.
 */
import type { Tone } from '../lib/colors';

export const site = {
  name: 'Connect Tech Solution',
  shortName: 'CTS',
  /** Used for canonical URLs, sitemap and structured data. */
  origin: 'https://connecttechsolution.in',
  tagline: 'Digital Systems, Software & AI',
  promise:
    "We don't just build websites. We build the digital systems that run businesses.",
  founded: '2025',
  email: 'hello@connectiontechsolution.com',
  /** Left empty until a real line exists — the UI hides empty fields. */
  phone: '',
  whatsapp: '',
  serviceArea: 'India · Middle East · Remote',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/solutionsconnecttech?igsi=MTU3aDE4cXZwdHVtNg==' },
    { label: 'GitHub', href: 'https://github.com/connection-tech-solution' },
    { label: 'Dribbble', href: 'https://dribbble.com/connectiontechsolution' },
  ],
} as const;

export type RouteDef = {
  path: string;
  label: string;
  /** Colour the nav indicator and page identity use. */
  tone: Tone;
  title: string;
  description: string;
  /** Shown in the mobile overlay under each link. */
  hint: string;
  inNav: boolean;
};

export const routes: RouteDef[] = [
  {
    path: '/',
    label: 'Home',
    tone: 'yellow',
    /** The wordmark is the home affordance, so Home stays out of the link row. */
    inNav: false,
    title: `${site.name} | Software, Web & Digital Solutions`,
    description:
      'We engineer the software, automation and AI systems that run schools, hospitals, hotels and growing businesses. Strategy, design, engineering and long-term ownership from one partner.',
    hint: 'Where we start',
  },
  {
    path: '/services',
    label: 'Services',
    tone: 'yellow',
    inNav: true,
    title: `Services — ${site.name}`,
    description:
      'Strategy, UI/UX, web design and development, mobile apps, custom software, ERP and CRM builds, SEO and AI automation — delivered as one connected programme of work.',
    hint: 'Ten capabilities, one team',
  },
  {
    path: '/industries',
    label: 'Industries',
    tone: 'green',
    inNav: true,
    title: `Industries — ${site.name}`,
    description:
      'Purpose-built platforms for education, healthcare, hospitality and business operations: School OS, Care OS, Stay OS and Business OS.',
    hint: 'Education, health, hospitality, business',
  },
  {
    path: '/products',
    label: 'Products',
    tone: 'pink',
    inNav: true,
    title: `Products & Systems — ${site.name}`,
    description:
      'Four operating systems you can license and extend: School OS, Care OS, Stay OS and Business OS. Real modules, real dashboards, deployed for your workflow.',
    hint: 'Systems you can license',
  },
  {
    path: '/ai',
    label: 'AI',
    tone: 'green',
    inNav: true,
    title: `AI & Automation — ${site.name}`,
    description:
      'AI agents, chatbots, WhatsApp automation, voice assistants, document intelligence and workflow automation wired into the systems you already run.',
    hint: 'Agents, automation, intelligence',
  },
  {
    path: '/work',
    label: 'Work',
    tone: 'yellow',
    inNav: true,
    title: `Selected Systems — ${site.name}`,
    description:
      'Selected platforms: school management, hospital operations, hotel management, business CRM, corporate web and custom automation.',
    hint: 'Platforms we have shipped',
  },
  {
    path: '/approach',
    label: 'Approach',
    tone: 'pink',
    inNav: true,
    title: `Approach — ${site.name}`,
    description:
      'How a system gets built: discover, define, design, build, launch, evolve — plus the stack, the security model and the way we stay involved after launch.',
    hint: 'How the work happens',
  },
  {
    path: '/about',
    label: 'About',
    tone: 'ink',
    inNav: true,
    title: `About — ${site.name}`,
    description:
      'A small engineering and design studio that builds operational software. What we believe, how we work, and who we build for.',
    hint: 'Who you would be working with',
  },
  {
    path: '/contact',
    label: 'Contact',
    tone: 'yellow',
    inNav: false,
    title: `Start a project — ${site.name}`,
    description:
      'Tell us what you need built. Five short steps: scope, industry, context, details, budget and timeline.',
    hint: 'Five steps, two minutes',
  },
];

export const navRoutes = routes.filter((r) => r.inNav);

export function routeFor(pathname: string): RouteDef | undefined {
  return routes.find((r) => r.path === pathname);
}
