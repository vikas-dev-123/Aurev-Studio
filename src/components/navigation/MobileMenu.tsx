import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from '../../lib/router';
import { routes, site } from '../../data/site';
import { accentFor, hueOf } from '../../lib/colors';
import { pad2 } from '../../lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({
  open,
  onClose,
  activePath,
}: {
  open: boolean;
  onClose: () => void;
  activePath?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-tone="ink"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-overlay flex flex-col px-gutter py-5 lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.44, ease: EASE }}
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow text-dim">{site.shortName} — menu</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center border border-white/16"
            >
              <X size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <nav aria-label="All pages" className="mt-10 flex-1">
            <ul>
              {routes.map((route, index) => (
                <motion.li
                  key={route.path}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + index * 0.045, duration: 0.5, ease: EASE }}
                  className="border-b border-white/10"
                >
                  <Link
                    to={route.path}
                    onClick={onClose}
                    className="flex items-baseline gap-4 py-4"
                    aria-current={activePath === route.path ? 'page' : undefined}
                  >
                    <span className="eyebrow w-6 text-faint">{pad2(index + 1)}</span>
                    <span className="flex-1">
                      <span className="display block text-[clamp(1.75rem,8vw,2.75rem)]">
                        {route.label}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-dim">{route.hint}</span>
                    </span>
                    <span
                      aria-hidden
                      className="mb-2 h-2 w-2 shrink-0"
                      style={{
                        backgroundColor: accentFor[hueOf(route.tone)],
                        opacity: activePath === route.path ? 1 : 0.28,
                      }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex items-center gap-2 self-start border-b border-white/30 pb-1 text-sm"
          >
            {site.email}
            <span aria-hidden>↗</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
