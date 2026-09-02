
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { processSteps } from '../../data/approach';

/**
 * Six steps on a single rail.
 *
 * Each step is one row, not one card: the useful comparison is across the rows —
 * how long it takes, what happens, what you end up holding — and a row lets the
 * eye run down a column to make it. The rail is drawn as a border on the list, so
 * it grows with the content rather than being a fixed decorative height.
 */
export function ProcessTrack() {
  return (
    <ColorBlock tone="pink-deep" pad="lg" id="process" labelledBy="process-title">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <BlockTag>Discover to evolve</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="process-title" as="h2" size="statement" className="mt-6">
                {'SIX STEPS.|NO _mystery_|IN THE MIDDLE.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed">
                Every phase ends with something you can open, read or click — a map, a price, a
                prototype, a staging link. If a phase produces only a status report, it was the wrong
                phase.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ol" className="mt-14 lg:mt-20 lg:border-l rule">
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.label}
              as="li"
              className="relative border-t rule py-7 first:border-t-0 lg:pl-10 lg:first:border-t"
            >
              <span
                aria-hidden
                className="absolute left-0 top-7 hidden h-px w-5 bg-[currentColor] opacity-40 lg:block"
              />
              <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <p className="eyebrow flex items-center gap-3 text-faint">
                    <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <span aria-hidden className="h-px w-6 bg-[currentColor] opacity-40" />
                    {step.duration}
                  </p>
                  <h3 className="display mt-3 text-[clamp(1.75rem,3.4vw,2.625rem)] leading-[0.95]">
                    {step.label.toUpperCase()}
                  </h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[1rem] leading-relaxed">{step.summary}</p>
                  <ul className="mt-4 grid gap-2">
                    {step.work.map((item) => (
                      <li key={item} className="flex items-baseline gap-2.5 text-[0.8125rem] text-dim">
                        <span
                          aria-hidden
                          className="mt-[0.4rem] h-1 w-1 shrink-0 bg-[currentColor]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4">
                  <p className="eyebrow text-faint">What you end up holding</p>
                  <p className="mt-2.5 max-w-[34ch] text-[0.9375rem] leading-relaxed">
                    {step.output}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[68ch] border-t rule-strong pt-6 text-[0.8125rem] leading-relaxed">
            Ranges, not promises. A single-campus school with clean data lands at the short end of
            every phase; four campuses with fifteen years of spreadsheets do not, and we say which
            one you are in the week we finish Discover.
          </p>
        </Reveal>
      </Shell>
    </ColorBlock>
  );
}
