import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionOk } from '../../hooks/useMediaQuery';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance for a block's content. Used on the one or two elements that carry a
 * section, not on every child — scattered fade-ups read as filler.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'li' | 'p';
}) {
  const motionOk = useMotionOk();
  const Tag = motion[as];

  if (!motionOk) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Staggered list entrance. Children must be <RevealItem> to inherit the timing. */
export function RevealGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'dl';
}) {
  const motionOk = useMotionOk();
  const Tag = motion[as];
  if (!motionOk) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-6% 0px' }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'dt' | 'dd';
}) {
  const motionOk = useMotionOk();
  const Tag = motion[as];
  if (!motionOk) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
