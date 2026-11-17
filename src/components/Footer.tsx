import { footer } from '../lib/content'

export function Footer() {
  return (
    <footer className="relative z-10 px-6 py-20 text-center text-sm text-[var(--color-ink-soft)]">
      <div className="inline-flex items-center gap-2">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <a
          href={footer.github.href}
          className="transition-colors hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          {footer.github.label}
        </a>
      </div>
      <p className="mt-3 text-xs tracking-wider">{footer.copyright}</p>
      <nav
        aria-label="我的平台"
        className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-[10px] tracking-[0.24em]"
      >
        {footer.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="border-b border-white/20 pb-1 text-white/60 transition-colors hover:border-white/70 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
