import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { ServiceItem } from '../lib/content'
import { services } from '../lib/content'

function ServiceRow({ item }: { item: ServiceItem }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 40%'],
  })
  const titleColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['#c7c7c7', '#0a0a0a'],
  )
  const descColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['#dcdcdc', '#525252'],
  )

  return (
    <li
      ref={ref}
      className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-9 md:gap-10 md:py-14"
    >
      <motion.span
        style={{ color: titleColor }}
        className="font-[family:var(--font-heavy-en)] text-5xl md:text-7xl"
      >
        {item.n}
      </motion.span>
      <div>
        <motion.h3
          style={{ color: titleColor }}
          className="text-xl font-semibold md:text-3xl"
        >
          {item.title}
        </motion.h3>
        <motion.p
          style={{ color: descColor }}
          className="mt-2 text-sm md:text-base"
        >
          {item.desc}
        </motion.p>
      </div>
    </li>
  )
}

export function StackServices() {
  return (
    <section
      id="services"
      className="relative mx-6 rounded-[var(--radius-stack)] bg-white text-black shadow-2xl shadow-black/40 md:mx-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <h2 className="font-[family:var(--font-heavy-en)] text-[clamp(3rem,13vw,10rem)] leading-[0.9] tracking-tight">
          {services.bigText}
        </h2>
        <ol className="mt-10 divide-y divide-black/10 border-t border-black/10">
          {services.items.map((item) => (
            <ServiceRow key={item.n} item={item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
