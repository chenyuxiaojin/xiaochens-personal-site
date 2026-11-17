import { motion, useMotionValue, useSpring } from 'motion/react'
import { hero } from '../lib/content'
import { CtaPill } from './CtaPill'

export function Hero() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* 大字（顶部，金属银渐变，退到烟雾里） */}
      <h1
        className="pointer-events-none absolute left-0 right-0 top-24 z-0 bg-gradient-to-b from-[#d0d0d0] via-[#7a7a7a] to-[#2a2a2a] bg-clip-text text-center font-[family:var(--font-heavy-zh)] text-[clamp(2.5rem,13vw,10rem)] font-black leading-[0.9] tracking-[0.15em] text-transparent opacity-70 select-none md:top-28"
      >
        {hero.bigText}
      </h1>

      {/* 中心视频 */}
      <motion.div
        style={{ x: sx, y: sy }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          x.set((e.clientX - r.left - r.width / 2) * 0.04)
          y.set((e.clientY - r.top - r.height / 2) * 0.04)
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        className="relative z-10 mt-16 aspect-[16/10] w-[clamp(320px,38vw,560px)] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)] md:mt-24"
      >
        <video
          src={hero.videoSrc}
          poster={hero.videoPoster}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* 左下副文案 */}
      <div className="pointer-events-none absolute bottom-8 left-6 z-20 max-w-xs text-xs leading-relaxed text-[var(--color-ink-soft)] md:left-10 md:text-sm">
        {hero.subtitle.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {/* 右下 CTA */}
      <div className="absolute bottom-8 right-6 z-20 md:right-10">
        <CtaPill href={hero.cta.href}>{hero.cta.label} →</CtaPill>
      </div>
    </section>
  )
}
