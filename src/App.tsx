import { lazy, Suspense, useEffect, useState } from 'react'
import { AboutEditorial } from './components/AboutEditorial'
import { ConsultingEditorial } from './components/ConsultingEditorial'
import { ContactEditorial } from './components/ContactEditorial'
import { CursorOrbit } from './components/CursorOrbit'
import { NativeExperience } from './components/NativeExperience'
import { ExperienceTransition } from './components/ExperienceTransition'
import { PageLoader } from './components/PageLoader'
import { PlaygroundEntrances } from './components/PlaygroundEntrances'
import { ScrollProgress } from './components/ScrollProgress'
import { SiteFrame } from './components/SiteFrame'
import { WorksIndex } from './components/WorksIndex'
import { pageSeo, type PageId } from './lib/seo'

const AvatarPreview = lazy(() => import('./components/AvatarPreview').then(module => ({ default: module.AvatarPreview })))

function pageFromPath(pathname: string): PageId {
  if (pathname.endsWith('/works.html') || pathname === '/works') return 'works'
  if (pathname.endsWith('/about.html') || pathname === '/about') return 'about'
  if (pathname.endsWith('/play-ground.html') || pathname === '/playground') return 'playground'
  if (pathname.endsWith('/contact.html') || pathname === '/contact') return 'contact'
  if (pathname.startsWith('/courses')) return 'consulting'
  return 'home'
}

function App() {
  const [page, setPage] = useState<PageId>(() => pageFromPath(window.location.pathname))

  useEffect(() => {
    const syncPage = () => {
      setPage(pageFromPath(window.location.pathname))
      window.scrollTo({ top: 0, left: 0 })
    }

    window.addEventListener('popstate', syncPage)
    window.addEventListener('cyxj:navigate', syncPage)
    return () => {
      window.removeEventListener('popstate', syncPage)
      window.removeEventListener('cyxj:navigate', syncPage)
    }
  }, [])

  useEffect(() => {
    const seo = pageSeo[page]
    document.title = seo.title

    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.content = content
    }

    setMeta('meta[name="description"]', 'name', 'description', seo.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.canonical
  }, [page])

  if (window.location.search.includes('avatar=1')) {
    return <Suspense fallback={<p role="status">正在加载人物预览…</p>}><AvatarPreview /></Suspense>
  }

  return (
    <>
      {page !== 'home' ? <><ScrollProgress /><CursorOrbit /></> : null}
      {page === 'home' ? null : <PageLoader />}
      {page !== 'home' ? <ExperienceTransition /> : null}
      <main key={page} data-page={page}>
        {page === 'home' ? (
          <NativeExperience />
        ) : null}
        {page === 'works' ? (
          <SiteFrame>
            <WorksIndex />
          </SiteFrame>
        ) : null}
        {page === 'about' ? (
          <SiteFrame theme="dark">
            <AboutEditorial />
          </SiteFrame>
        ) : null}
        {page === 'playground' ? (
          <SiteFrame>
            <PlaygroundEntrances />
          </SiteFrame>
        ) : null}
        {page === 'contact' ? (
          <SiteFrame>
            <ContactEditorial />
          </SiteFrame>
        ) : null}
        {page === 'consulting' ? (
          <SiteFrame>
            <ConsultingEditorial />
          </SiteFrame>
        ) : null}
      </main>
    </>
  )
}

export default App
