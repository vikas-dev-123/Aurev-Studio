import { systems } from '../../data/systems';
import type { SystemDef } from '../../data/systems';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { BlockTag, Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal } from '../animations/Reveal';
import { Action } from '../ui/Action';

type Row = {
  label: string;
  note: string;
  values: Record<SystemDef['key'], string>;
};

/**
 * The same six concepts, named the way each sector names them. This is the
 * argument for one core with four vocabularies, made with nouns instead of
 * adjectives — and it is a real table, so it reads as data to a crawler and to a
 * screen reader, not as a picture of a table.
 */
const ROWS: Row[] = [
  {
    label: 'The record',
    note: 'Created once, at first contact, and never typed again.',
    values: { school: 'Student', care: 'Patient', stay: 'Guest', business: 'Customer' },
  },
  {
    label: 'The daily loop',
    note: 'The screen somebody opens before anything else.',
    values: {
      school: 'Attendance register',
      care: 'OPD queue',
      stay: 'Arrivals & housekeeping',
      business: 'Pipeline review',
    },
  },
  {
    label: 'The money event',
    note: 'Where a number becomes owed, and then paid.',
    values: {
      school: 'Term fee',
      care: 'Discharge bill',
      stay: 'Folio settlement',
      business: 'Invoice',
    },
  },
  {
    label: 'Captured offline',
    note: 'The moment that happens where the signal does not reach.',
    values: {
      school: 'Register, in class',
      care: 'Ward round',
      stay: 'Room status',
      business: 'Site visit',
    },
  },
  {
    label: 'Logs in most',
    note: 'Design for this person and adoption stops being a project.',
    values: {
      school: 'Class teacher',
      care: 'Front desk',
      stay: 'Front office',
      business: 'Deal owner',
    },
  },
  {
    label: 'The report that matters',
    note: 'The one output leadership actually opens.',
    values: {
      school: 'Result sheet',
      care: 'Occupancy & revenue',
      stay: 'Night audit',
      business: 'Weighted pipeline',
    },
  },
];

/**
 * The neutral break after four saturated greens — white on purpose, so the
 * densest information on the page is also the most legible, and so the cut into
 * the ink-black close still reads.
 */
export function SharedCore() {
  return (
    <ColorBlock tone="paper" pad="lg" labelledBy="shared-core">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <BlockTag>Underneath all four</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="shared-core" size="title" className="mt-6">
                {'FOUR SYSTEMS.|ONE _spine_.'}
              </Statement>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dim">
                A school, a hospital, a hotel and a distributor run on the same six ideas wearing
                different words. We build the spine once — identity, roles, permissions, audit
                trail, offline capture, reporting — and then speak your vocabulary on top of it.
                That is why a deployment takes weeks instead of a year.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dim">
                None of the four describe you? The spine does not care. Same core, your nouns.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Action to="/contact" arrow="↗" cursor="open">
                  Map your workflow
                </Action>
                <Action to="/services" variant="bare">
                  How we build it
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {/* Scrollable and focusable: five columns cannot fit a phone, and a
                scroll container the keyboard cannot reach is a dead end. */}
            <div
              role="region"
              aria-label="How the same concept is named in each system"
              tabIndex={0}
              className="-mx-gutter overflow-x-auto px-gutter lg:mx-0 lg:px-0"
            >
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">
                  Six shared concepts and the name each of the four systems gives them.
                </caption>
                <thead>
                  <tr className="border-b rule-strong">
                    <th scope="col" className="eyebrow py-3 pr-6 font-medium text-faint">
                      Concept
                    </th>
                    {systems.map((system) => (
                      <th
                        scope="col"
                        key={system.key}
                        className="py-3 pr-5 align-bottom text-[0.8125rem] font-semibold tracking-[-0.01em]"
                      >
                        {system.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label} className="border-b rule align-top">
                      <th scope="row" className="max-w-[13rem] py-4 pr-6 font-normal">
                        <span className="block text-[0.875rem] font-semibold tracking-[-0.01em]">
                          {row.label}
                        </span>
                        <span className="mt-1 block text-[0.75rem] leading-snug text-faint">
                          {row.note}
                        </span>
                      </th>
                      {systems.map((system) => (
                        <td
                          key={system.key}
                          className="py-4 pr-5 text-[0.8125rem] leading-snug text-dim"
                        >
                          {row.values[system.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
