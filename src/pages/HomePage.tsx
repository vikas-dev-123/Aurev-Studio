import { Hero } from '../components/home/Hero';
import { SystemFragment } from '../components/home/SystemFragment';
import { WorkflowCut } from '../components/home/WorkflowCut';
import { IndustriesTeaser } from '../components/home/IndustriesTeaser';
import { EcosystemBlock } from '../components/home/EcosystemBlock';
import { AiTeaser } from '../components/home/AiTeaser';
import { ServicesTeaser } from '../components/home/ServicesTeaser';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo } from '../hooks/useSeo';
import { homeLd } from '../data/schema';
import { routeFor } from '../data/site';

const route = routeFor('/')!;

/**
 * Colour choreography, top to bottom:
 * ink (hero) → ink (product proof) → yellow → green → pink → green → pink-deep →
 * yellow → ink. No hue ever touches itself, every cut is a change of subject, and
 * the page closes on the same black it opened with.
 */
export function HomePage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: '/',
    jsonLd: homeLd,
  });

  return (
    <>
      <Hero />
      <SystemFragment />
      <WorkflowCut />
      <IndustriesTeaser />
      <EcosystemBlock />
      <AiTeaser />
      <ServicesTeaser />
      <FinalCta
        headline={'HAVE A _workflow_|WORTH REBUILDING?'}
        note="Send us the version of the truth you have today — the spreadsheet, the register, the WhatsApp group. We will come back with scope, sequence and a number."
      />
    </>
  );
}
