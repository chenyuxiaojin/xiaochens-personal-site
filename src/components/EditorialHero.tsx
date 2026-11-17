import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { InteractiveHeroScene } from './InteractiveHeroScene'

export function EditorialHero() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.body.dataset.heroIntro = 'landed'
    return () => {
      delete document.body.dataset.heroIntro
    }
  }, [])

  return (
    <section
      id="hero"
      data-hero-phase="landed"
      className="relative isolate box-border flex h-screen overflow-hidden px-4 pb-7 pt-28 sm:px-7 md:pt-32"
      style={{ boxSizing: 'border-box' }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-[1520px] grid-rows-[auto_1fr]">
        <div className="text-center">
          <motion.h1
            data-hero-title
            className="inline-flex whitespace-nowrap text-[clamp(4.2rem,10.5vw,10.8rem)] leading-[0.86] tracking-normal text-[var(--color-ink)]"
            initial={reduceMotion ? false : { opacity: 0, y: -22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.86, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              data-title-serif
              className="font-[family:var(--font-heavy-zh)] font-black italic [transform:skewX(-8deg)]"
            >
              陈
            </span>
            <span
              data-title-sans
              className="-ml-[0.03em] font-[family:var(--font-heavy-zh)] font-black not-italic"
            >
              与小金
            </span>
          </motion.h1>
        </div>

        <div className="relative min-h-0 py-2">
          <InteractiveHeroScene />
        </div>
      </div>
    </section>
  )
}
