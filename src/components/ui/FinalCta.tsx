import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal } from '../animations/Reveal';
import { Action } from './Action';
import { site } from '../../data/site';

/**
 * The closing block on every page. Always ink-black: after a page of colour the
 * exit should feel like the lights coming up, and it keeps the footer transition
 * from stacking two hues.
 */
export function FinalCta({
  headline = 'LET’S BUILD THE|_system_ YOU|ACTUALLY NEED.',
  note = 'Tell us what breaks, what it costs you, and what you want it to feel like. We will come back with scope, sequence and a number.',
  action = { label: 'Start a project', to: '/contact' },
}: {
  headline?: string;
  note?: string;
  action?: { label: string; to: string };
}) {
  return (
    <ColorBlock tone="ink" pad="lg" label="Start a project">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Statement size="statement">{headline}</Statement>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            <Reveal delay={0.1}>
              <p className="text-[0.9375rem] leading-relaxed text-dim">{note}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="flex flex-wrap items-center gap-3">
                <Action to={action.to} size="lg" arrow="↗" cursor="open">
                  {action.label}
                </Action>
                <Action href={`mailto:${site.email}`} variant="bare">
                  {site.email}
                </Action>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t rule pt-5 text-[0.75rem] text-faint sm:grid-cols-3">
          <p>Replies within one working day.</p>
          <p>{site.serviceArea}</p>
          <p className="sm:text-right">No retainer required to start.</p>
        </div>
      </Shell>
    </ColorBlock>
  );
}
