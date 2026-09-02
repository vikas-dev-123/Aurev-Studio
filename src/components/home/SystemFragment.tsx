import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { Shell, BlockTag } from '../color-blocks/Shell';
import { Reveal } from '../animations/Reveal';
import { Screen } from '../product/Screen';
import { Action } from '../ui/Action';
import { systemByKey } from '../../data/systems';
import { useMotionOk } from '../../hooks/useMediaQuery';

const school = systemByKey.school;

/**
 * The dashboard fragment that follows the hero. It stays on the hero's ink so the
 * two read as one dark chapter — the first colour cut of the page is saved for the
 * yellow block underneath, where it lands harder.
 */
export function SystemFragment() {
  const motionOk = useMotionOk();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [56, -56]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);

  return (
    <ColorBlock tone="ink" pad="sm" label="Product proof">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Reveal>
              <BlockTag>Live surface · School OS</BlockTag>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
                {school.tagline}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-dim">
                {school.shift}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <dl className="mt-8 border-t rule">
                {school.outcomes.map((outcome) => (
                  <div key={outcome.label} className="flex items-baseline gap-4 border-b rule py-3">
                    <dt className="display w-[5.5rem] shrink-0 text-[1.5rem] leading-none">
                      {outcome.metric}
                    </dt>
                    <dd className="text-[0.8125rem] leading-snug text-dim">{outcome.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7">
                <Action to="/products" variant="outline" arrow="→" cursor="explore">
                  Open the system
                </Action>
              </div>
            </Reveal>
          </div>

          <div ref={ref} className="lg:col-span-7">
            <motion.div style={motionOk ? { y, scale } : undefined} data-cursor="explore">
              <Screen screen="school" ratio="16 / 11" />
            </motion.div>
          </div>
        </div>
      </Shell>
    </ColorBlock>
  );
}
