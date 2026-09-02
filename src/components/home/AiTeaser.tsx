import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { SignalFlow } from '../systems/SignalFlow';

/**
 * Pink AI teaser. The signal animation is the proof here — it is the same
 * component the /ai page scrubs on scroll, shown once through at a readable pace.
 */
export function AiTeaser() {
  return (
    <ColorBlock tone="pink-deep" pad="lg" label="AI and automation">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <BlockTag>Where AI actually earns its place</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement size="statement" className="mt-6">
                {'SOFTWARE SHOULD|NOT JUST STORE DATA.|IT SHOULD _understand_ IT.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.14}>
              <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed">
                An agent that sits inside your system, follows your rules, and hands the
                conversation to a person the moment it is unsure. No chatbot theatre.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14 lg:mt-20">
          <SignalFlow />
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t rule pt-8">
          <Action to="/ai" arrow="→" cursor="explore">
            AI and automation
          </Action>
          <p className="max-w-[46ch] text-[0.8125rem] leading-relaxed opacity-75">
            Twelve capabilities, one guardrail: if the agent cannot answer from your data, it says
            so and escalates.
          </p>
        </div>
      </Shell>
    </ColorBlock>
  );
}
