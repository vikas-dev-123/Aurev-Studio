import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { Screen } from '../product/Screen';

/**
 * The layer that sits above whichever system you run.
 *
 * Composition is mirrored from the four product sections above — screen on the
 * left, argument on the right — so the page does not read as the same layout five
 * times in a row.
 */
const POINTS = [
  {
    label: 'Every number has a source row',
    note: 'Click a total and you land on the records that produced it. There is no exported spreadsheet in the middle of the audit trail.',
  },
  {
    label: 'One definition of a month',
    note: 'Operations, finance and the board read the same closing date, because the system only has one.',
  },
  {
    label: 'Sent, not fetched',
    note: 'Scheduled digests over email and WhatsApp, so leadership stops logging in to find out how yesterday went.',
  },
  {
    label: 'A different first screen per role',
    note: 'Saved views the front desk, the accountant and the trustee each own — same data, three jobs.',
  },
];

export function ReportingLayer() {
  return (
    <ColorBlock tone="pink-deep" pad="lg" labelledBy="reporting-title">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div data-cursor="explore">
                <Screen screen="analytics" chrome="app" ratio="16 / 10" />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-[0.75rem] leading-relaxed text-faint">
                Included with every system. Nothing to integrate, because it reads the same database
                the modules write to.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <BlockTag>Above all four</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="reporting-title" as="h2" size="title" className="mt-5">
                {'THE NUMBERS|LEADERSHIP|_actually_ OPENS.'}
              </Statement>
            </Reveal>
            <RevealGroup as="dl" className="mt-9 border-t rule">
              {POINTS.map((point) => (
                <RevealItem key={point.label} className="border-b rule py-4">
                  <dt className="text-[0.9375rem] font-medium tracking-[-0.01em]">{point.label}</dt>
                  <dd className="mt-1.5 max-w-[42ch] text-[0.8125rem] leading-relaxed text-dim">
                    {point.note}
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.16}>
              <div className="mt-9">
                <Action to="/ai" variant="outline" arrow="→" cursor="explore">
                  And the layer that acts on them
                </Action>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
