import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { signalStages } from '../../data/ai';
import { useMotionOk } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The signal animation. Pass `active` to drive it from scroll on /ai; leave it out
 * and the flow advances on its own while it is on screen, then stops — an
 * animation that keeps running in a background tab is a battery bug.
 */
export function SignalFlow({
  active,
  className,
  compact = false,
  verbose = false,
}: {
  active?: number;
  className?: string;
  /** Labels only — for tight columns. */
  compact?: boolean;
  /** The full sentence instead of the one-line note, for when this is the page's main event. */
  verbose?: boolean;
}) {
  const motionOk = useMotionOk();
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const [self, setSelf] = useState(0);
  const driven = active !== undefined;

  useEffect(() => {
    if (driven || !inView || !motionOk) return;
    const timer = window.setInterval(
      () => setSelf((n) => (n + 1) % (signalStages.length + 1)),
      1250,
    );
    return () => window.clearInterval(timer);
  }, [driven, inView, motionOk]);

  // Reduced motion gets the finished state: every stage lit, nothing moving.
  const current = driven ? active : motionOk ? self : signalStages.length - 1;

  return (
    <ol ref={ref} className={cn('grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5', className)}>
      {signalStages.map((stage, index) => {
        const reached = index <= (current ?? 0);
        const on = index === current;
        return (
          <li key={stage.key} className="relative">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-[currentColor] opacity-20"
            />
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[currentColor]"
              initial={false}
              animate={{ scaleX: reached ? 1 : 0 }}
              transition={{ duration: motionOk ? 0.5 : 0, ease: EASE }}
            />

            <div
              className={cn(
                'pt-5 transition-opacity duration-500',
                reached ? 'opacity-100' : 'opacity-45',
              )}
            >
              <div className="flex items-center gap-2.5">
                <motion.span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 bg-[currentColor]"
                  initial={false}
                  animate={{ scale: on ? 1.6 : 1, opacity: reached ? 1 : 0.35 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <span className="text-[0.6875rem] tabular-nums opacity-55">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3
                className={cn(
                  'mt-3 font-semibold uppercase tracking-[-0.01em]',
                  compact ? 'text-[0.9375rem]' : 'text-[1.0625rem]',
                )}
              >
                {stage.label.toUpperCase()}
              </h3>
              {!compact && (
                <p
                  className={cn(
                    'mt-2 text-[0.8125rem] leading-relaxed opacity-75',
                    verbose ? 'max-w-[34ch]' : 'max-w-[26ch]',
                  )}
                >
                  {verbose ? stage.detail : stage.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
