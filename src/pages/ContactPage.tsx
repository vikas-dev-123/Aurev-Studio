import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Configurator } from '../components/contact/Configurator';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { contactLd } from '../data/schema';
import { routeFor, site } from '../data/site';

const route = routeFor('/contact')!;
const jsonLd = [...contactLd, breadcrumb(route.label, route.path)];

const NEXT = [
  {
    label: 'A reply from a person',
    note: 'Within one working day, from whoever would actually work on it. Not an autoresponder with a ticket number.',
  },
  {
    label: 'A forty-minute call',
    note: 'We walk through how the work happens today and which part of it is costing you the most.',
  },
  {
    label: 'A written scope',
    note: 'Phases, deliverables and a fixed price per phase — so you can approve one phase at a time, not a whole year.',
  },
];

/**
 * The configurator is the page: step one renders as the H1, so there is no
 * separate header block competing with it. The white block underneath is the
 * escape hatch for anyone who would rather just send an email.
 */
export function ContactPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <Configurator />

      <ColorBlock tone="paper" pad="md" labelledBy="direct-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-faint">Direct</p>
              </Reveal>
              <Reveal delay={0.06}>
                <Statement id="direct-title" as="h2" size="title" className="mt-5">
                  {'OR SKIP THE|STEPS AND JUST|_write_ TO US.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.12}>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="open"
                  className="display mt-7 block break-words text-[clamp(1.25rem,3vw,2rem)] leading-[1.1] transition-opacity duration-300 hover:opacity-65"
                >
                  {site.email}
                </a>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-[36ch] text-[0.8125rem] leading-relaxed text-dim">
                  {site.serviceArea}. Discovery and training happen in your building; everything else
                  happens wherever the work is done best.
                </p>
              </Reveal>
              <RevealGroup as="ul" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {site.social.map((channel) => (
                  <RevealItem key={channel.label} as="li">
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="open"
                      className="eyebrow border-b rule-strong pb-1 transition-opacity duration-300 hover:opacity-65"
                    >
                      {channel.label}
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="eyebrow text-faint">What happens next</p>
              </Reveal>
              <RevealGroup as="ol" className="mt-4 border-t rule">
                {NEXT.map((item, index) => (
                  <RevealItem as="li" key={item.label} className="border-b rule py-5">
                    <div className="flex items-baseline gap-3">
                      <span aria-hidden className="text-[0.6875rem] tabular-nums text-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[1rem] font-medium tracking-[-0.01em]">{item.label}</p>
                    </div>
                    <p className="mt-1.5 max-w-[44ch] pl-[1.6rem] text-[0.8125rem] leading-relaxed text-dim">
                      {item.note}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
              <Reveal delay={0.14}>
                <p className="mt-8 max-w-[44ch] text-[0.8125rem] leading-relaxed text-faint">
                  If we are not the right people for it, we will say so on that call and tell you
                  what kind of team is. That answer is free and usually faster than a proposal.
                </p>
              </Reveal>
            </div>
          </div>
        </Shell>
      </ColorBlock>
    </>
  );
}
