import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** The page-wide Lenis instance (null when smooth scroll is disabled). */
export const getLenis = () => instance

/** Inertial smooth scrolling for the whole page, skipped for reduced-motion users. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, anchors: { offset: -80 }, autoRaf: true })
    instance = lenis

    return () => {
      lenis.destroy()
      instance = null
    }
  }, [])
}
