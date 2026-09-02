import type { Config } from 'tailwindcss';

/** Every integer 0–100, so glass borders can be tuned to /8 and /12 rather than
 *  rounded to the nearest 5. Drives both `opacity-*` and the `bg-white/N` modifier. */
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
);

/**
 * The default Tailwind palette is removed on purpose. If a colour is not in the
 * brand system it cannot be typed into a class name — the colour law is enforced
 * at build time, not by review.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    opacity,
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#FFFFFF',
      black: '#000000',
      ink: '#0B0B0C',
      paper: '#FAF9F5',
      yellow: { DEFAULT: '#F4D93E', deep: '#E6C42B', ink: '#17170D' },
      green: { DEFAULT: '#2FD673', deep: '#1FB85F', ink: '#08170F' },
      pink: { DEFAULT: '#FF6FA0', deep: '#F1508A', ink: '#1A0510' },
    },
    screens: {
      xs: '430px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: ['clamp(3.25rem, 10vw, 10rem)', { lineHeight: '0.86', letterSpacing: '-0.04em' }],
        statement: ['clamp(2.5rem, 7.6vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        title: ['clamp(2rem, 4.6vw, 4.25rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        sub: ['clamp(1.375rem, 2.4vw, 2.25rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        mega: ['clamp(4rem, 16vw, 18rem)', { lineHeight: '0.8', letterSpacing: '-0.05em' }],
      },
      spacing: {
        block: 'clamp(4.5rem, 9vw, 9rem)',
        gutter: 'clamp(1.25rem, 4vw, 4.5rem)',
      },
      maxWidth: { shell: '96rem' },
      borderRadius: { none: '0' },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      zIndex: { nav: '50', overlay: '60', cursor: '70', loader: '80' },
    },
  },
  plugins: [],
} satisfies Config;
