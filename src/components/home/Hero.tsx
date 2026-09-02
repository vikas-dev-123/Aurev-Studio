import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Action } from '../ui/Action';
import { VideoBackground } from './VideoBackground';
import { site } from '../../data/site';
import { useMotionOk } from '../../hooks/useMediaQuery';

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { value: '04', label: 'operating systems in production' },
  { value: '10+', label: 'years of engineering behind them' },
  { value: '01', label: 'team, from strategy to support' },
];

export function Hero() {
  const motionOk = useMotionOk();

  return (
    <ColorBlock
      tone="ink"
      pad="none"
      label="Introduction"
      contentClassName="flex min-h-[100svh] flex-col"
    >
      <VideoBackground dim={0.52} />

      <Shell className="relative flex flex-1 flex-col justify-end pb-8 pt-[calc(var(--nav-h)+5rem)]">
        <motion.p
          className="eyebrow text-dim"
          initial={motionOk ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {site.tagline}
          <span aria-hidden className="mx-2.5 text-faint">
            /
          </span>
          {site.serviceArea}
        </motion.p>

        <motion.div
          className="mt-auto pt-12"
          initial={motionOk ? { opacity: 0, y: 26 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
        >
          <Statement as="h1" size="hero" className="max-w-[18ch]">
            {'WE BUILD THE|_systems_ THAT|MOVE BUSINESS.'}
          </Statement>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end"
          initial={motionOk ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
        >
          <p className="lede text-dim lg:col-span-5">{site.promise}</p>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-4">
            <Action to="/contact" size="lg" arrow="↗" cursor="open">
              Start a project
            </Action>
            <Action to="/work" variant="outline" size="lg" arrow="→" cursor="view">
              See the work
            </Action>
          </div>

          <dl className="hidden justify-self-end lg:col-span-3 lg:block">
            {FACTS.map((fact) => (
              <div key={fact.value} className="flex items-baseline gap-3 border-t rule py-2">
                <dt className="display text-[1.375rem] leading-none">{fact.value}</dt>
                <dd className="text-[0.75rem] leading-tight text-dim">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-2 text-faint"
          initial={motionOk ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.span
            aria-hidden
            animate={motionOk ? { y: [0, 5, 0] } : undefined}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <ArrowDown size={14} strokeWidth={1.75} />
          </motion.span>
          <span className="eyebrow">Scroll — the colour changes with the subject</span>
        </motion.div>
      </Shell>
    </ColorBlock>
  );
}
