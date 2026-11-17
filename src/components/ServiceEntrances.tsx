import { ArrowUpRight } from 'lucide-react'
import type { ServiceEntrance } from '../lib/content'
import { entrances } from '../lib/content'

function EntranceCard({ item }: { item: ServiceEntrance }) {
  const host = new URL(item.href).host

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-56 flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.075] md:p-6"
      aria-label={`${item.label}: ${item.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-[family:var(--font-heavy-en)] text-4xl leading-none text-white/25 transition-colors group-hover:text-white/60">
          {item.n}
        </span>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors group-hover:border-white/35 group-hover:text-white">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
          {item.label}
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white md:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/58">{item.desc}</p>
        <p className="mt-5 break-all text-xs font-medium text-white/38">
          {host}
        </p>
      </div>
    </a>
  )
}

export function ServiceEntrances() {
  return (
    <section id="entrances" className="relative z-10 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 grid gap-5 md:mb-12 md:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] md:items-end">
          <h2 className="font-[family:var(--font-heavy-en)] text-[clamp(3.35rem,10vw,8.8rem)] leading-[0.86] text-white">
            {entrances.bigText}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-white/62 md:text-base">
            {entrances.intro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {entrances.items.map((item) => (
            <EntranceCard key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
