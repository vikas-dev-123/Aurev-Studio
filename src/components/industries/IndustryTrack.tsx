import { useEffect, useRef, useState } from 'react';
import { systems } from '../../data/systems';
import { useMediaQuery, useMotionOk } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';
import { IndustryPanel } from './IndustryPanel';

/**
 * Four industry panels, arranged two ways from one DOM.
 *
 * On a large landscape screen the wrapper pins and the track slides sideways, so
 * the hard cut between greens happens horizontally — earned here because the four
 * systems are siblings, not a sequence of arguments. Everywhere else the panels
 * simply stack and the cut happens on the vertical scroll instead. The server
 * always renders the stack, so nothing depends on the pin existing.
 */
export function IndustryTrack() {
  // Height is part of the gate: a pinned wrapper clips, so a viewport too short
  // for a 100svh panel must get the stack instead.
  const roomy = useMediaQuery('(min-width: 1180px) and (min-height: 760px)');
  const motionOk = useMotionOk();
  const horizontal = roomy && motionOk;

  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!horizontal || !wrapper.current || !track.current) return;
    const wrapperEl = wrapper.current;
    const trackEl = track.current;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const { gsap, ScrollTrigger } = await import('../../lib/motion');
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      // Measured, not assumed: panels are 100vw (scrollbar included) while the
      // wrapper is the width actually visible, and both change on resize.
      const distance = () => Math.max(0, trackEl.scrollWidth - wrapperEl.clientWidth);

      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperEl,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * (systems.length - 1));
            setActive((current) => (current === next ? current : next));
          },
        },
      });

      // A pinned track is a keyboard trap: focus moves into panel 03 but the
      // browser cannot scroll a transform into view. Translate the focus into the
      // scroll position that shows the panel it belongs to.
      const onFocusIn = (event: FocusEvent) => {
        const st = tween.scrollTrigger;
        if (!st) return;
        let node = event.target as HTMLElement | null;
        while (node && node.parentElement !== trackEl) node = node.parentElement;
        if (!node) return;
        const index = Array.prototype.indexOf.call(trackEl.children, node);
        if (index < 0) return;
        const top = st.start + ((st.end - st.start) * index) / (systems.length - 1);
        if (Math.abs(window.scrollY - top) < 24) return;
        window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      };
      trackEl.addEventListener('focusin', onFocusIn);

      // Late webfonts change panel heights, which changes where the pin ends.
      const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanup = () => {
        cancelAnimationFrame(frame);
        trackEl.removeEventListener('focusin', onFocusIn);
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(trackEl, { clearProps: 'x' });
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [horizontal]);

  return (
    // The wrapper carries the hue family so the position readout below can take
    // its ink from the block it floats over — every panel here is a green.
    <div
      ref={wrapper}
      data-tone="green"
      className={cn('relative', horizontal && 'h-[100svh] overflow-hidden')}
    >
      <div ref={track} className={cn(horizontal && 'flex h-full w-max')}>
        {systems.map((system, index) => (
          <IndustryPanel
            key={system.key}
            system={system}
            index={index}
            horizontal={horizontal}
          />
        ))}
      </div>

      {horizontal ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-transparent"
        >
          <div className="mx-auto flex max-w-shell items-end gap-6 px-gutter pb-7">
            <p className="eyebrow shrink-0 pb-1 text-faint">Scroll</p>
            <ol className="flex flex-1 gap-1.5">
              {systems.map((system, index) => (
                <li key={system.key} className="flex-1">
                  <span
                    className={cn(
                      'block h-[2px] w-full bg-[currentColor] transition-opacity duration-500 ease-expo',
                      index <= active ? 'opacity-65' : 'opacity-20',
                    )}
                  />
                  <span
                    className={cn(
                      'mt-2 block text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-opacity duration-500 ease-expo',
                      index === active ? 'opacity-100' : 'opacity-40',
                    )}
                  >
                    {system.industry}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}
