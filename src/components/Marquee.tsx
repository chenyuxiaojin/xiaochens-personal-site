import type { MarqueeItem } from '../lib/content'

type MarqueeProps = {
  items: MarqueeItem[]
  direction: 'left' | 'right'
  duration: number
}

export function Marquee({ items, direction, duration }: MarqueeProps) {
  const loop = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {loop.map((item, i) => (
          <figure
            key={i}
            className="relative h-[320px] w-[240px] shrink-0 overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/5 sm:h-[360px] sm:w-[280px]"
          >
            <img
              src={item.img}
              alt={item.label}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {item.label && (
              <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 text-xs tracking-wide text-white/85">
                {item.label}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
