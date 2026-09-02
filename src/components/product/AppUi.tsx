import type { ReactNode } from 'react';
import { cn, sparkPoints } from '../../lib/utils';

/**
 * Primitives for the fake software. Monochrome on purpose: state is carried by
 * weight, opacity and small glyphs, never by colour — that is what lets a
 * dashboard sit inside a yellow, green or pink block untouched.
 */
export function AppWindow({
  product,
  nav,
  active,
  title,
  subtitle,
  chip,
  children,
}: {
  product: string;
  nav: string[];
  active: string;
  title: string;
  subtitle?: string;
  chip?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0">
      <aside className="hidden w-[152px] shrink-0 flex-col border-r border-[var(--app-line)] bg-[var(--app-panel)] p-3 sm:flex">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-[3px] bg-[var(--app-fg)]" />
          <p className="text-[11px] font-semibold tracking-[-0.01em]">{product}</p>
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-0.5">
          {nav.map((item) => (
            <span
              key={item}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-[0.3rem] text-[11px]',
                item === active
                  ? 'bg-[var(--app-panel-2)] font-medium text-[var(--app-fg)]'
                  : 'text-[var(--app-dim)]',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'h-1.5 w-1.5 rounded-[2px]',
                  item === active ? 'bg-[var(--app-fg)]' : 'bg-[var(--app-faint)]',
                )}
              />
              {item}
            </span>
          ))}
        </nav>
        <div className="mt-3 border-t border-[var(--app-line)] pt-3">
          <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--app-faint)]">Sync</p>
          <Meter value={0.86} className="mt-1.5" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-[var(--app-line)] px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold">{title}</p>
            {subtitle ? (
              <p className="truncate text-[10px] text-[var(--app-faint)]">{subtitle}</p>
            ) : null}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {chip ? (
              <span className="pill hidden px-2 py-0.5 text-[10px] text-[var(--app-dim)] xs:inline-block">
                {chip}
              </span>
            ) : null}
            <span aria-hidden className="h-5 w-5 rounded-full bg-[var(--app-panel-2)]" />
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden p-3">{children}</div>
      </div>
    </div>
  );
}
export function Panel({
  title,
  hint,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  hint?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn('panel flex min-h-0 flex-col', className)}>
      {title ? (
        <header className="flex items-center gap-2 border-b border-[var(--app-line)] px-2.5 py-2">
          <p className="truncate text-[11px] font-medium">{title}</p>
          {hint ? (
            <p className="truncate text-[10px] text-[var(--app-faint)]">{hint}</p>
          ) : null}
          {action ? <div className="ml-auto shrink-0">{action}</div> : null}
        </header>
      ) : null}
      <div className={cn('min-h-0 flex-1 p-2.5', bodyClassName)}>{children}</div>
    </section>
  );
}

export function Metric({
  value,
  label,
  delta,
  hint,
  className,
}: {
  value: string;
  label: string;
  /** Positive numbers render ▲, negative ▼ — no red/green, by design. */
  delta?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn('panel px-2.5 py-2', className)}>
      <p className="truncate text-[10px] uppercase tracking-[0.12em] text-[var(--app-faint)]">
        {label}
      </p>
      <p className="num mt-1 text-[clamp(1rem,2.4vw,1.375rem)] font-semibold leading-none">
        {value}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        {typeof delta === 'number' ? (
          <span className="num text-[10px] text-[var(--app-dim)]">
            <span aria-hidden>{delta >= 0 ? '▲' : '▼'}</span> {Math.abs(delta)}%
          </span>
        ) : null}
        {hint ? <span className="truncate text-[10px] text-[var(--app-faint)]">{hint}</span> : null}
      </div>
    </div>
  );
}
export function Meter({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-1 w-full overflow-hidden rounded-full bg-[var(--app-panel-2)]', className)}>
      <div
        className="h-full rounded-full bg-[var(--app-fg)] opacity-70"
        style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` }}
      />
    </div>
  );
}

export function Bars({
  data,
  labels,
  height = 96,
  markLast = true,
}: {
  data: number[];
  labels?: string[];
  height?: number;
  markLast?: boolean;
}) {
  const max = Math.max(...data, 1);
  return (
    <div>
      <div className="flex items-end gap-[3px]" style={{ height }}>
        {data.map((value, index) => (
          <div
            key={index}
            className={cn(
              'flex-1 rounded-[2px]',
              markLast && index === data.length - 1
                ? 'bg-[var(--app-fg)] opacity-90'
                : 'bg-[var(--app-fg)] opacity-28',
            )}
            style={{ height: `${Math.max(3, (value / max) * 100)}%` }}
          />
        ))}
      </div>
      {labels ? (
        <div className="mt-1.5 flex gap-[3px]">
          {labels.map((label, index) => (
            <span
              key={index}
              className="flex-1 truncate text-center text-[9px] text-[var(--app-faint)]"
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
export function Spark({
  data,
  className,
  height = 44,
}: {
  data: number[];
  className?: string;
  height?: number;
}) {
  const points = sparkPoints(data, 160, height - 4);
  return (
    <svg
      viewBox={`0 0 160 ${height}`}
      preserveAspectRatio="none"
      className={cn('w-full', className)}
      style={{ height }}
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--app-fg)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export function Ring({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(1, value));
  const c = 2 * Math.PI * 26;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 64 64" className="h-[76px] w-[76px] -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r="26" fill="none" stroke="var(--app-line-strong)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="var(--app-fg)"
          strokeWidth="6"
          strokeLinecap="butt"
          strokeDasharray={`${c * pct} ${c}`}
          opacity="0.88"
        />
      </svg>
      <div className="absolute text-center">
        <p className="num text-[13px] font-semibold leading-none">{Math.round(pct * 100)}%</p>
        {label ? <p className="mt-0.5 text-[9px] text-[var(--app-faint)]">{label}</p> : null}
      </div>
    </div>
  );
}
export function Table({
  head,
  rows,
  className,
}: {
  head: string[];
  rows: (string | ReactNode)[][];
  className?: string;
}) {
  return (
    <table className={cn('w-full border-collapse text-left', className)}>
      <thead>
        <tr>
          {head.map((cell, index) => (
            <th
              key={index}
              scope="col"
              className={cn(
                'border-b border-[var(--app-line)] pb-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--app-faint)]',
                index > 0 && 'pl-2',
                index > 1 && 'hidden xs:table-cell',
              )}
            >
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, index) => (
              <td
                key={index}
                className={cn(
                  'border-b border-[var(--app-line)] py-[0.44rem] text-[10.5px] align-middle',
                  index === 0 ? 'font-medium' : 'text-[var(--app-dim)]',
                  index > 0 && 'pl-2',
                  index > 1 && 'hidden xs:table-cell',
                )}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export function Chip({
  children,
  strong = false,
}: {
  children: ReactNode;
  strong?: boolean;
}) {
  return (
    <span
      className={cn(
        'pill inline-flex items-center gap-1 px-1.5 py-[0.1rem] text-[9.5px] leading-normal',
        strong
          ? 'border-transparent bg-[var(--app-fg)] font-medium text-[var(--app-bg)]'
          : 'text-[var(--app-dim)]',
      )}
    >
      {children}
    </span>
  );
}

export function Initials({ name }: { name: string }) {
  const letters = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--app-panel-2)] text-[9px] font-medium text-[var(--app-dim)]">
      {letters}
    </span>
  );
}

/** A left-aligned label/value line — the workhorse of every side panel. */
export function Line({
  label,
  value,
  sub,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[var(--app-line)] py-[0.4rem] last:border-0">
      <div className="min-w-0">
        <p className="truncate text-[10.5px]">{label}</p>
        {sub ? <p className="truncate text-[9.5px] text-[var(--app-faint)]">{sub}</p> : null}
      </div>
      <div className="num shrink-0 text-[10.5px] text-[var(--app-dim)]">{value}</div>
    </div>
  );
}
