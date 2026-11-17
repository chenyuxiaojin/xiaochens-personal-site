import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <motion.div
      className="scroll-progress fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-[var(--color-accent)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
