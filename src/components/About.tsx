import { about } from '../lib/content'
import { CtaPill } from './CtaPill'
import { FloatingDeco } from './FloatingDeco'

const DECO_READY = true

export function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
    >
      <h2 className="pointer-events-none absolute inset-x-0 top-[18%] text-center font-[family:var(--font-heavy-en)] text-[clamp(3rem,13vw,10rem)] leading-none tracking-tight text-[var(--color-ink)] select-none">
        {about.bigText}
      </h2>

      <div className="relative z-10 mx-auto max-w-xl space-y-8 text-center">
        <p className="text-base leading-relaxed text-[var(--color-ink-soft)] md:text-lg">
          {about.body}
        </p>
        <div className="flex justify-center">
          <CtaPill href={about.cta.href}>{about.cta.label} →</CtaPill>
        </div>
      </div>

      {Object.entries(about.decos).map(([key, deco]) => (
        <FloatingDeco
          key={key}
          src={DECO_READY ? deco.src : undefined}
          alt={key}
          pos={deco.pos}
          triggerOnView={deco.triggerOnView}
        />
      ))}
    </section>
  )
}
