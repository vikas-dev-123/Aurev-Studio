import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { aiGuardrails } from '../../data/ai';

/**
 * The fine print, set properly.
 *
 * White, tight vertical rhythm and no headline theatrics: this is the block a
 * cautious buyer reads twice, so it is the one place on the page that looks like a
 * document rather than a pitch. Nothing here claims a certification we do not hold.
 */
export function Guardrails() {
  return (
    <ColorBlock
      tone="paper"
      pad="md"
      id="guardrails"
      labelledBy="guardrails-title"
      className="scroll-mt-[calc(var(--nav-h)+1rem)]"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-faint">Guardrails</p>
            </Reveal>
            <Reveal delay={0.06}>
              <Statement id="guardrails-title" as="h2" size="title" className="mt-5">
                {'WHAT IT IS NOT|_allowed_ TO DO.'}
              </Statement>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[38ch] text-[0.875rem] leading-relaxed text-dim">
                Every agent we ship is scoped, logged and interruptible. These four are not options
                on a plan — they are how it is built.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup as="dl" className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {aiGuardrails.map((rail, index) => (
                <RevealItem key={rail.title} className="border-t rule-strong pt-5">
                  <dt className="flex items-baseline gap-3 text-[1rem] font-medium tracking-[-0.01em]">
                    <span aria-hidden className="text-[0.6875rem] tabular-nums text-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {rail.title}
                  </dt>
                  <dd className="mt-2.5 max-w-[40ch] text-[0.875rem] leading-relaxed text-dim">
                    {rail.detail}
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.16}>
              <p className="mt-10 max-w-[70ch] border-t rule pt-5 text-[0.8125rem] leading-relaxed text-faint">
                We do not list certifications we have not earned. If procurement needs a specific
                standard — ISO, SOC 2, a state data-residency rule — name it and we will tell you
                plainly whether we meet it today, what it would take, and who would audit it.
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
