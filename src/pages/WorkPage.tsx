import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { ProjectCard } from '../components/work/ProjectCard';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { workLd } from '../data/schema';
import { projects } from '../data/work';
import { routeFor } from '../data/site';

const route = routeFor('/work')!;
const jsonLd = [...workLd, breadcrumb(route.label, route.path)];

/** What is true of all six, stated once instead of repeated in every card. */
const COMMON: [string, string][] = [
  ['One record', 'A student, patient, guest or customer exists once, not in four systems.'],
  ['Offline first', 'Registers, rounds and room status are captured where the signal is not.'],
  ['Source handed over', 'Every repository, every credential, documented. No hostage code.'],
  ['Trained, then supported', 'Staff learn it in an afternoon; we stay reachable after launch.'],
];

/**
 * The yellow route, opened and closed in yellow with the bento on black.
 *
 * The grid is the only place on the site where yellow, green and pink appear
 * together — and they still never meet, because each cell is its own block and
 * the ink gutter between them is the cut.
 */
export function WorkPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <ColorBlock tone="yellow" pad="lg" grid labelledBy="work-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="work-title" as="h1" size="statement" className="mt-6">
                  {'SIX SYSTEMS.|STILL _running_|EVERY MORNING.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[50ch] text-dim">
                  Client names are withheld where the contract asks for it, so each build is
                  labelled by sector and size instead. The numbers are the ones the operators
                  themselves report.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Build something like this
                  </Action>
                  <Action to="/products" variant="outline" arrow="→" cursor="explore">
                    The systems behind them
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.16}>
                <p className="eyebrow text-faint">In this page</p>
              </Reveal>
              <RevealGroup as="ol" className="mt-4 border-t rule">
                {projects.map((project, index) => (
                  <RevealItem
                    key={project.slug}
                    as="li"
                    className="flex items-baseline gap-4 border-b rule py-3"
                  >
                    <span
                      aria-hidden
                      className="display w-6 shrink-0 text-[0.875rem] leading-none tabular-nums opacity-45"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1 text-[0.9375rem] font-medium tracking-[-0.01em]">
                      {project.title}
                    </span>
                    <span className="shrink-0 text-[0.75rem] tabular-nums text-faint">
                      {project.year}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      {/* Full-bleed bento: the 6px ink gutter is the hard cut between hues. */}
      <ColorBlock tone="ink" pad="none" label="Selected systems">
        <ol className="grid gap-1.5 p-1.5 lg:grid-cols-12">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ol>
      </ColorBlock>

      <ColorBlock tone="yellow" pad="lg" labelledBy="work-common">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Statement id="work-common" size="title">
                  {'WHAT ALL SIX|HAVE IN _common_.'}
                </Statement>
              </Reveal>
            </div>
            <RevealGroup as="dl" className="border-t rule lg:col-span-7">
              {COMMON.map(([term, note]) => (
                <RevealItem key={term} className="grid gap-1 border-b rule py-5 sm:grid-cols-3">
                  <dt className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{term}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-dim sm:col-span-2">
                    {note}
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Shell>
      </ColorBlock>

      <FinalCta
        headline={'YOUR TURN.|WHAT IS THE|_workflow_?'}
        note="Six of these started as a spreadsheet somebody was afraid to delete. Send us yours and we will tell you what it would take to replace it."
        action={{ label: 'Send us the workflow', to: '/contact' }}
      />
    </>
  );
}
