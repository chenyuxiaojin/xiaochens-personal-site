import { motion } from 'motion/react'
import type { DecoPosition } from '../lib/content'

type FloatingDecoProps = {
  src?: string
  alt?: string
  pos: DecoPosition
  triggerOnView?: boolean
  delay?: number
  size?: number
}

const POS_CLASS: Record<DecoPosition, string> = {
  'top-left': 'top-20 left-6 md:top-24 md:left-12',
  'top-right': 'top-20 right-6 md:top-24 md:right-12',
  'bottom-left': 'bottom-12 left-6 md:bottom-20 md:left-12',
  'bottom-right': 'bottom-12 right-6 md:bottom-20 md:right-12',
}

export function FloatingDeco({
  src,
  alt = '',
  pos,
  triggerOnView,
  delay = 0,
  size = 128,
}: FloatingDecoProps) {
  const inner = src ? (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
    />
  ) : (
    <div className="h-full w-full rounded-2xl bg-zinc-700/60 ring-1 ring-white/5" />
  )

  const floatAnim = {
    animate: { y: [0, -8, 0] },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  }

  if (triggerOnView) {
    return (
      <motion.div
        className={`absolute ${POS_CLASS[pos]} pointer-events-none`}
        style={{ width: size, height: size }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        <motion.div className="h-full w-full" {...floatAnim}>
          {inner}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`absolute ${POS_CLASS[pos]} pointer-events-none`}
      style={{ width: size, height: size }}
      {...floatAnim}
    >
      {inner}
    </motion.div>
  )
}
