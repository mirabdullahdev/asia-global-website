import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { EASE } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger offset in seconds. */
  delay?: number
  /** Vertical travel distance in px (default 28). */
  y?: number
}

/** Subtle fade-and-rise as the element scrolls into view. Animates once. */
export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
