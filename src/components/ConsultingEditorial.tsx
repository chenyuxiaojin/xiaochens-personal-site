import { consulting, contact, footer } from '../lib/content'
import { Reveal } from './Reveal'

export function ConsultingEditorial() {
  return (
    <section id="consulting" className="relative isolate min-h-screen overflow-hidden px-4 pb-8 pt-28 sm:px-7 md:pt-32">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-[1520px] flex-col justify-between gap-16">
        <Reveal className="text-center">
          <p className="editorial-label mb-8 text-[var(--color-ink-soft)]">05 / Consulting</p>
          <h1 className="mx-auto max-w-6xl text-[clamp(3.2rem,7vw,7.2rem)] font-black leading-[0.95]">
            {consulting.title}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[var(--color-ink)] md:text-xl">
            {consulting.lead}
          </p>
        </Reveal>

        <div className="mx-auto grid w-full max-w-4xl gap-10 md:grid-cols-3">
          {consulting.details.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05} className="grid gap-3 text-sm">
              <p className="text-[var(--color-ink-soft)]">{item.label}</p>
              <p className="leading-7 text-[var(--color-ink)]">{item.text}</p>
            </Reveal>
          ))}
          <Reveal delay={0.1} className="grid gap-3 text-sm">
            <p className="text-[var(--color-ink-soft)]">预约</p>
            <p className="leading-7 text-[var(--color-ink)]">
              加微信了解：{consulting.wechat || '微信号待补'}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-ink-soft)]">
          <p>{footer.copyright}</p>
          <p>{contact.tagline}</p>
        </div>
      </div>
    </section>
  )
}
