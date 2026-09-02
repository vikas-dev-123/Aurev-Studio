import { useId, useRef } from 'react';
import type { Tone } from '../../lib/colors';
import type { Service } from '../../data/services';
import { usePointerFine } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { ServicePreview } from './ServicePreview';

/**
 * One capability, one full-bleed row.
 *
 * The row is a disclosure, not a hover trick: a pointer opens it, a click opens
 * it, and the keyboard opens it through the same button — so nothing here is
 * reachable by mouse only. The closed content stays in the document rather than
 * being unmounted, which keeps all ten service descriptions crawlable.
 */
export function ServiceRow({
  service,
  index,
  tone,
  open,
  onOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  tone: Tone;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const panelId = `${useId()}panel`;
  const pointerFine = usePointerFine();

  // Ten dashboards mounted at once is a real cost on a phone, so a preview is
  // built the first time its row opens and then kept — the description text is
  // always in the document, which is the part that has to be crawlable.
  const openedOnce = useRef(false);
  if (open) openedOnce.current = true;

  return (
    <ColorBlock tone={tone} as="li" pad="none">
      <Shell>
        <div
          className={cn(
            'border-t rule transition-[padding] duration-500 ease-expo',
            open ? 'py-8 lg:py-11' : 'py-6 lg:py-7',
          )}
          onMouseEnter={pointerFine ? onOpen : undefined}
        >
          <h2>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={onToggle}
              onFocus={onOpen}
              data-cursor="explore"
              className="group flex w-full items-baseline gap-4 text-left sm:gap-6"
            >
              <span
                aria-hidden
                className="display w-9 shrink-0 text-[clamp(1rem,1.6vw,1.375rem)] leading-none tabular-nums opacity-40 sm:w-12"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="display block text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[0.95]">
                  {service.title}
                </span>
                <span className="mt-2 block max-w-[42ch] text-[0.9375rem] leading-snug text-dim">
                  {service.promise}
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center border rule-strong text-[0.9375rem] leading-none transition-transform duration-500 ease-expo',
                  open ? 'rotate-45' : 'group-hover:rotate-45',
                )}
              >
                +
              </span>
            </button>
          </h2>

          {/* 0fr → 1fr is the one height animation the browser can do honestly;
              where it is unsupported the panel simply appears, which is the
              house transition anyway. */}
          <div
            id={panelId}
            aria-hidden={!open}
            className={cn(
              'grid transition-[grid-template-rows] duration-[550ms] ease-expo',
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            )}
          >
            <div
              className={cn(
                'overflow-hidden transition-opacity duration-500 ease-expo',
                open ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className="grid gap-8 pt-8 lg:grid-cols-12 lg:gap-10 lg:pl-[4.5rem]">
                <div className="lg:col-span-5">
                  <p className="measure text-[0.9375rem] leading-relaxed">{service.detail}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-1.5 border-t rule pt-4 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2 text-[0.8125rem] text-dim"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.4rem] h-1 w-1 shrink-0 bg-[currentColor]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={cn(
                    'transition-transform duration-700 ease-expo lg:col-span-7',
                    open ? 'translate-x-0' : 'lg:translate-x-10',
                  )}
                >
                  {openedOnce.current ? <ServicePreview kind={service.preview} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}

/**
 * Rows alternate white and yellow and nothing else: /services is the yellow
 * route, so the only other surface allowed on it is a neutral one.
 */
export function toneForRow(index: number): Tone {
  return index % 2 === 0 ? 'paper' : 'yellow';
}
