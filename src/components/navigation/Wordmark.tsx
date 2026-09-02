import { Logomark } from './Logomark';
import { site } from '../../data/site';
import { cn } from '../../lib/utils';

type Props = {
  /** `sm` for chrome, `lg` for footer and loader lockups. */
  scale?: 'sm' | 'lg';
  /** Collapse to the monogram at narrow widths (nav uses this). */
  responsive?: boolean;
  className?: string;
};

export function Wordmark({ scale = 'sm', responsive = false, className }: Props) {
  const small = scale === 'sm';
  return (
    <span className={cn('inline-flex items-center', small ? 'gap-2.5' : 'gap-4', className)}>
      <Logomark size={small ? 22 : 40} compact={small} title={`${site.name} logo`} />
      <span
        className={cn(
          'font-medium leading-none',
          small ? 'text-[0.8125rem] tracking-[-0.01em]' : 'text-lg tracking-[-0.02em] sm:text-xl',
        )}
      >
        {responsive ? (
          <>
            <span className="hidden xl:inline">{site.name}</span>
            <span className="xl:hidden">{site.shortName}</span>
          </>
        ) : (
          site.name
        )}
      </span>
    </span>
  );
}
