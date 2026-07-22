import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

type Item = { image: string; label: string }

const btn =
  'flex size-11 items-center justify-center rounded-full border border-cream-200 bg-white text-ink shadow-sm transition-colors hover:bg-cream-100'

/**
 * Fullscreen product viewer. Click the image (or the zoom button) to toggle a
 * cursor-following magnify; arrows/keys move between items.
 */
export default function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: Item[]
  index: number | null
  onIndexChange: (i: number) => void
  onClose: () => void
}) {
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const open = index !== null
  const item = open ? items[index] : null

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      setZoomed(false)
      onIndexChange((index + dir + items.length) % items.length)
    },
    [index, items.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go, onClose])

  const onMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoomed) return
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    )
  }

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm"
        >
          {/* Top-right controls */}
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <button
              type="button"
              aria-label="Zoom"
              onClick={(e) => {
                stop(e)
                setZoomed((z) => !z)
              }}
              className={btn}
            >
              {zoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                stop(e)
                onClose()
              }}
              className={btn}
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Prev / next */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  stop(e)
                  go(-1)
                }}
                className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 ${btn}`}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  stop(e)
                  go(1)
                }}
                className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 ${btn}`}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="flex h-full w-full items-center justify-center overflow-hidden p-10 sm:p-16">
            <img
              key={item.image}
              src={item.image}
              alt={item.label}
              onClick={(e) => {
                stop(e)
                setZoomed((z) => !z)
              }}
              onMouseMove={onMove}
              onMouseLeave={() => setOrigin('50% 50%')}
              style={{ transformOrigin: origin, transform: zoomed ? 'scale(2.3)' : 'scale(1)' }}
              className={`max-h-full max-w-full select-none object-contain transition-transform duration-300 ${
                zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              draggable={false}
            />
          </div>

          <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-medium text-ink/60">
            {item.label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
