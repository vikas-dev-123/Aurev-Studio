import { site } from './site';
import { services } from './services';
import { systems } from './systems';
import { aiCapabilities } from './ai';
import { processSteps } from './approach';
import { projects } from './work';

/**
 * Structured data, written once. Every route imports the constants it needs from
 * here so the graph stays consistent and the objects keep a stable identity —
 * `useSeo` re-serialises whenever the object reference changes.
 */
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.origin}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: `${site.origin}/`,
  logo: `${site.origin}/icon-512.png`,
  image: `${site.origin}/og.png`,
  email: site.email,
  foundingDate: site.founded,
  description: site.promise,
  slogan: site.tagline,
  areaServed: site.serviceArea.split(' · '),
  sameAs: site.social.map((s) => s.href),
  knowsAbout: [
    'Custom software development',
    'ERP implementation',
    'CRM implementation',
    'School management systems',
    'Hospital management systems',
    'Hotel management systems',
    'AI automation',
    'Search engine optimisation',
  ],
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.origin}/#website`,
  url: `${site.origin}/`,
  name: site.name,
  description: site.promise,
  publisher: { '@id': `${site.origin}/#organization` },
  inLanguage: 'en-IN',
};

/** Home carries the identity graph; inner routes carry their own type plus a breadcrumb. */
export const homeLd = [organizationLd, websiteLd];

export const servicesLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Services — ${site.name}`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.promise,
        provider: { '@id': `${site.origin}/#organization` },
        areaServed: site.serviceArea.split(' · '),
      },
    })),
  },
];

/**
 * /industries answers "do you know my sector", so each entry is described as a
 * Service with a named audience rather than as a product listing — the systems
 * themselves are catalogued on /products as SoftwareApplication.
 */
export const industriesLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Industries — ${site.name}`,
    itemListElement: systems.map((system, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: `${system.industry} systems — ${system.name}`,
        serviceType: `${system.industry} software`,
        description: system.shift,
        provider: { '@id': `${site.origin}/#organization` },
        areaServed: site.serviceArea.split(' · '),
        audience: { '@type': 'Audience', audienceType: system.forWho },
      },
    })),
  },
];

export const productsLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Systems — ${site.name}`,
    itemListElement: systems.map((system, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: system.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        description: system.tagline,
        featureList: system.modules,
        publisher: { '@id': `${site.origin}/#organization` },
      },
    })),
  },
];

/**
 * /ai is one service with a catalogue underneath it, not twelve separate services:
 * nobody buys "document intelligence" on its own, they buy automation of a workflow
 * and get whichever capabilities that workflow needs.
 */
export const aiLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI & automation — ${site.name}`,
    serviceType: 'AI automation and workflow automation',
    description:
      'AI agents, chatbots, WhatsApp and voice automation, document intelligence and predictive reporting, built inside the systems a business already runs.',
    provider: { '@id': `${site.origin}/#organization` },
    areaServed: site.serviceArea.split(' · '),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI capabilities',
      itemListElement: aiCapabilities.map((capability) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: capability.title,
          description: capability.detail,
        },
      })),
    },
  },
];

/**
 * The process is genuinely a HowTo: an ordered sequence with a named output per
 * step. No `totalTime`, because the honest answer is a range and a single ISO
 * duration would assert a precision we do not have.
 */
export const approachLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How a system gets built — ${site.name}`,
    description:
      'The six phases of a build: discover, define, design, build, launch and evolve — with the deliverable each one ends on.',
    step: processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.label,
      text: `${step.summary} ${step.work.join('. ')}. Output: ${step.output}.`,
    })),
  },
];

/** The enquiry route. The configurator has no endpoint, so no `potentialAction`. */
export const contactLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Start a project — ${site.name}`,
    url: `${site.origin}/contact`,
    description:
      'Tell us what you need built in five short steps: scope, industry, what is broken today, who to reply to, budget and timeline.',
    mainEntity: {
      '@id': `${site.origin}/#organization`,
      '@type': 'Organization',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        availableLanguage: 'English',
        areaServed: site.serviceArea.split(' · '),
      },
    },
  },
];

/**
 * Projects are described as CreativeWork rather than Product: these are delivered
 * platforms, and the client names are withheld, so a sector label carries the
 * `about` field instead of a brand.
 */
export const workLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Selected systems — ${site.name}`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        about: project.sector,
        dateCreated: project.year,
        abstract: project.summary,
        keywords: [...project.scope, ...project.stack].join(', '),
        creator: { '@id': `${site.origin}/#organization` },
      },
    })),
  },
];
