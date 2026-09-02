import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { Link } from '../lib/router';
import { useSeo } from '../hooks/useSeo';
import { navRoutes, site } from '../data/site';

/**
 * Neutral, one screen, and useful: the nav is the only thing a visitor who landed
 * here actually needs, so the whole route list is the content of the page.
 */
export function NotFoundPage() {
  useSeo({
    title: `Page not found — ${site.name}`,
    description: 'That URL does not exist. Every section of the site is one link away.',
    path: '/404',
    noindex: true,
  });

  return (
    <ColorBlock
      tone="ink"
      pad="screen"
      grid
      labelledBy="notfound-title"
      contentClassName="pt-[var(--nav-h)]"
    >
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <BlockTag>Error 404</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement id="notfound-title" as="h1" size="statement" className="mt-6">
                {'THIS URL|_never_|SHIPPED.'}
              </Statement>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lede mt-8 max-w-[42ch] text-dim">
                Either it moved or it never existed. Nothing is broken on your side — pick a section
                below and carry on.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Action to="/" size="lg" arrow="→" cursor="open">
                  Back to the start
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.16}>
              <p className="eyebrow text-faint">Everything there is</p>
            </Reveal>
            <RevealGroup as="ul" className="mt-4 border-t rule">
              {navRoutes.map((route) => (
                <RevealItem as="li" key={route.path} className="border-b rule">
                  <Link
                    to={route.path}
                    data-cursor="view"
                    className="flex items-baseline justify-between gap-6 py-3.5 transition-opacity duration-300 hover:opacity-65"
                  >
                    <span className="text-[0.9375rem] font-medium tracking-[-0.01em]">
                      {route.label}
                    </span>
                    <span className="text-[0.75rem] text-faint">{route.hint}</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
