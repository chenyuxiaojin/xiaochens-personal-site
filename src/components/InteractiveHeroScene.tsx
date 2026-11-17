import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

const heroImageSrc = '/assets/identity/hero-line.webp'

export function InteractiveHeroScene() {
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const imageX = useTransform(sx, [-1, 1], [-10, 10])
  const imageY = useTransform(sy, [-1, 1], [-7, 7])

  return (
    <motion.div
      data-hero-intro-scene="landed"
      className="interactive-hero-scene relative flex h-full w-full items-center justify-center"
      onMouseMove={(event) => {
        if (reduceMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
        my.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex h-full w-full items-center justify-center"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          data-primary-visual
          aria-hidden="true"
          src={heroImageSrc}
          alt=""
          draggable="false"
          className="max-h-[44vh] w-auto max-w-full object-contain grayscale contrast-110 saturate-0 mix-blend-multiply md:max-h-[52vh]"
          style={reduceMotion ? undefined : { x: imageX, y: imageY }}
        />
      </motion.div>
    </motion.div>
  )
}
