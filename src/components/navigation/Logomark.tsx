import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

type Props = {
  /** Pixel size of the square glyph. */
  size?: number;
  /** Drops the terminal pads so the glyph stays readable below ~20px. */
  compact?: boolean;
  /** Draws the trace on mount — used once, in the loader. */
  animated?: boolean;
  className?: string;
  title?: string;
};

/**
 * The mark: a chamfered signal trace that terminates in two contact pads, with
 * a core node held in the opening. Read as a C for Connection; read as a routed
 * circuit for the work. Same geometry as the ecosystem diagram on the homepage
 * and the signal flow on /ai, so the identity and the product visuals share one
 * drawing language.
 *
 * Single colour, inherits currentColor, so it is legal on every tone.
 */
export function Logomark({ size = 28, compact = false, animated = false, className, title }: Props) {
  const trace = 'M32 6.5 H17.5 L6.5 17.5 V22.5 L17.5 33.5 H32';
  const core = '19.5,15 24.5,20 19.5,25 14.5,20';

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={cn('shrink-0 overflow-visible', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      {!compact && (
        <>
          <rect x="27.5" y="2" width="9" height="9" fill="currentColor" />
          <rect x="27.5" y="29" width="9" height="9" fill="currentColor" />
        </>
      )}
      {animated ? (
        <>
          <motion.path
            d={trace}
            stroke="currentColor"
            strokeWidth={5}
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.polygon
            points={core}
            fill="currentColor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ originX: '19.5px', originY: '20px' }}
            transition={{ delay: 0.85, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      ) : (
        <>
          <path d={trace} stroke="currentColor" strokeWidth={5} strokeLinecap="square" />
          <polygon points={core} fill="currentColor" />
        </>
      )}
    </svg>
  );
}
