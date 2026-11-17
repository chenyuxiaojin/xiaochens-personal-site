import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'hover' | 'loading' | 'leaving'
const TRANSITION_BAND = '16.2037vh'

function labelFromAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href') ?? ''
  const explicit = anchor.dataset.menu
  if (explicit) return explicit
  if (href === '/' || href.includes('home')) return 'Home'
  if (href.includes('works')) return 'Works'
  if (href.includes('about')) return 'About'
  if (href.includes('playground')) return 'Playground'
  if (href.includes('play-ground')) return 'Playground'
  if (href.includes('contact')) return 'Contact'
  return anchor.textContent?.replace(/\s+/g, ' ').trim() || 'Explore'
}

function internalPathFromAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null
  }
  if (anchor.target && anchor.target !== '_self') return null

  const url = new URL(href, window.location.href)
  if (url.origin !== window.location.origin) return null
  return `${url.pathname}${url.search}${url.hash}`
}

function SplitLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {label.split('').map((char, index) => (
        <motion.span
          key={`${label}-${index}`}
          className="inline-block"
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '105%', opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00a0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export function ExperienceTransition() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [label, setLabel] = useState('Home')
  const [progress, setProgress] = useState(0)
  const targetRef = useRef<string | null>(null)
  const timersRef = useRef<number[]>([])
  const phaseRef = useRef<Phase>('idle')

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      timersRef.current = []
    }

    const anchorFromEvent = (event: Event) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || !internalPathFromAnchor(anchor)) return null
      return anchor
    }

    const onMouseOver = (event: MouseEvent) => {
      const anchor = anchorFromEvent(event)
      if (!anchor || phaseRef.current === 'loading') return
      setLabel(labelFromAnchor(anchor))
      setPhase('hover')
    }

    const onMouseOut = (event: MouseEvent) => {
      const anchor = anchorFromEvent(event)
      if (!anchor || phaseRef.current === 'loading') return
      const nextTarget = event.relatedTarget as HTMLElement | null
      if (nextTarget && anchor.contains(nextTarget)) return
      setPhase('idle')
    }

    const onClick = (event: MouseEvent) => {
      const anchor = anchorFromEvent(event)
      if (!anchor) return
      const href = internalPathFromAnchor(anchor)
      if (!href) return
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
      if (href === current) return

      event.preventDefault()
      clearTimers()
      targetRef.current = href
      setLabel(labelFromAnchor(anchor))
      setProgress(0)
      setPhase('loading')

      const steps = reduceMotion ? [100] : [12, 25, 39, 52, 67, 82, 100]
      steps.forEach((value, index) => {
        timersRef.current.push(
          window.setTimeout(
            () => setProgress(value),
            reduceMotion ? 0 : 110 + index * 105,
          ),
        )
      })

      timersRef.current.push(
          window.setTimeout(
            () => {
              window.history.pushState(null, '', targetRef.current || href)
              window.dispatchEvent(new CustomEvent('cyxj:navigate'))
            },
            reduceMotion ? 0 : 620,
          ),
      )

      timersRef.current.push(
        window.setTimeout(
          () => {
            setPhase('leaving')
          },
          reduceMotion ? 0 : 980,
        ),
      )

      timersRef.current.push(
        window.setTimeout(
          () => {
            setPhase('idle')
            setProgress(0)
          },
          reduceMotion ? 1 : 1480,
        ),
      )
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('click', onClick)
    return () => {
      clearTimers()
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('click', onClick)
    }
  }, [reduceMotion])

  return (
    <>
      <AnimatePresence>
        {phase === 'hover' ? (
          <motion.div
            className="experience-transition transition-preview pointer-events-none fixed inset-x-0 top-1/2 z-[95] flex -translate-y-1/2 items-center justify-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
            initial={{ height: 0 }}
            animate={{ height: TRANSITION_BAND }}
            exit={{ height: 0 }}
            transition={{ duration: 0.38, ease: [0.83, 0, 0.17, 1] }}
            aria-hidden="true"
          >
            <p className="font-[family:var(--font-heavy-en)] text-[clamp(2.8rem,8vw,8rem)] leading-none">
              <SplitLabel label={label} />
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'loading' || phase === 'leaving' ? (
          <motion.div
            className="experience-transition transition-progress pointer-events-none fixed inset-x-0 top-1/2 z-[110] grid -translate-y-1/2 place-items-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
            initial={{ height: phase === 'loading' ? TRANSITION_BAND : '100vh', y: '0%' }}
            animate={{
              height: '100vh',
              y: phase === 'leaving' ? '-110%' : '0%',
            }}
            exit={{ height: '100vh', y: '-110%' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.86, ease: [0.83, 0, 0.17, 1] }}
            aria-hidden="true"
          >
            <div className="text-center">
              <p className="font-[family:var(--font-heavy-en)] text-[clamp(3.5rem,10vw,11rem)] leading-none text-[var(--color-paper)]/12">
                <SplitLabel label={label} />
              </p>
              <p className="relative -mt-[0.5em] text-lg font-semibold md:text-3xl">
                Loading - {progress}%
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
