import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/utils';

/**
 * CSS-driven, duplicated once for a seamless loop, paused on hover. No GSAP and
 * no JS measurement: a marquee that stops when the tab is inert is worth more
 * than one that recalculates on every resize.
 */
export function Marquee({
  items,
  duration = 38,
  className,
  separator = '/',
}: {
  items: string[];
  /** Seconds for one full pass. Longer = calmer. */
  duration?: number;
  className?: string;
  separator?: ReactNode;
}) {
  const run = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center">
          <span className="display whitespace-nowrap text-[clamp(1.75rem,5.4vw,4.5rem)]">
            {item}
          </span>
          <span aria-hidden className="mx-[0.35em] text-[0.42em] text-faint">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn('marquee relative flex overflow-hidden', className)}>
      <div
        className="marquee-track flex"
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {run}
        {run}
      </div>
      {/* The list is decorative repetition; the real content is read once here. */}
      <p className="sr-only">{items.join(', ')}</p>
    </div>
  );
}
