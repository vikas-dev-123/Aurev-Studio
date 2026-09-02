import type { Project } from '../../data/work';
import { cn } from '../../lib/utils';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Screen } from '../product/Screen';

/**
 * A bento cell that owns its own flat colour.
 *
 * This is the one place on the site where the three hues appear in the same
 * viewport — and they still never touch, because every cell is a separate block
 * and the ink gutter between them is the hard cut. The software inside stays in
 * its neutral graphite frame, so no card ever tints a dashboard.
 */
export function ProjectCard({ project }: { project: Project }) {
  const spans: Record<Project['span'], string> = {
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    12: 'lg:col-span-12',
  };

  return (
    <ColorBlock
      tone={project.tone}
      as="li"
      pad="none"
      className={cn('group flex flex-col', spans[project.span])}
      contentClassName="flex flex-1 flex-col"
    >
      <div
        className={cn(
          'flex flex-1 flex-col p-6 sm:p-8 lg:p-9',
          project.tall && 'lg:justify-between',
        )}
      >
        <header>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-dim">
            <span>{project.sector}</span>
            <span aria-hidden className="h-1 w-1 bg-[currentColor] opacity-50" />
            <span className="tabular-nums">{project.year}</span>
          </p>
          <h3
            className={cn(
              'display mt-4 text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[0.95]',
              project.span >= 7 && 'max-w-[24ch]',
            )}
          >
            {project.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-dim">
            {project.summary}
          </p>
        </header>

        <dl
          className={cn(
            'mt-7 grid gap-x-6 gap-y-3 border-t rule pt-5',
            project.metrics.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2',
          )}
        >
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="display text-[1.5rem] leading-none tabular-nums">{metric.value}</dt>
              <dd className="mt-1.5 text-[0.75rem] leading-snug text-dim">{metric.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-1.5">
          {[...project.scope, ...project.stack].map((tag) => (
            <span
              key={tag}
              className="border rule-strong px-2.5 py-1 text-[0.6875rem] tracking-[0.02em] text-dim"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 transition-transform duration-700 ease-expo group-hover:-translate-y-1">
          <Screen
            screen={project.preview}
            chrome={project.preview === 'site' ? 'browser' : 'app'}
            ratio={project.tall ? '16 / 11' : '16 / 9'}
          />
        </div>
      </div>
    </ColorBlock>
  );
}
