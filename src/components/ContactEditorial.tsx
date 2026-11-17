import { ArrowUpRight } from 'lucide-react'
import { contact, footer, socialLinks } from '../lib/content'
import { Reveal } from './Reveal'

export function ContactEditorial() {
  return (
    <footer id="contact" className="relative isolate min-h-screen overflow-hidden px-4 pb-8 pt-28 sm:px-7 md:pt-32">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-[1520px] flex-col justify-between">
        <Reveal className="text-center">
          <p className="editorial-label mb-8 text-[var(--color-ink-soft)]">04 / Contact</p>
          <h1 className="mx-auto max-w-6xl font-[family:var(--font-heavy-en)] text-[clamp(3.2rem,7vw,7.2rem)] font-black leading-[0.9]">
            {contact.headline[0]}
            <br />
            {contact.headline[1]}
          </h1>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[0.9fr_0.9fr_0.8fr] md:items-end">
          <Reveal className="grid gap-5 text-sm md:grid-cols-[0.7fr_1fr]">
            <p className="text-[var(--color-ink-soft)]">Social</p>
            <div className="grid gap-1">
              {socialLinks.slice(0, 5).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 font-semibold"
                >
                  {link.label}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05} className="grid gap-5 text-sm md:grid-cols-[0.55fr_1fr]">
            <p className="text-[var(--color-ink-soft)]">Direct</p>
            <p className="max-w-56 leading-6 text-[var(--color-ink)]">
              {contact.directLines[0]}
              <br />
              {contact.directLines[1]}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="hidden justify-self-end md:block">
            <img
              src="/assets/identity/hero-line-alpha.png"
              alt=""
              className="h-64 w-80 object-contain opacity-90 grayscale"
            />
          </Reveal>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-ink-soft)]">
          <p>{footer.copyright}</p>
          <p>{contact.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
