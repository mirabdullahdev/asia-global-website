import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

type Item = { title: string; desc: string }

const INTERVAL = 4200

/**
 * Auto-rotating showcase of capabilities. Advances on its own — no controls —
 * cross-fading each card. A slim, non-interactive progress bar tracks the timer.
 */
export default function CapabilityCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0)
  const count = items.length

  useEffect(() => {
    if (count <= 1) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    // Slow the cadence a touch when motion is reduced; still auto-advances.
    const id = setInterval(
      () => setIndex((i) => (i + 1) % count),
      prefersReducedMotion ? INTERVAL + 1600 : INTERVAL,
    )
    return () => clearInterval(id)
  }, [count])

  const item = items[index]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] p-8 backdrop-blur-md sm:p-10">
      {/* soft accent glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-clay-500/25 blur-3xl" />

      <div className="relative min-h-[210px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <h3 className="font-display text-2xl font-medium text-white sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-white/70">{item.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress indicators (decorative, non-interactive) */}
      <div className="mt-10 flex items-center gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className="relative h-1 overflow-hidden rounded-full bg-white/20 transition-all duration-500"
            style={{ width: i === index ? '2.5rem' : '0.6rem' }}
          >
            {i === index && (
              <motion.span
                key={index}
                className="absolute inset-0 origin-left rounded-full bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
