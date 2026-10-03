const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Seconds the preloader curtain covers the page; hero entrance animations start after it. */
export const INTRO_DELAY = prefersReducedMotion ? 0 : 1.9;

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
