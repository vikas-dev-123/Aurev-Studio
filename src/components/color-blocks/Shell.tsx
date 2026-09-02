import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Page gutter + max width. Every block's content sits inside one of these. */
export function Shell({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn('mx-auto w-full px-gutter', wide ? 'max-w-none' : 'max-w-shell', className)}>
      {children}
    </div>
  );
}

/**
 * A small caption pinned above a block, carrying real information — which block
 * this is and what it holds — rather than a decorative label.
 */
export function BlockTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('eyebrow flex items-center gap-2.5 text-dim', className)}>
      <span aria-hidden className="inline-block h-1.5 w-1.5 bg-[currentColor]" />
      {children}
    </p>
  );
}
