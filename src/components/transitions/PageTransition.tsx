import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useLocation } from '../../lib/router';
import { useMotionOk } from '../../hooks/useMediaQuery';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Route change: an ink-black panel sweeps up over the outgoing page and off the
 * top of the incoming one. Neutral by design — a coloured cover would put two
 * brand hues on screen at once, which the colour law does not allow.
 */
export function RouteWipe() {
  const { pathname } = useLocation();
  const motionOk = useMotionOk();
  if (!motionOk) return null;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-overlay bg-ink"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{
          clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
        }}
        transition={{ duration: 0.68, times: [0, 0.42, 1], ease: EASE }}
      />
    </AnimatePresence>
  );
}

/** Swaps page content only after the outgoing page has left, so hues never overlap. */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const motionOk = useMotionOk();

  if (!motionOk) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'linear' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
