import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Logomark } from '../navigation/Logomark';
import { useMotionOk } from '../../hooks/useMediaQuery';

const WORDS = ['Design', 'Engineer', 'Automate', 'Intelligent'];
const SEGMENTS = ['bg-yellow', 'bg-green', 'bg-pink'] as const;
const DURATION = 2000;

/**
 * First load only. Three flat segments fill in sequence — yellow, then green,
 * then pink — instead of one interpolated bar, because the colour law applies to
 * the loader too. Ends on an upward wipe straight into the first block.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const motionOk = useMotionOk();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (!motionOk) {
      const t = setTimeout(onDone, 220);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // Ease so the count decelerates into 100 rather than snapping.
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 2.2))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else if (!done.current) {
        done.current = true;
        setLeaving(true);
        setTimeout(onDone, 480);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motionOk, onDone]);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor((progress / 100) * WORDS.length))];
  const year = new Date().getFullYear();

  return (
    <motion.div
      data-tone="ink"
      className="fixed inset-0 z-loader flex flex-col justify-between px-gutter py-8"
      initial={false}
      animate={leaving ? { clipPath: 'inset(0% 0% 100% 0%)' } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden={leaving}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <p className="eyebrow text-dim">
          Digital systems
          <span aria-hidden className="mx-2 text-faint">
            /
          </span>
          {year}
        </p>
        <Logomark size={30} animated className="text-paper" />
      </div>

      <div className="flex flex-1 items-center">
        <p className="voice text-[clamp(3rem,11vw,9rem)] leading-[0.9]">
          <span className="sr-only">Loading. </span>
          {word}
          <span aria-hidden className="text-yellow">
            .
          </span>
        </p>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="flex w-full max-w-md items-center gap-1.5" aria-hidden>
          {SEGMENTS.map((colour, index) => {
            const span = 100 / SEGMENTS.length;
            const local = Math.min(1, Math.max(0, (progress - index * span) / span));
            return (
              <span key={colour} className="relative h-[3px] flex-1 bg-white/12">
                <span
                  className={`absolute inset-y-0 left-0 ${colour}`}
                  style={{ width: `${local * 100}%` }}
                />
              </span>
            );
          })}
        </div>
        <p className="display text-[clamp(3.5rem,11vw,9rem)] leading-none tabular-nums">
          {String(progress).padStart(3, '0')}
        </p>
      </div>
    </motion.div>
  );
}
