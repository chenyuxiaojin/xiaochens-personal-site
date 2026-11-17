import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { portfolio, portfolioIntro, works } from '../lib/content'
import { Reveal } from './Reveal'

const SLIDER_EASE = 0.06
const DRAG_RELEASE_HOLD = 800

export function WorksIndex() {
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const railX = useMotionValue(0)
  const dragRef = useRef({
    active: false,
    startPointer: 0,
    startX: 0,
    lastPointer: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
    targetX: 0,
    visualX: 0,
    raf: 0,
    releaseTimer: 0,
  })
  const extendedWorks = useMemo(
    () =>
      works.flatMap((work, index) => [
        { ...work, year: index < 1 ? '2026' : index < 3 ? '2025' : '2024' },
        {
          ...work,
          n: `${work.n}b`,
          title: `${work.title} / note`,
          category: index % 2 === 0 ? 'Build' : 'Media',
          year: index < 2 ? '2025' : '2024',
        },
      ]),
    [],
  )

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(dragRef.current.raf)
      window.clearTimeout(dragRef.current.releaseTimer)
    }
  }, [])

  const clampSliderX = (value: number, track: HTMLElement) => {
    const maxTravel = Math.max(track.scrollWidth - window.innerWidth + 56, 0)
    return Math.max(Math.min(value, 0), -maxTravel)
  }

  const startSliderLoop = () => {
    const drag = dragRef.current
    if (drag.raf) return

    const tick = () => {
      const state = dragRef.current
      const delta = state.targetX - state.visualX
      state.visualX += delta * SLIDER_EASE
      if (Math.abs(delta) < 0.35) state.visualX = state.targetX
      railX.set(state.visualX)

      if (state.active || Math.abs(state.targetX - state.visualX) > 0.35) {
        state.raf = window.requestAnimationFrame(tick)
      } else {
        state.raf = 0
      }
    }

    drag.raf = window.requestAnimationFrame(tick)
  }

  return (
    <section id="works" className="relative overflow-hidden px-4 sm:px-7">
      <div className="flex min-h-screen flex-col justify-between pb-7 pt-28 md:pb-10 md:pt-32">
        <div className="mx-auto w-full max-w-[1520px]">
          <Reveal className="grid min-h-[28vh] gap-5 md:grid-cols-[0.5fr_2.4fr_0.5fr] md:items-center">
            <p className="editorial-label max-w-52 leading-relaxed text-[var(--color-ink)]">
              Selected works I
              <br />
              have shipped since 2024
            </p>
            <div className="relative z-20 min-h-[clamp(5.5rem,12vw,9rem)] overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeTitle ?? 'my-works'}
                  className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-3 leading-[0.9] text-[var(--color-ink)] ${
                    activeTitle
                      ? 'whitespace-nowrap font-[family:var(--font-heavy-zh)] text-[clamp(2.7rem,5vw,5.5rem)] font-black'
                      : 'font-[family:var(--font-heavy-en)] text-[clamp(3.4rem,7vw,6.3rem)] font-black'
                  }`}
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: '-50%', opacity: 1 }}
                  exit={{ y: '-160%', opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
                >
                  {activeTitle ? (
                    activeTitle
                  ) : (
                    <>
                      <span className="font-[family:var(--font-heavy-zh)] italic [transform:skewX(-8deg)]">
                        My
                      </span>
                      <span className="ml-[0.08em] font-[family:var(--font-heavy-en)] not-italic">
                        Works
                      </span>
                    </>
                  )}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="editorial-label justify-self-start leading-relaxed text-[var(--color-ink)] md:justify-self-end md:text-right">
              Hold and drag
              <br />
              to discover
            </p>
          </Reveal>
        </div>

        <div className="relative -mx-4 overflow-hidden sm:-mx-7">
          <motion.div
          className={`works-drag-track flex min-w-max cursor-grab items-end gap-4 px-7 md:gap-6 ${
            isDragging ? 'is-dragging cursor-grabbing' : ''
          }`}
          data-cursor="drag"
          style={{ x: railX }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            window.clearTimeout(dragRef.current.releaseTimer)
            const currentX = dragRef.current.visualX
            dragRef.current = {
              ...dragRef.current,
              active: true,
              startPointer: event.clientX,
              startX: currentX,
              lastPointer: event.clientX,
              lastTime: performance.now(),
              velocity: 0,
              moved: false,
              targetX: currentX,
              visualX: currentX,
            }
            setIsDragging(true)
            startSliderLoop()
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current
            if (!drag.active) return
            const now = performance.now()
            const delta = event.clientX - drag.startPointer
            const next = clampSliderX(drag.startX + delta, event.currentTarget)
            drag.targetX = next
            const elapsed = Math.max(now - drag.lastTime, 16)
            drag.velocity = ((event.clientX - drag.lastPointer) / elapsed) * 16
            drag.lastPointer = event.clientX
            drag.lastTime = now
            if (Math.abs(delta) > 8) drag.moved = true
            startSliderLoop()
          }}
          onPointerUp={(event) => {
            const drag = dragRef.current
            if (!drag.active) return
            event.currentTarget.releasePointerCapture(event.pointerId)
            const projected = clampSliderX(drag.targetX + drag.velocity * 28, event.currentTarget)
            drag.targetX = projected
            drag.active = false
            startSliderLoop()
            window.clearTimeout(drag.releaseTimer)
            drag.releaseTimer = window.setTimeout(() => setIsDragging(false), DRAG_RELEASE_HOLD)
          }}
          onClickCapture={(event) => {
            if (dragRef.current.moved) {
              event.preventDefault()
              event.stopPropagation()
              dragRef.current.moved = false
            }
          }}
          onMouseLeave={() => {
            setActiveTitle(null)
            setActiveWorkIndex(null)
          }}
        >
          {extendedWorks.map((work, index) => {
            const isYearStart = index === 0 || extendedWorks[index - 1].year !== work.year
            const tile = (
              <article
                className={`hover-preview relative grid ${
                  index % 3 === 1 ? 'h-[18rem] w-[22rem]' : 'h-[14rem] w-[18rem]'
                } place-items-end overflow-hidden bg-[var(--color-line)]/40`}
                onMouseEnter={() => {
                  setActiveTitle(work.title)
                  setActiveWorkIndex(index)
                }}
              >
                <img
                  src={work.image}
                  alt=""
                  draggable="false"
                  className={`filter-normal absolute inset-0 h-full w-full object-cover transition duration-500 ${
                    activeWorkIndex !== null && activeWorkIndex !== index
                      ? 'active grayscale opacity-45'
                      : ''
                  }`}
                />
                <div className="pointer-events-none relative z-10 ml-auto p-3 text-[var(--color-paper)] opacity-0 transition-opacity duration-300 hover-preview__icon">
                  {work.href ? <ArrowUpRight size={22} aria-hidden="true" /> : null}
                </div>
              </article>
            )

            return (
              <div key={`${work.n}-${index}`} className="flex items-end gap-4 md:gap-6">
                {isYearStart ? (
                  <div className="mr-2 flex h-[18rem] w-28 flex-col justify-between">
                    <p className="font-[family:var(--font-heavy-en)] text-4xl leading-none">
                      {work.year}
                    </p>
                    <p className="editorial-label text-[var(--color-ink-soft)]">
                      {index === 0 ? '4 projects' : '2 projects'}
                    </p>
                  </div>
                ) : null}
                {work.href ? (
                  <a href={work.href} target="_blank" rel="noreferrer">
                    {tile}
                  </a>
                ) : (
                  tile
                )}
              </div>
            )
          })}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
        </div>
      </div>

      <div className="mx-auto grid min-h-[55vh] max-w-[1520px] gap-10 py-24 md:grid-cols-[0.6fr_1.4fr] md:items-start md:py-36">
        <div>
          <p className="editorial-label text-[var(--color-ink-soft)]">Index</p>
          <p className="mt-5 max-w-52 text-sm leading-7 text-[var(--color-ink-soft)]">
            {portfolioIntro}
          </p>
        </div>
        <div className="grid border-t hairline">
          {portfolio.map((project) => (
            <article
              key={project.n}
              className="grid gap-5 border-b hairline py-10 md:grid-cols-[4.5rem_1fr] md:gap-8 md:py-14"
            >
              <span className="font-[family:var(--font-heavy-en)] text-xl leading-none text-[var(--color-ink-soft)]/70">
                {project.n}
              </span>
              <div className="grid gap-5">
                <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-2xl font-semibold md:text-3xl">{project.name}</span>
                  <span className="editorial-label text-[var(--color-ink-soft)]">
                    {project.category}
                  </span>
                </p>
                <p className="max-w-xl text-base leading-8">{project.summary[0]}</p>
                {project.summary.length > 1 ? (
                  <p className="max-w-xl text-sm leading-7 text-[var(--color-ink-soft)]">
                    {project.summary.slice(1).join('')}
                  </p>
                ) : null}
                <p className="flex flex-wrap gap-x-6 gap-y-1 pt-1">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm font-semibold"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="opacity-40 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
