import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink, Link, useLocation } from '../../lib/router';
import { navRoutes, routeFor, site } from '../../data/site';
import { accentFor, hueOf } from '../../lib/colors';
import { cn } from '../../lib/utils';
import { Wordmark } from './Wordmark';
import { MobileMenu } from './MobileMenu';

/**
 * The one piece of chrome that never changes colour. It sits on yellow, green,
 * pink and black in turn, so it stays ink-black glass and lets the block behind
 * it do the talking. Route identity is carried by a single small dot.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const active = routeFor(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-nav flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
        <nav
          aria-label="Primary"
          className={cn(
            'pointer-events-auto flex w-full max-w-shell items-center justify-between gap-4 border border-white/12 bg-[rgba(15,17,15,0.65)] text-paper backdrop-blur-[18px] transition-[padding] duration-300 ease-expo',
            scrolled ? 'px-3 py-2 sm:px-4 sm:py-2.5' : 'px-3 py-2.5 sm:px-5 sm:py-3.5',
          )}
        >
          <Link
            to="/"
            aria-label={`${site.name} — home`}
            className="flex items-center gap-2 pl-1 text-paper transition-opacity hover:opacity-70"
            data-cursor="open"
          >
            <Wordmark responsive />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navRoutes.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      'relative flex items-center gap-2 px-3 py-2 text-[0.8125rem] font-medium tracking-[-0.005em] transition-colors',
                      isActive ? 'text-paper' : 'text-paper/62 hover:text-paper',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden
                        className={cn(
                          'h-1.5 w-1.5 transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                        style={{ backgroundColor: accentFor[hueOf(route.tone)] }}
                      />
                      {route.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              to="/contact"
              data-cursor="open"
              className={cn(
                'hidden items-center gap-2 border border-white/16 px-4 py-2.5 text-[0.8125rem] font-medium transition-colors sm:inline-flex',
                pathname === '/contact'
                  ? 'bg-paper text-ink'
                  : 'hover:border-white/40 hover:bg-white/8',
              )}
            >
              Let’s talk
              <span aria-hidden>↗</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border border-white/16 transition-colors hover:bg-white/8 lg:hidden"
            >
              <Menu size={17} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} activePath={active?.path} />
    </>
  );
}
