import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Marquee } from '../ui/Marquee';
import { Action } from '../ui/Action';
import { Link } from '../../lib/router';
import { services } from '../../data/services';

const WORDS = [
  'DIGITAL SYSTEMS',
  'SOFTWARE',
  'AUTOMATION',
  'AI',
  'DESIGN',
  'ENGINEERING',
];

/** Yellow capability block. The marquee runs edge to edge, so it sits outside the shell. */
export function ServicesTeaser() {
  return (
    <ColorBlock tone="yellow" pad="lg" label="Capabilities">
      <Reveal>
        <Marquee items={WORDS} duration={44} separator="•" className="border-y rule py-4" />
      </Reveal>

      <Shell className="mt-14 lg:mt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <BlockTag>Ten capabilities, one team</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement size="statement" className="mt-6">
                {'ONE TEAM FOR THE|WHOLE _system_,|NOT SIX VENDORS.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed">
                The same people who map the workflow design the interface and ship the code. Nothing
                is handed to a third party and translated twice.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ol" className="mt-12 grid border-t rule sm:grid-cols-2 lg:mt-16">
          {services.map((service, index) => (
            <RevealItem key={service.slug} as="li" className="border-b rule">
              <Link
                to="/services"
                data-cursor="open"
                className="group flex items-baseline gap-4 py-4 transition-opacity duration-300 hover:opacity-60 sm:gap-5"
              >
                <span className="display w-8 shrink-0 text-[1.125rem] leading-none opacity-45">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className="block text-[1.0625rem] font-semibold tracking-[-0.015em]">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug opacity-70">
                    {service.promise}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 pr-1 transition-transform duration-300 ease-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Action to="/services" arrow="→" cursor="open">
              All ten, in detail
            </Action>
            <Action to="/work" variant="outline" arrow="↗" cursor="view">
              See the work
            </Action>
          </div>
        </Reveal>
      </Shell>
    </ColorBlock>
  );
}
