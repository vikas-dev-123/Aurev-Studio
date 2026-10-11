import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionOk, usePointerFine } from '../../hooks/useMediaQuery';

type Label = '' | 'view' | 'explore' | 'open' | 'drag' | 'next';

const READABLE: Record<Exclude<Label, ''>, string> = {
  view: 'View',
  explore: 'Explore',
  open: 'Open',
  drag: 'Drag',
  next: 'Next',
};

/**
 * A square — not a circle — because site chrome carries no radius. It stays
 * neutral by borrowing the ink and background of whatever [data-tone] block is
 * under the pointer, so it is legible on yellow, green, pink and black without
 * ever introducing a second hue.
 */
export function Cursor() {
  const fine = usePointerFine();
  const motionOk = useMotionOk();
  const enabled = fine && motionOk;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.35 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.35 });
  const padX = useSpring(x, { stiffness: 210, damping: 24, mass: 0.5 });
  const padY = useSpring(y, { stiffness: 210, damping: 24, mass: 0.5 });

  const [label, setLabel] = useState<Label>('');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ink, setInk] = useState<{ fg: string; bg: string }>({ fg: '#FAF9F5', bg: '#0B0B0C' });
  const visibleRef = useRef(false);
  const hasMoved = useRef(false);
  const currentBlockRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('cursor-none');
    return () => document.documentElement.classList.remove('cursor-none');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      const cx = event.clientX;
      const cy = event.clientY;

      if (!hasMoved.current) {
        hasMoved.current = true;
        x.set(cx);
        y.set(cy);
        dotX.jump(cx);
        dotY.jump(cy);
        padX.jump(cx);
        padY.jump(cy);
      } else {
        x.set(cx);
        y.set(cy);
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    // Tone + label only change when the pointer crosses into a new element,
    // so the expensive lookups stay off the move path.
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;
      const hit = target.closest('[data-cursor]');
      const next = (hit?.getAttribute('data-cursor') ?? '') as Label;
      const nextValid = next in READABLE ? next : '';
      setLabel((prev) => (prev === nextValid ? prev : nextValid));

      const block = target.closest('[data-tone]');
      if (block && block !== currentBlockRef.current) {
        currentBlockRef.current = block;
        const style = getComputedStyle(block);
        const fg = style.getPropertyValue('--fg').trim();
        const bg = style.getPropertyValue('--bg').trim();
        if (fg && bg) {
          setInk((prev) => (prev.fg === fg && prev.bg === bg ? prev : { fg, bg }));
        }
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, [enabled, dotX, dotY, padX, padY, x, y]);

  if (!enabled) return null;

  const labelled = label !== '';

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-cursor overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center"
        style={{ x: padX, y: padY, backgroundColor: ink.fg, color: ink.bg }}
        animate={{
          width: labelled ? 82 : 30,
          height: labelled ? 82 : 30,
          opacity: visible ? (labelled ? 1 : 0.14) : 0,
          scale: pressed ? 0.88 : 1,
          marginLeft: labelled ? -41 : -15,
          marginTop: labelled ? -41 : -15,
        }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="eyebrow text-[0.5625rem]"
          animate={{ opacity: labelled ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          {labelled ? READABLE[label] : ''}
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5"
        style={{ x: dotX, y: dotY, backgroundColor: ink.fg }}
        animate={{ opacity: visible && !labelled ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
