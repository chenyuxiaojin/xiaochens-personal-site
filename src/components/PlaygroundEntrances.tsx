import { ArrowUpRight } from 'lucide-react'
import { playground, serviceEntrances } from '../lib/content'
import { Reveal } from './Reveal'

export function PlaygroundEntrances() {
  return (
    <section id="playground" className="overflow-hidden px-4 sm:px-7">
      <div className="mx-auto flex min-h-screen max-w-[1520px] flex-col justify-between pb-9 pt-28 md:pt-32">
        <Reveal className="grid gap-5 md:grid-cols-[0.55fr_1.9fr_0.55fr] md:items-center">
          <p className="editorial-label text-[var(--color-ink-soft)]">03 / Playground</p>
          <h1 className="text-center font-[family:var(--font-heavy-en)] text-[clamp(3.5rem,7.8vw,8rem)] font-black leading-[0.88]">
            My Playground
          </h1>
          <p className="editorial-label justify-self-start leading-relaxed text-[var(--color-ink-soft)] md:justify-self-end md:text-right">
            Live doors
            <br />
            and tools
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(1.75rem,3.3vw,3.45rem)] font-medium leading-[1.08] tracking-normal">
            {playground.intro}
          </p>
          <p className="mt-10 text-sm font-semibold text-[var(--color-ink-soft)]">Scroll for more</p>
        </Reveal>
      </div>

      <div className="mx-auto grid min-h-[70vh] max-w-[1520px] gap-6 py-20 md:grid-cols-[0.45fr_1.55fr]">
        <p className="editorial-label text-[var(--color-ink-soft)]">Doors</p>
        <div className="grid border-t hairline">
          {serviceEntrances.map((item) => {
            const host = new URL(item.href).host

            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 border-b hairline py-5 md:grid-cols-[5rem_1fr_0.75fr_auto] md:items-center"
              >
                <span className="font-[family:var(--font-heavy-en)] text-4xl leading-none">
                  {item.n}
                </span>
                <span>
                  <span className="block text-xl font-semibold">{item.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--color-ink-soft)]">
                    {item.desc}
                  </span>
                </span>
                <span className="break-all text-xs font-semibold text-[var(--color-ink-soft)]">
                  {host}
                </span>
                <ArrowUpRight
                  size={20}
                  className="opacity-35 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
