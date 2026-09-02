import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { ServicesVsSystems } from '../components/products/ServicesVsSystems';
import { SystemSection } from '../components/products/SystemSection';
import { ReportingLayer } from '../components/products/ReportingLayer';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { productsLd } from '../data/schema';
import { systems } from '../data/systems';
import { routeFor } from '../data/site';

const route = routeFor('/products')!;
const jsonLd = [...productsLd, breadcrumb(route.label, route.path)];

/**
 * The pink route. Header in pink, the distinction on ink, then four sticky
 * product sections alternating deep and bright, the reporting layer in deep, and
 * the ink close — a different ending from /industries on purpose.
 */
export function ProductsPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <ColorBlock tone="pink" pad="lg" grid labelledBy="products-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="products-title" as="h1" size="statement" className="mt-6">
                  {'SERVICES VS.|_systems_.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[52ch] text-dim">
                  School OS, Care OS, Stay OS and Business OS. Four platforms that already run
                  somewhere, with the modules, the roles and the reports a real operation needs — so
                  your first release is a configuration, not a rewrite.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Book a walkthrough
                  </Action>
                  <Action to="/industries" variant="outline" arrow="→" cursor="explore">
                    See them by sector
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.16}>
                <p className="eyebrow text-faint">Jump to a system</p>
              </Reveal>
              <RevealGroup as="ul" className="mt-4 border-t rule">
                {systems.map((system, index) => (
                  <RevealItem key={system.key} as="li" className="border-b rule">
                    <a
                      href={`#${system.key}`}
                      data-cursor="view"
                      className="group flex items-baseline gap-4 py-3.5 transition-opacity duration-300 hover:opacity-65"
                    >
                      <span
                        aria-hidden
                        className="display w-6 shrink-0 text-[0.875rem] leading-none tabular-nums opacity-45"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9375rem] font-medium tracking-[-0.01em]">
                          {system.name}
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-dim">
                          {system.modules.length} modules · {system.industry.toLowerCase()}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-[0.75rem] transition-transform duration-300 ease-expo group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      <ServicesVsSystems />

      {systems.map((system, index) => (
        <SystemSection key={system.key} system={system} index={index} />
      ))}

      <ReportingLayer />

      <FinalCta
        headline={'PICK ONE.|WE _configure_|FROM THERE.'}
        note="Name the system closest to your operation and the one module you would want live first. We will come back with the configuration, the migration plan and a number."
        action={{ label: 'Start with one module', to: '/contact' }}
      />
    </>
  );
}
