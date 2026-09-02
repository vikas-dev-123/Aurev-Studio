import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Chrome = 'browser' | 'app' | 'phone' | 'none';

/**
 * Neutral by rule. The frame is the same graphite on yellow, green and pink,
 * because a tinted device would put a second hue inside a block — and because
 * real software does not change colour when the marketing page does.
 */
export function DeviceFrame({
  children,
  chrome = 'browser',
  url,
  title,
  light = false,
  className,
  screenClassName,
  ratio,
}: {
  children: ReactNode;
  chrome?: Chrome;
  url?: string;
  title?: string;
  light?: boolean;
  className?: string;
  screenClassName?: string;
  /** e.g. '16 / 10' — omit to let content set the height. */
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        'relative isolate w-full border border-white/10 bg-[#0B0B0C] p-1.5 shadow-[0_50px_90px_-45px_rgba(0,0,0,0.55)]',
        chrome === 'phone' ? 'rounded-[26px] p-2' : 'rounded-[14px]',
        className,
      )}
    >
      {chrome === 'browser' ? (
        <div className="flex items-center gap-2 px-2 py-2">
          <div aria-hidden className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/22" />
            <span className="h-2 w-2 rounded-full bg-white/16" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
          </div>
          {url ? (
            <p className="mx-auto max-w-[62%] truncate rounded-md bg-white/6 px-3 py-1 text-[10px] tracking-[0.01em] text-white/45">
              {url}
            </p>
          ) : null}
          <span aria-hidden className="ml-auto h-2 w-6 rounded-sm bg-white/10" />
        </div>
      ) : null}

      {chrome === 'app' ? (
        <div className="flex items-center gap-2 px-3 py-2">
          <span aria-hidden className="h-2 w-2 bg-white/30" />
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{title ?? 'App'}</p>
        </div>
      ) : null}

      {chrome === 'phone' ? (
        <div className="flex justify-center py-1.5" aria-hidden>
          <span className="h-1 w-14 rounded-full bg-white/18" />
        </div>
      ) : null}

      <div
        className={cn(
          'app-ui relative overflow-hidden',
          light && 'app-light',
          chrome === 'phone' ? 'rounded-[18px]' : 'rounded-[9px]',
          screenClassName,
        )}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
