import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { services } from '../../data/services';
import { systems } from '../../data/systems';

/**
 * The distinction the rest of the page depends on.
 *
 * Ink, not pink: this block is the argument, and the four pink product sections
 * that follow are the evidence — putting it on the page base makes the pinks read
 * as one sequence instead of five.
 */
const CONTRASTS = [
  {
    head: 'What you are buying',
    service: 'A team, against a scope of work we agree before it starts.',
    system: 'A platform that already runs, configured to how you operate.',
  },
  {
    head: 'Where it begins',
    service: 'A blank file and the workflow map from the first workshop.',
    system: 'Modules that already carry your vocabulary on day one.',
  },
  {
    head: 'What you end up owning',
    service: 'Every repository, design file and credential, at handover.',
    system: 'Your data and your customisations. Source available on request.',
  },
];

export function ServicesVsSystems() {
  return (
    <ColorBlock tone="ink" pad="lg" labelledBy="vs-title">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <BlockTag>Two different things we sell</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="vs-title" as="h2" size="statement" className="mt-6">
                {'HIRE THE TEAM.|OR _deploy_|THE SYSTEM.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-dim">
                Most studios only sell the first column. We sell both, and the difference matters
                before you sign anything: one is a team you hire, the other is software that already
                exists and gets bent to fit your process.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="border-t rule-strong pt-6 lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-faint">Services — you hire the team</p>
              <p className="display mt-4 text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.05]">
                Work, scoped and delivered
              </p>
              <p className="mt-4 max-w-[40ch] text-[0.875rem] leading-relaxed text-dim">
                Ten capabilities, sequenced into one programme. Priced per phase, with the source and
                the design files handed over at the end of each one.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {services.map((service, index) => (
                <RevealItem
                  key={service.slug}
                  as="li"
                  className="flex items-baseline gap-3 text-[0.875rem]"
                >
                  <span aria-hidden className="text-[0.6875rem] tabular-nums text-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {service.title}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="border-t rule-strong pt-6 lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-faint">Systems — you deploy the product</p>
              <p className="display mt-4 text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.05]">
                Software that already exists
              </p>
              <p className="mt-4 max-w-[46ch] text-[0.875rem] leading-relaxed text-dim">
                Four operating systems, each built from a live deployment rather than a template.
                You get the modules below in week one and the ones you actually need after that.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-7">
              {systems.map((system) => (
                <RevealItem key={system.key} as="li" className="border-b rule">
                  <a
                    href={`#${system.key}`}
                    data-cursor="view"
                    className="group flex items-baseline justify-between gap-6 py-4 transition-opacity duration-300 hover:opacity-65"
                  >
                    <span className="min-w-0">
                      <span className="display block text-[1.125rem] leading-none">
                        {system.name}
                      </span>
                      <span className="mt-1.5 block text-[0.8125rem] leading-snug text-dim">
                        {system.industry} · {system.modules.length} modules
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-[0.9375rem] transition-transform duration-300 ease-expo group-hover:translate-y-0.5"
                    >
                      ↓
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <RevealGroup as="dl" className="mt-14 grid gap-x-6 gap-y-8 border-t rule pt-6 sm:grid-cols-3">
          {CONTRASTS.map((row) => (
            <RevealItem key={row.head}>
              <dt className="eyebrow text-faint">{row.head}</dt>
              <dd className="mt-4 text-[0.875rem] leading-relaxed">
                <span className="text-faint">Services — </span>
                {row.service}
              </dd>
              <dd className="mt-3 text-[0.875rem] leading-relaxed">
                <span className="text-faint">Systems — </span>
                {row.system}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </ColorBlock>
  );
}
