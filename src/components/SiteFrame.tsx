import type { ReactNode } from 'react'
import { useState } from 'react'
import { identity, portfolioNav } from '../lib/content'

type SiteFrameProps = {
  children: ReactNode
  theme?: 'light' | 'dark'
  minimal?: boolean
}

export function SiteFrame({ children, theme = 'light', minimal = false }: SiteFrameProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const dark = theme === 'dark'
  const tone = dark ? 'text-[var(--color-paper)]' : 'text-[var(--color-ink)]'
  const muted = dark ? 'text-[var(--color-paper)]/62' : 'text-[var(--color-ink-soft)]'
  const headerTone = menuOpen ? 'text-[var(--color-paper)]' : tone
  const headerMuted = menuOpen ? 'text-[var(--color-paper)]/62' : muted
  const navTone = dark
    ? 'text-[var(--color-paper)]/62 hover:text-[var(--color-paper)]'
    : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'

  if (minimal) {
    return (
      <div className={`min-h-screen ${tone}`}>
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className={`fixed right-5 top-5 z-50 h-11 w-11 rounded-full border transition-colors sm:right-7 sm:top-7 ${
            menuOpen
              ? 'border-[var(--color-paper)]/35 text-[var(--color-paper)]'
              : 'border-[var(--color-ink)]/30 text-[var(--color-ink)] hover:border-[var(--color-ink)]'
          }`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`absolute left-3 right-3 top-1/2 h-px bg-current transition-transform ${
              menuOpen ? 'rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`absolute left-3 right-3 top-1/2 h-px bg-current transition-transform ${
              menuOpen ? '-rotate-45' : 'translate-y-1'
            }`}
          />
        </button>

        {menuOpen ? (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--color-ink)] px-6 text-[var(--color-paper)]">
            <nav aria-label="Page navigation">
              <ul className="grid gap-5 text-center">
                {portfolioNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="font-[family:var(--font-heavy-en)] text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9]"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="mr-4 align-middle text-xs opacity-50">{item.n}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}

        {children}
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${tone}`}>
      <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-7 ${headerTone}`}>
        <div className="mx-auto grid max-w-[1520px] grid-cols-[1fr_auto_1fr] items-start gap-4">
          <p className={`editorial-label pointer-events-auto max-w-52 leading-relaxed ${headerMuted}`}>
            * {identity.availability}
            <br />
            Open for collaboration
          </p>
          <a
            href="/"
            aria-label="陈与小金首页"
            className="pointer-events-auto font-[family:var(--font-heavy-en)] text-2xl font-black leading-none"
          >
            {identity.mark}
          </a>
          <p className={`editorial-label hidden justify-self-end text-right leading-relaxed md:block ${headerMuted}`}>
            Folio
            <br />
            Vol. 1 —
          </p>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`pointer-events-auto relative h-10 w-10 justify-self-end border hairline md:hidden ${
              menuOpen || dark ? 'border-[var(--color-paper)]/30' : 'border-[var(--color-ink)]/30'
            }`}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`absolute left-2 right-2 top-1/2 h-px origin-center transition-transform ${
                menuOpen || dark ? 'bg-[var(--color-paper)]' : 'bg-[var(--color-ink)]'
              } ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
            />
            <span
              className={`absolute left-2 right-2 top-1/2 h-px origin-center transition-transform ${
                menuOpen || dark ? 'bg-[var(--color-paper)]' : 'bg-[var(--color-ink)]'
              } ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
            />
          </button>
        </div>
      </header>

      {children}

      {menuOpen ? (
        <div className="fixed inset-0 z-40 bg-[var(--color-ink)] px-5 pb-9 pt-32 text-[var(--color-paper)] md:hidden">
          <ul className="grid gap-7 text-right">
            {portfolioNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-menu={item.label}
                  className="font-[family:var(--font-heavy-en)] text-[clamp(3.4rem,15vw,6rem)] leading-[0.85]"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-3 align-middle text-sm">{item.n}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-9 left-5 right-5 grid grid-cols-[1fr_1fr] gap-5 text-xs">
            <p className="editorial-label text-[var(--color-paper)]">Credit</p>
            <p className="leading-5 text-[var(--color-paper)]/62">
              Development
              <br />
              Claude Code / Codex
            </p>
          </div>
        </div>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-[17vh] z-40 hidden px-4 sm:px-7 md:block"
      >
        <div className="mx-auto grid max-w-[1520px] gap-4">
          {portfolioNav.map((item) => (
            <div
              key={`hit-${item.href}`}
              data-menu-hit={item.label}
              className="pointer-events-auto h-[clamp(4.4rem,7vh,6rem)]"
            >
              <a
                href={item.href}
                data-menu={item.label}
                tabIndex={-1}
                className="flex h-full w-full items-center justify-end opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                <span className="font-[family:var(--font-heavy-en)] text-[clamp(3.4rem,5.4vw,5.8rem)] font-black leading-none text-[var(--color-paper)]">
                  <span className="mr-4 align-middle text-sm">{item.n}</span>
                  {item.label}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <nav
        aria-label="Page navigation"
        className="pointer-events-none fixed inset-x-0 top-1/2 z-50 hidden -translate-y-1/2 px-4 sm:px-7 md:block"
      >
        <div className="mx-auto grid max-w-[1520px] grid-cols-[1fr_auto] items-end gap-5">
          <ul className="pointer-events-auto grid w-full grid-cols-5 gap-5">
            {portfolioNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-menu={item.label}
                  className={`group inline-flex min-h-12 flex-col justify-end text-[0.66rem] font-semibold leading-none transition-colors ${navTone}`}
                >
                  <span className="text-[0.55rem]">{item.n}</span>
                  <span className="mt-1 inline-flex overflow-hidden">
                    {item.label.split('').map((char, index) => (
                      <span
                        key={`${item.label}-${index}`}
                        className="inline-block transition-transform duration-300 group-hover:-translate-y-full"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="-mt-[0.7rem] inline-flex overflow-hidden">
                    {item.label.split('').map((char, index) => (
                      <span
                        key={`${item.label}-ghost-${index}`}
                        className="inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className={`editorial-label pointer-events-auto justify-self-end ${muted}`}>
            ©2026
          </p>
        </div>
      </nav>
    </div>
  )
}
