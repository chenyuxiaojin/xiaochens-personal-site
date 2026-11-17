import type { ReactNode } from 'react'

type CtaPillVariant = 'primary' | 'live'

type CtaPillProps = {
  href?: string | null
  onClick?: () => void
  children: ReactNode
  variant?: CtaPillVariant
  className?: string
}

export function CtaPill({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: CtaPillProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform'

  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-br from-[var(--color-gstart)] to-[var(--color-gend)] text-white shadow-[0_10px_40px_-12px_rgba(176,112,255,0.55)] hover:shadow-[0_16px_50px_-10px_rgba(255,107,179,0.65)] hover:-translate-y-0.5'
      : 'border border-white/40 text-white hover:bg-white hover:text-black'

  const cls = `${base} ${styles} ${className}`

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
