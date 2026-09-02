import type { SystemDef } from '../../data/systems';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { Screen } from '../product/Screen';

/**
 * One system, one pink.
 *
 * The left column is sticky, so the name and the module list stay in place while
 * the proof scrolls past on the right — which is the honest way round: the claim
 * should be visible for as long as the evidence takes to read. The section does
 * not clip, because an `overflow: hidden` ancestor would quietly disable that.
 */
export function SystemSection({ system, index }: { system: SystemDef; index: number }) {
  const titleId = `system-${system.key}`;

  return (
    <ColorBlock
      tone={system.productTone}
      pad="lg"
      clip={false}
      id={system.key}
      labelledBy={titleId}
      className="scroll-mt-[calc(var(--nav-h)+1rem)]"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-dim">
                <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <span aria-hidden className="h-px w-7 bg-[currentColor] opacity-40" />
                {system.industry}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <Statement id={titleId} as="h2" size="title" className="mt-5">
                {system.name.toUpperCase()}
              </Statement>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="voice mt-4 text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.3]">
                {system.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-[0.8125rem] leading-relaxed text-faint">
                For {system.forWho.toLowerCase()}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="eyebrow mt-8 border-t rule pt-5 text-faint">
                {system.modules.length} modules
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {system.modules.map((module) => (
                <RevealItem
                  key={module}
                  as="li"
                  className="flex items-baseline gap-2.5 text-[0.8125rem]"
                >
                  <span aria-hidden className="mt-[0.4rem] h-1 w-1 shrink-0 bg-[currentColor]" />
                  {module}
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.24}>
              <div className="mt-9">
                <Action to="/contact" arrow="↗" cursor="open">
                  Deploy {system.name}
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div data-cursor="explore">
                <Screen screen={system.dashboard} chrome="app" ratio="16 / 10" />
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-7">
              <Reveal delay={0.14}>
                <div className="border-t rule-strong pt-5">
                  <p className="eyebrow text-faint">Today</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed">{system.problem}</p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="border-t rule-strong pt-5">
                  <p className="eyebrow text-faint">Once it is running</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed">{system.shift}</p>
                </div>
              </Reveal>
            </div>

            <RevealGroup
              as="dl"
              className="mt-9 grid gap-x-6 gap-y-5 border-t rule pt-6 sm:grid-cols-3"
            >
              {system.outcomes.map((outcome) => (
                <RevealItem key={outcome.label}>
                  <dt className="display text-[1.625rem] leading-none tabular-nums">
                    {outcome.metric}
                  </dt>
                  <dd className="mt-2 text-[0.75rem] leading-snug text-dim">{outcome.label}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
