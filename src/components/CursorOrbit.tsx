import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export function CursorOrbit() {
  const [ready, setReady] = useState(false)
  const [mode, setMode] = useState<'idle' | 'link' | 'drag'>('idle')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 34 })
  const sy = useSpring(y, { stiffness: 420, damping: 34 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setReady(true)
    }

    const updateMode = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest?.('[data-cursor="drag"], .works-drag-track')) {
        setMode('drag')
        return
      }
      if (target?.closest?.('a, button, .hover-preview')) {
        setMode('link')
        return
      }
      setMode('idle')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', updateMode, { passive: true })
    window.addEventListener('mouseout', updateMode, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', updateMode)
      window.removeEventListener('mouseout', updateMode)
    }
  }, [x, y])

  return (
    <motion.div
      data-loader-follow
      className="cursor-orbit pointer-events-none fixed left-0 top-0 z-[90] hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{ x: sx, y: sy }}
      animate={{
        opacity: ready ? 1 : 0,
        scale: mode === 'idle' ? 1 : mode === 'link' ? 1.55 : 1.9,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-[var(--color-ink)]/14 blur-md mix-blend-multiply" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-paper)] ring-1 ring-[var(--color-ink)]/35" />
      {mode === 'drag' ? (
        <span className="absolute inset-0 grid place-items-center text-[0.46rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
          Drag
        </span>
      ) : null}
    </motion.div>
  )
}
