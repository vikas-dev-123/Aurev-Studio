import { useEffect, useState } from 'react';

/** SSR-safe media query subscription. */
export function useMediaQuery(query: string, fallback = false): boolean {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the visitor has not asked for reduced motion. */
export function useMotionOk(): boolean {
  return !useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Desktop pointer: gates the custom cursor, pinned scroll and parallax. */
export function usePointerFine(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
