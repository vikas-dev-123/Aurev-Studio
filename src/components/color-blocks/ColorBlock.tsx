import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { hueOf, type Tone } from '../../lib/colors';
import { cn } from '../../lib/utils';
import { useMotionOk } from '../../hooks/useMediaQuery';

export type WipeDirection = 'up' | 'down' | 'left' | 'diagonal';

type Props = {
  tone: Tone;
  children: ReactNode;
  id?: string;
  as?: ElementType;
  /** Vertical rhythm. `screen` fills the viewport and centres its content. */
  pad?: 'none' | 'sm' | 'md' | 'lg' | 'screen';
  /** Off by default: a hard cut is the house style, a wipe is the exception. */
  wipe?: WipeDirection | false;
  /** Faint 12-column rule overlay, drawn in the block's own ink. */
  grid?: boolean;
  /**
   * Blocks clip by default, so a wipe layer and any over-wide child stay inside
   * the section. Turn it off for a block holding a `position: sticky` child: an
   * `overflow: hidden` ancestor becomes that child's scrollport, and the sticky
   * behaviour then silently does nothing.
   */
  clip?: boolean;
  className?: string;
  /** Applied to the inner content layer — use it to stretch a hero to full height. */
  contentClassName?: string;
  label?: string;
  labelledBy?: string;
};

const padding: Record<NonNullable<Props['pad']>, string> = {
  none: '',
  sm: 'py-[clamp(2.75rem,5vw,4.5rem)]',
  md: 'py-block',
  lg: 'py-[clamp(5.5rem,11vw,11rem)]',
  screen: 'min-h-[100svh] flex flex-col justify-center py-block',
};

const from: Record<WipeDirection, string> = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 0% 0% 100%)',
  diagonal: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)',
};

const to: Record<WipeDirection, string> = {
  up: 'inset(0% 0% 0% 0%)',
  down: 'inset(0% 0% 0% 0%)',
  left: 'inset(0% 0% 0% 0%)',
  diagonal: 'polygon(0% 0%, 140% 0%, 100% 140%, 0% 100%)',
};

/**
 * A full-bleed section that owns exactly one tone.
 *
 * There is no prop for a second colour, no gradient path and no opacity
 * crossfade between neighbours: the next block simply starts. `wipe` slides the
 * incoming flat colour in over the ink-black page base — one solid colour moving
 * over another, never two hues interpolating.
 */
export function ColorBlock({
  tone,
  children,
  id,
  as: Tag = 'section',
  pad = 'md',
  wipe = false,
  grid = false,
  clip = true,
  className,
  contentClassName,
  label,
  labelledBy,
}: Props) {
  const motionOk = useMotionOk();
  const active = wipe && motionOk ? wipe : false;
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !layer.current) return;
    const el = layer.current;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const { gsap, ScrollTrigger } = await import('../../lib/motion');
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;
      const tween = gsap.fromTo(
        el,
        { clipPath: from[active], webkitClipPath: from[active] },
        {
          clipPath: to[active],
          webkitClipPath: to[active],
          duration: 0.62,
          ease: 'power4.out',
          scrollTrigger: { trigger: el.parentElement as HTMLElement, start: 'top 92%', once: true },
        },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [active]);

  return (
    <Tag
      id={id}
      data-tone={tone}
      data-hue={hueOf(tone)}
      data-wipe={active || undefined}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn(
        'relative w-full',
        // A wipe has a clipped layer to hold, so it overrides the escape hatch.
        clip || active ? 'overflow-hidden' : undefined,
        padding[pad],
        className,
      )}
    >
      {active ? (
        <div
          ref={layer}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[var(--bg)]"
          style={{ clipPath: from[active] }}
        />
      ) : null}
      {grid ? <div aria-hidden className="grid-rule pointer-events-none absolute inset-0" /> : null}
      <div className={cn('relative', contentClassName)}>{children}</div>
    </Tag>
  );
}
