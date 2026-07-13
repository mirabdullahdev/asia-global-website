import { type ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'

/**
 * App-wide Lenis smooth scroll. Exposes the instance via lenis/react's context
 * so components (e.g. route scroll-to-top) can call `useLenis().scrollTo(...)`.
 * Smoothing is switched off for users who prefer reduced motion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: !prefersReducedMotion,
      }}
    >
      {children}
    </ReactLenis>
  )
}
