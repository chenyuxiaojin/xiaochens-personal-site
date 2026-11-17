import { useEffect, useState } from 'react'
import { nav } from '../lib/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overProjects, setOverProjects] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      const section = document.getElementById('projects')
      if (section) {
        const rect = section.getBoundingClientRect()
        setOverProjects(rect.top <= 0 && rect.bottom > window.innerHeight)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const base = 'fixed inset-x-0 top-0 z-50 transition-all duration-300'
  const skin = overProjects
    ? 'opacity-0 pointer-events-none'
    : scrolled
      ? 'backdrop-blur-md bg-black/45 border-b border-white/5'
      : 'bg-transparent'

  return (
    <nav className={`${base} ${skin}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-12">
        <ul className="flex w-full items-center justify-between text-[9px] tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
          {nav.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
