import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ColorBlock } from '../color-blocks/ColorBlock';
import { BlockTag, Shell } from '../color-blocks/Shell';
import { Statement } from '../animations/Statement';
import { Action } from '../ui/Action';
import { useMotionOk } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';
import { configuratorSteps, type StepId } from '../../data/contact';
import { site } from '../../data/site';
import { EMPTY_ANSWERS, StepFields, briefLines, canAdvance, type Answers } from './StepFields';

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long the ink cover takes to reach full width — the swap happens under it. */
const COVER_MS = 300;

const TICKS = ['Scope', 'Sector', 'Problem', 'Contact', 'Budget'];

/** Why the Next button is dimmed — shown only while it is. */
const HINTS: Record<StepId, string> = {
  need: 'Pick at least one.',
  industry: 'Choose the closest sector.',
  context: 'A sentence or two is enough.',
  details: 'A name and a working email, so we can reply.',
  budget: 'A band and a timeline.',
};

const LAST = configuratorSteps.length - 1;

function mailto(answers: Answers): string {
  const subject = `Project brief — ${answers.org.trim() || answers.name.trim() || 'new enquiry'}`;
  const body = briefLines(answers)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * §17's five colour-stepped panels.
 *
 * Only one step is mounted at a time, so the background change between steps is a
 * hard cut by construction — there is no second panel to crossfade with. When
 * motion is allowed, an ink-black panel sweeps across first and the swap happens
 * while it covers the screen, for the same reason the route wipe is neutral: two
 * brand hues may never be on screen together.
 *
 * There is no form endpoint. Send opens the visitor's own mail client with the
 * brief already written, which is honest about where the data goes and means the
 * page collects nothing until they press send.
 */
export function Configurator() {
  const motionOk = useMotionOk();
  const [index, setIndex] = useState(0);
  const [review, setReview] = useState(false);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [sweep, setSweep] = useState(0);
  const [copied, setCopied] = useState(false);

  const heading = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const step = configuratorSteps[index];
  const ready = canAdvance(step, answers);

  const set = useCallback((patch: Partial<Answers>) => {
    setAnswers((current) => ({ ...current, ...patch }));
  }, []);

  /** Applies a panel change under the cover, then puts focus at the top of it. */
  const move = useCallback(
    (apply: () => void) => {
      const commit = () => {
        apply();
        setCopied(false);
        heading.current?.focus({ preventScroll: true });
      };
      if (!motionOk) {
        commit();
        return;
      }
      setSweep((count) => count + 1);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(commit, COVER_MS);
    },
    [motionOk],
  );

  const next = () =>
    move(() => {
      if (index === LAST) setReview(true);
      else setIndex(index + 1);
    });

  const back = () =>
    move(() => {
      if (review) setReview(false);
      else setIndex(Math.max(0, index - 1));
    });

  const restart = () =>
    move(() => {
      setReview(false);
      setIndex(0);
      setAnswers(EMPTY_ANSWERS);
    });

  const brief = briefLines(answers);

  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(brief.map(([l, v]) => `${l}: ${v}`).join('\n')).then(
      () => setCopied(true),
      () => setCopied(false),
    );
  };

  return (
    <div className="relative overflow-hidden">
      <ColorBlock
        tone={review ? 'ink' : step.tone}
        pad="screen"
        grid={!review}
        labelledBy="configurator-title"
        contentClassName="pt-[var(--nav-h)]"
      >
        <Shell>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <BlockTag>
              {review ? 'Your brief' : `Step ${index + 1} of ${configuratorSteps.length}`}
            </BlockTag>
            <p className="text-[0.75rem] opacity-55">
              No data leaves this page until you press send.
            </p>
          </div>

          <ol aria-hidden className="mt-5 grid grid-cols-5 gap-1.5">
            {configuratorSteps.map((tick, position) => (
              <li key={tick.id}>
                <span
                  className="block h-[3px] w-full bg-[currentColor] transition-opacity duration-500"
                  style={{ opacity: review || position <= index ? 0.85 : 0.2 }}
                />
                <span className="eyebrow mt-2 hidden opacity-55 sm:block">{TICKS[position]}</span>
              </li>
            ))}
          </ol>

          <div ref={heading} tabIndex={-1} className="mt-9 outline-none lg:mt-11">
            <Statement id="configurator-title" as="h1" size="statement">
              {review ? 'ONE LAST|_look_, THEN|WE REPLY.' : step.question.toUpperCase()}
            </Statement>
            <p className="lede mt-6 max-w-[48ch] text-dim">
              {review
                ? 'Everything you told us, in the order we read it. Send opens your own mail app with this already written, so you can edit it before it goes.'
                : step.helper}
            </p>
          </div>

          {review ? (
            <dl className="mt-11 grid gap-x-12 gap-y-6 border-t rule pt-8 sm:grid-cols-2">
              {brief.map(([label, value]) => (
                <div key={label} className="border-b rule pb-4">
                  <dt className="eyebrow opacity-55">{label}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (ready) next();
              }}
              className="mt-10 lg:mt-12"
            >
              <StepFields step={step} answers={answers} set={set} />
              <input type="submit" hidden aria-hidden tabIndex={-1} />
            </form>
          )}

          <div
            className={cn(
              'mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t rule-strong pt-7',
              'lg:mt-14',
            )}
          >
            {review ? (
              <>
                <Action href={mailto(answers)} size="lg" arrow="↗" cursor="open">
                  Send this brief
                </Action>
                <Action onClick={copy} variant="outline" cursor="next">
                  {copied ? 'Copied' : 'Copy it instead'}
                </Action>
              </>
            ) : (
              <Action onClick={next} size="lg" arrow="→" disabled={!ready} cursor="next">
                {index === LAST ? 'Review the brief' : 'Next'}
              </Action>
            )}
            {index > 0 || review ? (
              <Action onClick={back} variant="bare" cursor="next">
                Back
              </Action>
            ) : null}
            {review ? (
              <Action onClick={restart} variant="bare" cursor="next">
                Start again
              </Action>
            ) : null}
            {!review && !ready ? (
              <p className="text-[0.75rem] opacity-55">{HINTS[step.id]}</p>
            ) : null}
          </div>

          <p aria-live="polite" className="sr-only">
            {review
              ? 'Review your brief, then send it.'
              : `Step ${index + 1} of ${configuratorSteps.length}. ${step.question}`}
          </p>
        </Shell>
      </ColorBlock>

      {motionOk && sweep > 0 ? (
        <motion.div
          key={sweep}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-ink"
          initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={{
            clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 100%)'],
          }}
          transition={{ duration: 0.66, times: [0, COVER_MS / 660, 1], ease: EASE }}
        />
      ) : null}
    </div>
  );
}
