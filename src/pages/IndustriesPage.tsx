import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { IndustryTrack } from '../components/industries/IndustryTrack';
import { SharedCore } from '../components/industries/SharedCore';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { industriesLd } from '../data/schema';
import { systems } from '../data/systems';
import { routeFor } from '../data/site';

const route = routeFor('/industries')!;
const jsonLd = [...industriesLd, breadcrumb(route.label, route.path)];

/**
 * The green route. Header in green, four panels alternating deep and bright, a
 * white reset carrying the densest information on the page, then the ink close.
 */
export function IndustriesPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <ColorBlock tone="green" pad="lg" grid labelledBy="industries-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="industries-title" as="h1" size="statement" className="mt-6">
                  {'ONE TECHNOLOGY|PARTNER. EVERY|_critical_ WORKFLOW.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[52ch] text-dim">
                  Four sectors we have already built the core system for. Each one arrives with its
                  own vocabulary, its own daily loop and its own idea of what an urgent problem
                  looks like — so the first workshop starts from your words, not a questionnaire.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Book a walkthrough
                  </Action>
                  <Action to="/products" variant="outline" arrow="→" cursor="explore">
                    Inside the systems
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.16}>
                <p className="eyebrow text-faint">In this page</p>
              </Reveal>
              <RevealGroup as="ol" className="mt-4 border-t rule">
                {systems.map((system, index) => (
                  <RevealItem
                    key={system.key}
                    as="li"
                    className="flex items-baseline gap-4 border-b rule py-3.5"
                  >
                    <span
                      aria-hidden
                      className="display w-6 shrink-0 text-[0.875rem] leading-none tabular-nums opacity-45"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium tracking-[-0.01em]">
                        {system.industry}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-dim">
                        {system.tagline}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.75rem] text-faint">{system.name}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      <IndustryTrack />

      <SharedCore />

      <FinalCta
        headline={'WHICH ONE|IS _yours_?'}
        note="Tell us the sector and the one workflow that costs you the most time this month. We will come back with what the first release would contain and what it would take."
        action={{ label: 'Start with one workflow', to: '/contact' }}
      />
    </>
  );
}
