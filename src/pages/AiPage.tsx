import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { AiSignal } from '../components/ai/AiSignal';
import { Capabilities } from '../components/ai/Capabilities';
import { Guardrails } from '../components/ai/Guardrails';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { aiLd } from '../data/schema';
import { routeFor } from '../data/site';

const route = routeFor('/ai')!;
const jsonLd = [...aiLd, breadcrumb(route.label, route.path)];

/**
 * The second green route. Header green, the scrubbed signal in deep, the twelve
 * capabilities back in bright, the guardrails on white, then the ink close.
 */
const FACTS = [
  { metric: '9:40pm', label: 'When the last fee enquiry of the day actually arrives.' },
  { metric: '71%', label: 'Of fee and syllabus questions answered without a staff reply.' },
  { metric: '12 min', label: 'First response on support tickets, down from nine hours.' },
];

export function AiPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <ColorBlock tone="green" pad="lg" grid labelledBy="ai-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="ai-title" as="h1" size="statement" className="mt-6">
                  {'THE HALF OF|THE INBOX THAT|_answers_ ITSELF.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[52ch] text-dim">
                  Enquiries, appointments, reminders, reconciliations, document entry. We put agents
                  and automation inside the system you already run — reading your records, following
                  your rules, escalating to a person the moment they are unsure.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Automate one workflow
                  </Action>
                  <Action to="/products" variant="outline" arrow="→" cursor="explore">
                    Where it plugs in
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.16}>
                <p className="eyebrow text-faint">From live deployments</p>
              </Reveal>
              <RevealGroup as="dl" className="mt-5 border-t rule">
                {FACTS.map((fact) => (
                  <RevealItem key={fact.metric} className="border-b rule py-5">
                    <dt className="display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none tabular-nums">
                      {fact.metric}
                    </dt>
                    <dd className="mt-2.5 max-w-[34ch] text-[0.8125rem] leading-relaxed text-dim">
                      {fact.label}
                    </dd>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      <AiSignal />

      <Capabilities />

      <Guardrails />

      <FinalCta
        headline={'START WITH|_one_ REPETITIVE|TASK.'}
        note="Pick the job somebody on your team does forty times a day. We will scope that one, prove it against your own records, and only then talk about the second."
        action={{ label: 'Automate one workflow', to: '/contact' }}
      />
    </>
  );
}
