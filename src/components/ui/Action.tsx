import type { ReactNode } from 'react';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';
import { Magnetic } from './Magnetic';

type Variant = 'solid' | 'outline' | 'bare';

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'lg';
  /** '↗' for a jump, '→' for a next step, false for none. */
  arrow?: '↗' | '→' | false;
  magnetic?: boolean;
  className?: string;
  cursor?: 'view' | 'explore' | 'open' | 'next';
};

type AsLink = Common & { to: string; href?: never; onClick?: never; type?: never; disabled?: never };
type AsAnchor = Common & {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
  disabled?: never;
};
type AsButton = Common & {
  onClick: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  to?: never;
  href?: never;
};

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-medium tracking-[-0.005em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40';

const sizes = {
  md: 'px-5 py-3 text-[0.875rem]',
  lg: 'px-7 py-4 text-[0.9375rem] sm:px-8 sm:py-[1.1rem] sm:text-base',
} as const;

const variants: Record<Variant, string> = {
  // ink-fill flips the block's own ink and background, so this button is legal
  // on yellow, green, pink, black and white without a single colour prop.
  solid: 'ink-fill',
  outline: 'border rule-strong hover:ink-fill',
  bare: 'px-0 py-1 border-b rule-strong hover:opacity-70',
};

/**
 * The one call-to-action primitive. Square corners, flat colour, ink borrowed
 * from the surrounding block — never a hue of its own.
 */
export function Action(props: AsLink | AsAnchor | AsButton) {
  const {
    children,
    variant = 'solid',
    size = 'md',
    arrow = false,
    magnetic = variant !== 'bare',
    className,
    cursor,
  } = props;

  const classes = cn(base, variants[variant], variant !== 'bare' && sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className={cn(
            'inline-block transition-transform duration-300 ease-expo',
            arrow === '↗'
              ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
              : 'group-hover:translate-x-1',
          )}
        >
          {arrow}
        </span>
      )}
    </>
  );

  let element: ReactNode;
  if ('to' in props && props.to !== undefined) {
    element = (
      <Link to={props.to} className={classes} data-cursor={cursor}>
        {inner}
      </Link>
    );
  } else if ('href' in props && props.href !== undefined) {
    const external = /^https?:/.test(props.href);
    element = (
      <a
        href={props.href}
        className={classes}
        data-cursor={cursor ?? 'open'}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {inner}
      </a>
    );
  } else {
    element = (
      <button
        type={props.type ?? 'button'}
        onClick={props.onClick}
        disabled={props.disabled}
        className={classes}
        data-cursor={cursor}
      >
        {inner}
      </button>
    );
  }

  if (!magnetic) return <>{element}</>;
  return <Magnetic strength={7}>{element}</Magnetic>;
}
