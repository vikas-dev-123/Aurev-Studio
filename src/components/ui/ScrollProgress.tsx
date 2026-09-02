import { useCallback, useEffect, useState } from 'react';
import { useLocation } from '../../lib/router';
import { accentFor, PAPER_WHITE, type Hue } from '../../lib/colors';
import { pad2 } from '../../lib/utils';

type Mark = { top: number; height: number; hue: Hue; label: string };

const colourFor = (hue: Hue) => (hue === 'neutral' ? PAPER_WHITE : accentFor[hue]);

/**
 * One square per colour block, in a neutral glass rail that matches the nav.
 * The rail never takes a hue of its own — each dot fills with the colour of the
 * section it represents, which is the only place three hues may sit together.
 */
export function ScrollProgress() {
  const { pathname } = useLocation();
  const [marks, setMarks] = useState<Mark[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState(0);

  const measure = useCallback(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>('main [data-hue]'));
    setMarks(
      blocks.map((el, index) => {
        const box = el.getBoundingClientRect();
        return {
          // Document-space, not offsetParent-space: any positioned ancestor
          // (a pin wrapper, a motion layer) would otherwise skew offsetTop.
          top: box.top + window.scrollY,
          height: box.height,
          hue: (el.dataset.hue as Hue) ?? 'neutral',
          label: el.getAttribute('aria-label') ?? `Section ${pad2(index + 1)}`,
        };
      }),
    );
    setViewport(window.innerHeight);
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Blocks mount after the route swaps, and images/fonts shift their heights.
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 700);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [measure, pathname]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (marks.length < 3) return null;

  const eye = scrollY + viewport * 0.45;

  return (
    <div className="pointer-events-none fixed right-3 top-1/2 z-nav hidden -translate-y-1/2 xl:block">
      <ul className="pointer-events-auto flex flex-col gap-2 border border-white/12 bg-[rgba(15,17,15,0.65)] p-2 backdrop-blur-[18px]">
        {marks.map((mark, index) => {
          const fill = Math.max(0, Math.min(1, (eye - mark.top) / Math.max(1, mark.height)));
          const current = fill > 0 && fill < 1;
          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: mark.top, behavior: 'smooth' })}
                aria-label={`Go to ${mark.label}`}
                aria-current={current ? 'true' : undefined}
                className="group relative flex h-3.5 w-3.5 items-center justify-center"
              >
                <span aria-hidden className="absolute inset-[3px] bg-white/22" />
                <span
                  aria-hidden
                  className="absolute inset-[3px] origin-bottom transition-transform duration-200 ease-out group-hover:inset-[2px]"
                  style={{
                    backgroundColor: colourFor(mark.hue),
                    transform: `scaleY(${fill})`,
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
