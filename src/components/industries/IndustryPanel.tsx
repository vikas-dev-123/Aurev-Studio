import type { SystemDef } from '../../data/systems';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { Screen } from '../product/Screen';
import { cn } from '../../lib/utils';

/**
 * One industry, one viewport, one green.
 *
 * The four panels alternate green-deep and green so consecutive panels always
 * cut — and because the page header owns the bright green, the sequence has to
 * open on the deep one. The dashboard keeps its graphite frame: the section
 * behind it is what turns green, never the software.
 *
 * The same markup serves the stacked and the pinned-horizontal arrangement; only
 * the width and shrink behaviour change, so there is one layout to maintain and
 * one DOM for crawlers.
 */
export function IndustryPanel({
  system,
  index,
  horizontal = false,
}: {
  system: SystemDef;
  index: number;
  horizontal?: boolean;
}) {
  const titleId = `industry-${system.key}`;

  return (
    <ColorBlock
      tone={system.industryTone}
      pad="none"
      labelledBy={titleId}
      className={cn(
        'flex min-h-[100svh] flex-col justify-center py-[clamp(4.5rem,9vh,6.5rem)]',
        horizontal && 'w-[100vw] shrink-0',
      )}
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
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
              <p className="mt-6 max-w-[44ch] text-[0.9375rem] leading-relaxed text-dim">
                {system.shift}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 border-t rule pt-4 text-[0.8125rem] text-faint">
                For {system.forWho.toLowerCase()}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-7">
                <Action to="/products" variant="outline" arrow="→" cursor="open">
                  Inside {system.name}
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {/* Capped rather than fluid: past ~672px the frame starts to dictate
                the panel's height instead of the copy, and a pinned panel has no
                room to grow. */}
            <Reveal delay={0.12} className="w-full max-w-[42rem]">
              <div data-cursor="explore">
                <Screen screen={system.dashboard} chrome="app" ratio="16 / 10" />
              </div>
            </Reveal>
            <RevealGroup
              as="dl"
              className="mt-6 grid max-w-[42rem] gap-x-6 gap-y-4 border-t rule pt-5 sm:grid-cols-3"
            >
              {system.outcomes.map((outcome) => (
                <RevealItem key={outcome.label}>
                  <dt className="display text-[1.375rem] leading-none tabular-nums">
                    {outcome.metric}
                  </dt>
                  <dd className="mt-1.5 text-[0.75rem] leading-snug text-dim">{outcome.label}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-[42rem] text-[0.75rem] leading-relaxed text-faint">
                <span className="font-medium">Modules</span> — {system.modules.join(' · ')}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
