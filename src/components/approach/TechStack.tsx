import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { techStack } from '../../data/approach';

/**
 * The stack, on the page base.
 *
 * Ink because this is reference material rather than argument, and because a black
 * section between two pinks stops the process and the reasons from running together.
 */
export function TechStack() {
  return (
    <ColorBlock tone="ink" pad="lg" labelledBy="stack-title">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-faint">The stack</p>
            </Reveal>
            <Reveal delay={0.06}>
              <Statement id="stack-title" as="h2" size="title" className="mt-5">
                {'CHOSEN FOR THE|_fifth_ YEAR.'}
              </Statement>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-dim">
                Boring where it should be boring. Every choice here has a hiring pool, a support
                story and a migration path — which matters more than benchmarks once the system is
                the thing your operation depends on.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[38ch] text-[0.8125rem] leading-relaxed text-faint">
                And we are not religious about it. If your IT team has standardised on .NET and SQL
                Server, we build on .NET and SQL Server.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup as="dl" className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {techStack.map((group) => (
                <RevealItem key={group.group} className="border-t rule-strong pt-5">
                  <dt className="eyebrow text-faint">{group.group}</dt>
                  <dd className="mt-3.5">
                    <ul className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-[0.9375rem]">
                      {group.items.map((item, index) => (
                        <li key={item} className="flex items-baseline gap-2.5">
                          {index > 0 ? (
                            <span aria-hidden className="text-faint">
                              /
                            </span>
                          ) : null}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
