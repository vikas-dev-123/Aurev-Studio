import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Registers GSAP plugins exactly once, on the client only.
 * Call from inside an effect — never at module scope in a component file.
 */
export function useGsapSetup(): typeof gsap {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 0.9 });
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };

/** Refresh triggers after route changes / late-loading media. */
export function refreshScrollTriggers(): void {
  if (typeof window === 'undefined') return;
  ScrollTrigger.refresh();
}

/** Kill every trigger created by a page so a route change cannot leak pins. */
export function killScrollTriggers(): void {
  if (typeof window === 'undefined') return;
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
