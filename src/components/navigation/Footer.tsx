import { ArrowUp } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '../../lib/router';
import { routes, site } from '../../data/site';
import { systems } from '../../data/systems';
import { accentFor } from '../../lib/colors';
import { Logomark } from './Logomark';

const SEGMENTS = ['yellow', 'green', 'pink'] as const;

/**
 * Neutral by rule — the footer sits under nine differently coloured pages, so it
 * is ink-black everywhere and carries the three hues only as a hairline.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="ink" className="relative">
      <div aria-hidden className="flex h-[3px] w-full">
        {SEGMENTS.map((hue) => (
          <span key={hue} className="flex-1" style={{ backgroundColor: accentFor[hue] }} />
        ))}
      </div>

      <div className="mx-auto max-w-shell px-gutter pb-8 pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <Logomark size={26} />
              <span className="display text-[1.0625rem]">{site.name}</span>
            </Link>
            <p className="lede measure mt-5 text-dim">{site.promise}</p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="open"
              className="mt-6 inline-block max-w-full break-all border-b border-white/25 pb-0.5 text-[0.875rem] sm:text-[0.9375rem] font-medium tracking-tight transition-colors hover:border-white"
            >
              {site.email}
            </a>
            <p className="eyebrow mt-5 text-faint">{site.serviceArea}</p>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterList title="Pages">
              {routes
                .filter((route) => route.path !== '/')
                .map((route) => (
                  <li key={route.path}>
                    <Link to={route.path} className="footer-link">
                      {route.label}
                    </Link>
                  </li>
                ))}
            </FooterList>

            <FooterList title="Systems">
              {systems.map((system) => (
                <li key={system.key}>
                  <Link to="/products" className="footer-link">
                    {system.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/ai" className="footer-link">
                  AI &amp; Automation
                </Link>
              </li>
            </FooterList>

            <FooterList title="Elsewhere">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer-link"
                  >
                    {item.label}
                    <span aria-hidden className="ml-1 text-faint">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </FooterList>
          </nav>
        </div>

        <p
          aria-hidden
          className="display mt-16 select-none text-faint leading-[0.8]"
          style={{ fontSize: 'clamp(2.5rem,11.4vw,11rem)' }}
        >
          {site.shortName}
          <span className="text-[0.42em]"> — {site.tagline}</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5">
          <p className="text-[0.75rem] text-dim">
            © {year} {site.name}. Independent since {site.founded}.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-[0.75rem] text-dim transition-colors hover:text-[var(--fg)]"
          >
            Back to top
            <ArrowUp size={13} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-faint">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  );
}
