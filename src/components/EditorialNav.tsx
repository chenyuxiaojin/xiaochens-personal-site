import { portfolioNav, identity } from '../lib/content'

export function EditorialNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 mix-blend-multiply sm:px-7 sm:pt-6">
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1520px] grid-cols-[1fr_auto] items-start gap-5 text-[var(--color-ink)] md:grid-cols-[1fr_auto_1fr]"
      >
        <a
          href="#hero"
          className="font-[family:var(--font-heavy-en)] text-xl leading-none tracking-normal"
          aria-label="陈与小金首页"
        >
          {identity.mark}
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {portfolioNav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="editorial-label inline-flex gap-2 transition-opacity hover:opacity-55"
              >
                <span>{item.n}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="editorial-label justify-self-end border-b border-current pb-1 transition-opacity hover:opacity-55"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
