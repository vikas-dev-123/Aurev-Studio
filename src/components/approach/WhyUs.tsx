import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { whyUs } from '../../data/approach';
import { cn } from '../../lib/utils';

/**
 * Five reasons, alternating sides.
 *
 * The zigzag is done with `order` and column spans rather than two different row
 * components, so the DOM order stays 01→05 and a screen reader or a keyboard user
 * gets the sequence in the order it is numbered.
 */
export function WhyUs() {
  return (
    <ColorBlock tone="pink" pad="lg" labelledBy="why-title">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <BlockTag>Why the work holds up</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="why-title" as="h2" size="statement" className="mt-6">
                {'WHY IT _lasts_|PAST THE|FIRST YEAR.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed">
                Most internal software is abandoned rather than replaced. These five are the habits
                that decide whether a system is still the one people open in year three.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ol" className="mt-14 border-b rule lg:mt-20">
          {whyUs.map((reason, index) => {
            const flip = index % 2 === 1;
            return (
              <RevealItem
                key={reason.title}
                as="li"
                className="grid gap-5 border-t rule py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
              >
                <div className={cn('lg:col-span-5', flip && 'lg:order-2 lg:text-right')}>
                  <p
                    aria-hidden
                    className="display text-[0.8125rem] leading-none tabular-nums opacity-40"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="display mt-4 text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1]">
                    {reason.title}
                  </h3>
                </div>
                <div className={cn('lg:col-span-7', flip && 'lg:order-1')}>
                  <p className="max-w-[56ch] text-[1rem] leading-relaxed lg:mt-7">
                    {reason.detail}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Shell>
    </ColorBlock>
  );
}
