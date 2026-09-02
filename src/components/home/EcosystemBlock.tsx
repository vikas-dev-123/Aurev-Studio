import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { Action } from '../ui/Action';
import { ECOSYSTEM_NODES, EcosystemDiagram } from '../systems/EcosystemDiagram';

const CLOSING = [
  { label: 'One login', note: 'Staff learn one interface, not six.' },
  { label: 'One record', note: 'A person is entered once and reconciled never.' },
  { label: 'One report', note: 'The 9am number everyone already agrees on.' },
];

/**
 * The green "system, not a website" block. The diagram carries it on desktop; at
 * phone widths a 960-unit drawing scales its labels down to five pixels, so small
 * screens get the same six modules as a readable list.
 */
export function EcosystemBlock() {
  return (
    <ColorBlock tone="green" pad="lg" label="The system">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <BlockTag>Not a website — a system</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement size="statement" className="mt-6">
                {'ONE _ecosystem_.|EVERY OPERATION.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed">
                Most businesses buy six tools that each know a fifth of the truth. We wire the parts
                you already recognise into one platform that holds the whole record — and then we
                keep it that way.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14 hidden md:block lg:mt-20">
          <EcosystemDiagram className="mx-auto max-w-[68rem]" />
        </Reveal>

        <RevealGroup as="ul" className="mt-12 border-t rule md:hidden">
          {ECOSYSTEM_NODES.map((node) => (
            <RevealItem key={node.label} as="li" className="border-b rule py-3.5">
              <p className="text-[0.9375rem] font-medium">{node.label}</p>
              <p className="mt-0.5 text-[0.8125rem] opacity-70">{node.caption}</p>
            </RevealItem>
          ))}
          <RevealItem as="li" className="ink-fill mt-6 px-4 py-5">
            <p className="text-[1.0625rem] font-semibold tracking-[-0.015em]">ONE SYSTEM</p>
            <p className="mt-1 text-[0.8125rem] opacity-75">one record · one login · one truth</p>
          </RevealItem>
        </RevealGroup>

        <div className="mt-14 grid gap-8 border-t rule pt-8 sm:grid-cols-3">
          {CLOSING.map((item, index) => (
            <Reveal key={item.label} delay={0.06 * index}>
              <p className="display text-[1.5rem] leading-none">{item.label}</p>
              <p className="mt-2.5 max-w-[30ch] text-[0.8125rem] leading-relaxed opacity-75">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10">
            <Action to="/products" arrow="→" cursor="explore">
              See the four systems
            </Action>
          </div>
        </Reveal>
      </Shell>
    </ColorBlock>
  );
}
