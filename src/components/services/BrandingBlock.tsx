import { brandingWork } from '../../data/services';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { BlockTag, Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { ServicePreview } from './ServicePreview';

/**
 * The branding sub-block. It closes /services on a neutral surface because an
 * identity specimen has to be judged against white — and because the page has
 * spent ten rows alternating, so the last thing before the black CTA should be
 * quiet.
 */
export function BrandingBlock() {
  return (
    <ColorBlock tone="paper" pad="lg" labelledBy="branding-title">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <BlockTag>Branding</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="branding-title" size="title" className="mt-6">
                {'MAKE THE FIRST|IMPRESSION _count_.'}
              </Statement>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dim">
                {brandingWork.lede}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9">
                <Action to="/contact" arrow="→" cursor="next">
                  Start with the identity
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ServicePreview kind="identity" />
            </Reveal>
            <RevealGroup as="dl" className="mt-8 grid gap-x-10 border-t rule sm:grid-cols-2">
              {brandingWork.pieces.map((piece) => (
                <RevealItem key={piece.label} className="border-b rule py-3.5">
                  <dt className="text-[0.9375rem] font-medium tracking-[-0.01em]">{piece.label}</dt>
                  <dd className="mt-0.5 text-[0.8125rem] leading-snug text-dim">{piece.note}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
