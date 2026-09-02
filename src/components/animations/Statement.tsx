import { type ElementType, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Size = 'hero' | 'statement' | 'title' | 'sub';

const sizes: Record<Size, string> = {
  hero: 'text-hero',
  statement: 'text-statement',
  title: 'text-title',
  sub: 'text-sub',
};

/**
 * The house headline treatment: Inter caps, tracked tight, with passages wrapped
 * in _underscores_ set in Instrument Serif italic lowercase. The contrast between
 * the two — mechanical caps against a written hand — is the type signature of the
 * site, so it is expressed once here instead of being re-styled per section.
 */
export function Statement({
  children,
  size = 'statement',
  as: Tag = 'h2',
  className,
  id,
}: {
  children: string;
  size?: Size;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn('display', sizes[size], className)}>
      {parse(children)}
    </Tag>
  );
}

/** Splits `WE TURN THAT _workflow_ INTO SOFTWARE` into caps and serif runs. */
function parse(source: string): ReactNode[] {
  return source.split(/(_[^_]+_)/).map((chunk, index) => {
    if (chunk.startsWith('_') && chunk.endsWith('_') && chunk.length > 2) {
      return <em key={index}>{chunk.slice(1, -1)}</em>;
    }
    // Preserve author-controlled line breaks written as "|".
    return chunk.split('|').map((line, i, all) => (
      <span key={`${index}-${i}`}>
        {line}
        {i < all.length - 1 ? <br /> : null}
      </span>
    ));
  });
}
