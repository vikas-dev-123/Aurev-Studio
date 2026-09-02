import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';

const FRICTION = [
  'Attendance in a register, fees in a spreadsheet, marks on a shared drive.',
  'Four booking sites, four different rates, one guest at the desk who found the cheapest.',
  'Leads in a personal inbox, quotations in a folder, revenue certainty at quarter end.',
];

const MOVES = [
  {
    n: '01',
    title: 'Map it',
    note: 'With the people who do the work — the front desk, the accounts clerk, the ward nurse.',
  },
  {
    n: '02',
    title: 'Build it',
    note: 'One record, one login, your own rules. You own the data model and the source.',
  },
  {
    n: '03',
    title: 'Run it',
    note: 'We stay on after launch, because launch is the easy part of operational software.',
  },
];

/**
 * The first colour cut of the site: ink to yellow with no transition at all, then
 * yellow to green as a clip-path wipe. Two neighbouring hues, never interpolated —
 * one flat colour arrives over the other.
 */
export function WorkflowCut() {
  return (
    <>
      <ColorBlock tone="yellow" pad="lg" label="The problem" grid>
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>Where it starts</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement size="statement" className="mt-6">
                  {'YOUR BUSINESS|ALREADY HAS A|_workflow_.'}
                </Statement>
              </Reveal>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5">
              <Reveal delay={0.14}>
                <p className="text-[0.9375rem] leading-relaxed">
                  It is running right now, in people’s heads and in files nobody wants to open. The
                  cost is not the software you don’t have — it is the hour a day spent reconciling
                  what you do have.
                </p>
              </Reveal>
              <RevealGroup as="ul" className="mt-8 border-t rule">
                {FRICTION.map((line) => (
                  <RevealItem
                    key={line}
                    as="li"
                    className="border-b rule py-3.5 text-[0.875rem] leading-snug"
                  >
                    {line}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      <ColorBlock tone="green" pad="lg" label="What we do" wipe="up">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Statement size="statement">
                  {'WE TURN THAT|_workflow_ INTO|SOFTWARE.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-9">
                  <Action to="/approach" arrow="→" cursor="open">
                    How the work happens
                  </Action>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <RevealGroup as="ol" className="border-t rule">
                {MOVES.map((move) => (
                  <RevealItem key={move.n} as="li" className="border-b rule py-5">
                    <div className="flex gap-5">
                      <span className="display text-[1.375rem] leading-none opacity-45">
                        {move.n}
                      </span>
                      <div>
                        <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em]">
                          {move.title}
                        </h3>
                        <p className="mt-1.5 max-w-[38ch] text-[0.875rem] leading-relaxed opacity-75">
                          {move.note}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Shell>
      </ColorBlock>
    </>
  );
}
