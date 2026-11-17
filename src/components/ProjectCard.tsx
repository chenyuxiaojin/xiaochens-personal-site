import type { Project } from '../lib/content'
import { CtaPill } from './CtaPill'

export function ProjectCard({
  n,
  client,
  name,
  images,
  link,
  index = 0,
}: Project & { index?: number }) {
  return (
    <article
      style={{ top: `${index * 80}px` }}
      className="sticky mx-6 flex h-screen flex-col gap-6 overflow-hidden rounded-[var(--radius-stack)] bg-zinc-900 px-6 pt-5 pb-10 shadow-2xl shadow-black/50 md:mx-16 md:gap-8 md:px-10 md:pt-6 md:pb-14"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-white/40 md:text-xs">
            {n} · {client}
          </p>
          <h3 className="mt-2 text-2xl font-semibold md:text-4xl">{name}</h3>
        </div>
        {link ? (
          <CtaPill href={link} variant="live">
            LIVE PROJECT →
          </CtaPill>
        ) : (
          <CtaPill variant="live">微信搜：陈与小金</CtaPill>
        )}
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3 md:gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/5"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </article>
  )
}
