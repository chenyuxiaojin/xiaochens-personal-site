import { about, identity } from '../lib/content'
import { Reveal } from './Reveal'

export function AboutEditorial() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] px-4 py-16 text-[var(--color-paper)] sm:px-7 lg:py-24"
    >
      <div className="mx-auto max-w-[1520px]">
        <Reveal className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-start">
          <div>
            <p className="editorial-label text-[var(--color-paper)]/62">02 / About</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-[var(--color-paper)]/62">
              {identity.role}
              <br />
              {identity.location}
            </p>
          </div>

          <div className="relative min-h-[76vh]">
            <h1 className="relative z-20 max-w-[58rem] text-[clamp(3rem,5.7vw,5.9rem)] font-semibold leading-[0.95]">
              <span>我是小陈，</span>
              <br />
              <span>陈与小金。</span>
              <br />
              <span>主 Claude Code，</span>
              <br />
              <span>次 Codex。</span>
            </h1>
            <img
              src={identity.portrait}
              alt=""
              className="absolute bottom-0 right-0 z-10 h-[48vh] w-[64vw] max-w-4xl object-cover opacity-70 grayscale md:h-[58vh]"
            />
            <p className="absolute bottom-6 left-0 z-20 max-w-xl text-lg leading-8 text-[var(--color-paper)]/72 md:text-2xl md:leading-10">
              {about.body}
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className="field-notes mt-14 grid gap-8 border-t border-[var(--color-paper)]/20 pt-8 md:grid-cols-[0.45fr_1.55fr]"
        >
          <p className="editorial-label text-[var(--color-paper)]/62">What I do</p>
          <div className="grid gap-6">
            <p className="max-w-5xl text-[clamp(2rem,5vw,5.6rem)] font-semibold leading-[0.98] text-[var(--color-paper)]">
              {about.capabilities.join(', ')}.
            </p>
            <div className="grid gap-4 text-sm leading-7 text-[var(--color-paper)]/68 md:grid-cols-4">
              {about.pillars.map((pillar) => (
                <p key={pillar}>{pillar}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
