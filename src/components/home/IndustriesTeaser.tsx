import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Reveal } from '../animations/Reveal';
import { Screen } from '../product/Screen';
import { Action } from '../ui/Action';
import { Link } from '../../lib/router';
import { systems } from '../../data/systems';
import { useMotionOk } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

/**
 * Four industries, one live preview. The panel is always showing something — a
 * card that only exists on hover is a card most visitors never see, and one no
 * keyboard reaches.
 */
export function IndustriesTeaser() {
  const [active, setActive] = useState(0);
  const motionOk = useMotionOk();
  const current = systems[active];

  return (
    <ColorBlock tone="pink" pad="lg" label="Industries">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <BlockTag>Four operations we know well</BlockTag>
            </Reveal>
            <Reveal delay={0.08}>
              <Statement size="statement" className="mt-6">
                {'A SCHOOL DOES NOT|RUN LIKE A _hospital_.'}
              </Statement>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed">
                And neither runs like a hotel. We have built the core system for all four, so the
                first workshop starts from your vocabulary instead of a discovery questionnaire.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <ul className="border-t rule lg:col-span-6">
            {systems.map((system, index) => {
              const on = index === active;
              return (
                <li key={system.key} className="border-b rule">
                  <Link
                    to="/industries"
                    data-cursor="view"
                    className={cn(
                      'group flex items-center justify-between gap-6 py-5 transition-opacity duration-300 lg:py-7',
                      on ? 'opacity-100' : 'opacity-45 hover:opacity-100',
                    )}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                  >
                    <span>
                      <span className="display block text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[0.95]">
                        {system.industry.toUpperCase()}
                      </span>
                      <span className="mt-2 block text-[0.8125rem] leading-snug opacity-70">
                        {system.name} · {system.tagline}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-[1.125rem] transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-6">
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.key}
                  initial={motionOk ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={motionOk ? { opacity: 0 } : undefined}
                  transition={{ duration: 0.28 }}
                  data-cursor="explore"
                >
                  <Screen screen={current.dashboard} chrome="app" ratio="16 / 11" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.75rem]">
              <span className="font-medium">{current.name}</span>
              <span aria-hidden className="opacity-45">
                /
              </span>
              <span className="opacity-70">{current.modules.slice(0, 5).join(' · ')}</span>
            </div>
            <div className="mt-8">
              <Action to="/industries" variant="outline" arrow="→" cursor="open">
                All four systems
              </Action>
            </div>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
