import type { Variants, Transition } from 'framer-motion'

export const springTransition: Transition = { type: 'spring', stiffness: 100, damping: 30 }
export const smoothTransition: Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
export const snappyTransition: Transition = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: smoothTransition }
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smoothTransition }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
}

export const scaleUpVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: smoothTransition }
}

export const slideInLeftVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: smoothTransition }
}

export const slideInRightVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: smoothTransition }
}

export const revealVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
}

export const letterVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}
