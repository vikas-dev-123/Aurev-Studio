/**
 * The colour law.
 *
 * A block owns exactly one tone. A tone resolves to one flat background and the
 * ink that is legible on it. Nothing here interpolates between two brand hues —
 * there is no gradient, no crossfade, no mixed pair. Tones are applied as a
 * `data-tone` attribute; `src/styles/globals.css` maps each tone to CSS custom
 * properties, so every child reads its ink from the block it is standing in.
 */
export const TONES = [
  'yellow',
  'yellow-deep',
  'green',
  'green-deep',
  'pink',
  'pink-deep',
  'ink',
  'paper',
] as const;

export type Tone = (typeof TONES)[number];

/** The three brand hues plus the two neutral anchors. */
export type Hue = 'yellow' | 'green' | 'pink' | 'neutral';

export type ToneSpec = {
  hue: Hue;
  bg: string;
  /** Primary text/icon colour. Verified against `bg` at WCAG AA in scripts/audit-color-law.mjs */
  fg: string;
  /** Allowed for large display type only (>= 24px / 19px bold). Null when nothing else passes. */
  displayFg: string | null;
  label: string;
};

export const INK_BLACK = '#0B0B0C';
export const PAPER_WHITE = '#FAF9F5';

export const tones: Record<Tone, ToneSpec> = {
  yellow: { hue: 'yellow', bg: '#F4D93E', fg: '#17170D', displayFg: null, label: 'Yellow' },
  'yellow-deep': { hue: 'yellow', bg: '#E6C42B', fg: '#17170D', displayFg: null, label: 'Yellow deep' },
  green: { hue: 'green', bg: '#2FD673', fg: '#08170F', displayFg: null, label: 'Green' },
  'green-deep': { hue: 'green', bg: '#1FB85F', fg: '#08170F', displayFg: null, label: 'Green deep' },
  pink: { hue: 'pink', bg: '#FF6FA0', fg: '#1A0510', displayFg: null, label: 'Pink' },
  'pink-deep': { hue: 'pink', bg: '#F1508A', fg: '#1A0510', displayFg: PAPER_WHITE, label: 'Pink deep' },
  ink: { hue: 'neutral', bg: INK_BLACK, fg: PAPER_WHITE, displayFg: null, label: 'Ink black' },
  paper: { hue: 'neutral', bg: PAPER_WHITE, fg: INK_BLACK, displayFg: null, label: 'Paper white' },
};

/** Accent colour used for isolated indicators on neutral chrome (nav dots, scroll dots). */
export const accentFor: Record<Hue, string> = {
  yellow: tones.yellow.bg,
  green: tones.green.bg,
  pink: tones.pink.bg,
  neutral: PAPER_WHITE,
};

export function hueOf(tone: Tone): Hue {
  return tones[tone].hue;
}

/**
 * Guard used by ColorBlock in development: a block may only ever hold one hue.
 * Two tones from different brand hues inside one block breaks the core rule.
 */
export function assertSingleHue(parent: Tone, child: Tone): void {
  const a = hueOf(parent);
  const b = hueOf(child);
  if (a === b || a === 'neutral' || b === 'neutral') return;
  throw new Error(
    `Colour law violation: a "${parent}" block cannot contain a "${child}" surface. One block, one hue.`,
  );
}
