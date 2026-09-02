import { useState } from 'react';
import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { ServiceRow, toneForRow } from '../components/services/ServiceRow';
import { BrandingBlock } from '../components/services/BrandingBlock';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { servicesLd } from '../data/schema';
import { services } from '../data/services';
import { routeFor } from '../data/site';

const route = routeFor('/services')!;
const jsonLd = [...servicesLd, breadcrumb(route.label, route.path)];

/** Facts, not adjectives — the right column of the header. */
const FACTS: [string, string][] = [
  ['10', 'capabilities under one contract'],
  ['01', 'team, from workflow audit to handover'],
  ['00', 'third parties in the delivery chain'],
];

/**
 * The yellow route. Colour discipline here is deliberately narrow: yellow and
 * white, alternating, ten times, then one neutral specimen block and the black
 * close. No green or pink appears anywhere on this page.
 */
export function ServicesPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  // One row open at a time. Row 01 starts open so the page never presents itself
  // as ten closed drawers, and so the server and the first client paint agree.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <ColorBlock tone="yellow" pad="lg" grid labelledBy="services-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="services-title" as="h1" size="statement" className="mt-6">
                  {'FROM FIRST IMPRESSION|TO FULL DIGITAL|_infrastructure_.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[52ch] text-dim">
                  Most of this list is bought separately, from different suppliers, and stitched
                  together by the client. We deliver it as one programme of work with one build
                  sequence — because the parts have to agree with each other to be worth anything.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Scope a project
                  </Action>
                  <Action to="/work" variant="outline" arrow="→" cursor="view">
                    See it shipped
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:pt-2">
              <Reveal delay={0.16}>
                <dl className="border-t rule">
                  {FACTS.map(([value, label]) => (
                    <div key={label} className="flex items-baseline gap-4 border-b rule py-4">
                      <dt className="display w-14 shrink-0 text-[1.75rem] leading-none tabular-nums">
                        {value}
                      </dt>
                      <dd className="text-[0.875rem] leading-snug text-dim">{label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[0.8125rem] text-faint">
                  Open a capability below to see what it actually produces.
                </p>
              </Reveal>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      <ol>
        {services.map((service, index) => (
          <ServiceRow
            key={service.slug}
            service={service}
            index={index}
            tone={toneForRow(index)}
            open={open === index}
            onOpen={() => setOpen(index)}
            onToggle={() => setOpen((current) => (current === index ? null : index))}
          />
        ))}
      </ol>

      <BrandingBlock />

      <FinalCta
        headline={'TELL US WHICH|_part_ IS BROKEN.'}
        note="You do not have to buy all ten. Most engagements start with one workflow that is costing real money, and grow from there."
        action={{ label: 'Start with one workflow', to: '/contact' }}
      />
    </>
  );
}
