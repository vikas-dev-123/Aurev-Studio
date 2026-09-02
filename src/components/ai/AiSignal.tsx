import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { Screen } from '../product/Screen';
import { SignalFlow } from '../systems/SignalFlow';
import { signalStages } from '../../data/ai';
import { useMotionOk } from '../../hooks/useMediaQuery';

/**
 * The signal, scrubbed by the page scroll.
 *
 * The five stages advance as the block moves up the viewport, so reading speed and
 * animation speed are the same thing. With reduced motion the `active` prop is
 * withheld and SignalFlow renders its finished state instead.
 */
export function AiSignal() {
  const motionOk = useMotionOk();
  const flow = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: flow,
    offset: ['start 85%', 'end 35%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const last = signalStages.length - 1;
    const next = Math.max(0, Math.min(last, Math.round(p * last)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <ColorBlock tone="green-deep" pad="lg" labelledBy="signal-title">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <BlockTag>One message, five stages</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="signal-title" as="h2" size="statement" className="mt-6">
                {'NINE SECONDS,|AND A _line_|IN THE LOG.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed">
                Nothing here is a chat window bolted onto a website. The agent reads the same records
                your staff read, acts through the same permissions, and stops the moment it is not
                sure.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={flow} className="mt-14 lg:mt-20">
          <SignalFlow active={motionOk ? active : undefined} verbose />
        </div>

        <div className="mt-14 grid gap-10 border-t rule pt-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div data-cursor="explore">
                <Screen screen="automation" chrome="browser" ratio="16 / 10" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="eyebrow text-faint">The receipt</p>
              <p className="voice mt-4 text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.3]">
                A manager will not let software touch the fee ledger on trust.
              </p>
              <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-relaxed">
                So every run is a record: what arrived, what the agent understood, which tool it
                called, what it sent, and the moments it refused and handed over. Exportable, and
                readable by someone who has never seen a prompt.
              </p>
              <div className="mt-8">
                <Action href="#guardrails" variant="bare" arrow="→">
                  The four guardrails
                </Action>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
