import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { aiCapabilities } from '../../data/ai';

/**
 * Twelve capabilities as an index, not twelve cards.
 *
 * Hover raises the example line rather than revealing it: content that only exists
 * on hover is content most visitors never see, no touch device can reach and no
 * screen reader announces. It is always in the DOM, always readable, and hovering
 * simply brings it forward.
 */
export function Capabilities() {
  return (
    <ColorBlock tone="green" pad="lg" labelledBy="capabilities-title">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <BlockTag>{aiCapabilities.length} capabilities in production</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="capabilities-title" as="h2" size="statement" className="mt-6">
                {'TWELVE JOBS.|NONE OF THEM|A _demo_.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed">
                Each one is running somewhere against real records, and each one was built because a
                person was doing it by hand at a keyboard. The line under each is what it replaced.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup
          as="ul"
          className="mt-14 grid border-t rule lg:mt-20 lg:grid-flow-col lg:grid-rows-6 lg:gap-x-14"
        >
          {aiCapabilities.map((capability, index) => (
            <RevealItem
              key={capability.title}
              as="li"
              className="group border-b rule py-5 lg:py-6"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="display w-6 shrink-0 text-[0.8125rem] leading-none tabular-nums opacity-40"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[0.8125rem] leading-relaxed opacity-70">
                    {capability.detail}
                  </p>
                  <p className="mt-3 flex items-baseline gap-2 text-[0.8125rem] leading-relaxed opacity-45 transition-opacity duration-300 group-hover:opacity-100">
                    <span aria-hidden className="shrink-0">
                      →
                    </span>
                    <span>{capability.example}</span>
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 grid gap-8 border-t rule-strong pt-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="voice text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.3]">
                If the thing you repeat every morning is not on the list, it is still probably
                automatable.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <Reveal delay={0.1}>
              <Action to="/contact" arrow="↗" cursor="open">
                Describe the task
              </Action>
            </Reveal>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
