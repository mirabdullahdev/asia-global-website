import { type Variants } from 'framer-motion'

/** Shared easing curve (expo-out feel) for all site animations. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Standard fade-and-rise used by scroll reveals. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}
