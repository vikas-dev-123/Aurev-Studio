import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { securityPractices } from '../../data/approach';

/**
 * Security on white, full width.
 *
 * Same convention as the guardrails block on /ai: the material a cautious buyer
 * reads twice sits on paper and is laid out like a document. Practices we implement
 * are listed; certifications we have not been audited for are not.
 */
export function SecurityBlock() {
  return (
    <ColorBlock tone="paper" pad="md" labelledBy="security-title">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-faint">Security</p>
            </Reveal>
            <Reveal delay={0.06}>
              <Statement id="security-title" as="h2" size="title" className="mt-5">
                {'ACCESS, LOGGED|AND _reversible_.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.12}>
              <p className="max-w-[42ch] text-[0.875rem] leading-relaxed text-dim">
                Student records, patient notes, guest identity documents, customer contracts. The
                eight practices below are in every build, not a hardening phase we quote separately.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup
          as="dl"
          className="mt-12 grid gap-x-8 gap-y-8 border-t rule pt-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {securityPractices.map((practice, index) => (
            <RevealItem key={practice.title}>
              <dt className="flex items-baseline gap-3 text-[0.9375rem] font-medium tracking-[-0.01em]">
                <span aria-hidden className="text-[0.6875rem] tabular-nums text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {practice.title}
              </dt>
              <dd className="mt-2 text-[0.8125rem] leading-relaxed text-dim">{practice.detail}</dd>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.14}>
          <div className="mt-12 grid gap-6 border-t rule-strong pt-6 lg:grid-cols-12 lg:gap-14">
            <p className="text-[0.8125rem] leading-relaxed lg:col-span-6">
              <span className="font-medium">Where it runs is your decision.</span> Our managed
              infrastructure, your own cloud account, or on-premise where regulation or a board
              policy requires it. Data residency is a choice you make at Define, not a default we
              impose at Launch.
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-faint lg:col-span-5 lg:col-start-8">
              This is a list of practices we implement. It is not a compliance badge — if a standard
              is a hard requirement for you, raise it on the first call and we will tell you exactly
              where we stand.
            </p>
          </div>
        </Reveal>
      </Shell>
    </ColorBlock>
  );
}
