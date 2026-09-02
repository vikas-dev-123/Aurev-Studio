import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { ProcessTrack } from '../components/approach/ProcessTrack';
import { WhyUs } from '../components/approach/WhyUs';
import { TechStack } from '../components/approach/TechStack';
import { SecurityBlock } from '../components/approach/SecurityBlock';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { approachLd } from '../data/schema';
import { processSteps } from '../data/approach';
import { routeFor } from '../data/site';

const route = routeFor('/approach')!;
const jsonLd = [...approachLd, breadcrumb(route.label, route.path)];

/**
 * The pink process route. Header pink with the phase strip, the six steps in deep,
 * the five reasons back in bright, the stack on ink, security on paper, ink close.
 */
export function ApproachPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <ColorBlock tone="pink" pad="lg" grid labelledBy="approach-title">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="approach-title" as="h1" size="statement" className="mt-6">
                  {'HOW A SYSTEM|ACTUALLY GETS|_built_.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[52ch] text-dim">
                  Six phases, each ending in something you can open. Eleven to twenty-five weeks to a
                  live first release, fixed pricing agreed per phase, and a staging link that updates
                  every fortnight so progress is never a status report.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Start with discovery
                  </Action>
                  <Action href="#process" variant="bare" arrow="→">
                    Read the six phases
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.16}>
                <p className="voice text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25]">
                  Discovery is the first phase, not an upsell. A system designed from a questionnaire
                  gets rebuilt in year two — usually by someone else.
                </p>
              </Reveal>
            </div>
          </div>

          <RevealGroup
            as="ol"
            className="mt-14 grid gap-x-6 gap-y-6 border-t rule-strong pt-6 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6"
          >
            {processSteps.map((step, index) => (
              <RevealItem key={step.label} as="li">
                <span
                  aria-hidden
                  className="block h-[2px] w-full bg-[currentColor]"
                  style={{ opacity: 0.25 + (index / (processSteps.length - 1)) * 0.75 }}
                />
                <p className="mt-3.5 text-[0.9375rem] font-medium tracking-[-0.01em]">
                  {step.label}
                </p>
                <p className="mt-1 text-[0.75rem] text-faint">{step.duration}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Shell>
      </ColorBlock>

      <ProcessTrack />

      <WhyUs />

      <TechStack />

      <SecurityBlock />

      <FinalCta
        headline={'PHASE ONE|IS A _conversation_.'}
        note="Discovery starts with a walkthrough of how the work happens today. Bring the spreadsheets nobody admits to — those are usually the specification."
        action={{ label: 'Book the walkthrough', to: '/contact' }}
      />
    </>
  );
}
