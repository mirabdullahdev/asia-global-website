import { useEffect, useState } from 'react'

/** Matches Tailwind's `lg` breakpoint. */
const DESKTOP_QUERY = '(min-width: 1024px)'

/**
 * True on desktop-width viewports. Used to render only ONE hero <video> so the
 * browser downloads just the landscape or the portrait file — never both.
 * Evaluated synchronously on first render to avoid loading the wrong source.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    // Sync on mount, and listen to both `change` and `resize` — some browsers
    // don't reliably fire the media-query change event on viewport resize.
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      mq.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return isDesktop
}
