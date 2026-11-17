import { motion, useReducedMotion } from 'motion/react'
import { identity } from '../lib/content'

export function PageLoader() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      data-page-loader
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[var(--color-bg)] text-[var(--color-ink)]"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{
        duration: reduceMotion ? 0.01 : 1.05,
        delay: reduceMotion ? 0 : 0.95,
        ease: [0.83, 0, 0.17, 1],
      }}
    >
      <p className="absolute left-[-0.35em] top-[30vh] font-[family:var(--font-heavy-en)] text-2xl leading-none md:text-4xl">
        Loading...
      </p>
      <div className="absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-[1fr_1fr] px-7 text-center text-[0.7rem] font-semibold md:px-[38vw]">
        <p>Just a practical builder.</p>
        <p>From China with code.</p>
      </div>
      <div className="absolute inset-x-0 bottom-[20vh] mx-auto h-32 w-[28rem] max-w-[62vw] opacity-[0.08]">
        <div className="absolute left-[8%] top-[52%] h-px w-[84%] bg-[var(--color-ink)]" />
        <div className="absolute left-[30%] top-[24%] h-20 w-28 rounded-[50%] border border-[var(--color-ink)]" />
        <div className="absolute left-[52%] top-[12%] h-24 w-36 rounded-[48%] border border-[var(--color-ink)]" />
        <div className="absolute left-[46%] top-[42%] h-16 w-24 bg-[var(--color-ink)]" />
      </div>
      <div className="absolute bottom-8 left-7 right-7 flex items-center justify-between text-xs">
        <p>{identity.nameZh}</p>
        <p>{identity.role}</p>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden bg-[var(--color-ink)]/15">
        <motion.div
          className="h-full w-full origin-left bg-[var(--color-ink)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="sr-only">
          Loading...
      </span>
    </motion.div>
  )
}
