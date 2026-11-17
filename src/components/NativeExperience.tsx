import { useEffect } from 'react'

/** Keeps the mirrored engine in its own document so its wheel, touch and WebGL
 * lifecycle are not altered by the surrounding React route layout. */
export function NativeExperience() {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])
  const review = new URLSearchParams(window.location.search).has('review')
  return <iframe
    title="陈与小金 · 交互旅程"
    src={`/experience/index.html${review ? '?review=1' : ''}`}
    allow="autoplay; fullscreen"
    style={{ position: 'fixed', inset: 0, width: '100%', height: '100dvh', border: 0, zIndex: 30, background: '#111' }}
  />
}
