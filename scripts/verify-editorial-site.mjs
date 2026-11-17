import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = process.cwd()
const dist = resolve(root, 'dist')

function read(path) {
  return readFileSync(path, 'utf8')
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function assetText() {
  const assetsDir = join(dist, 'assets')
  const files = readdirSync(assetsDir)
    .filter((file) => file.endsWith('.js') || file.endsWith('.css'))
    .map((file) => read(join(assetsDir, file)))
  return files.join('\n')
}

assert(existsSync(join(dist, 'index.html')), 'dist/index.html is missing')
for (const route of ['works.html', 'about.html', 'play-ground.html', 'contact.html', 'courses/index.html']) {
  assert(existsSync(join(dist, route)), `dist/${route} is missing`)
}
assert(existsSync(join(dist, 'robots.txt')), 'robots.txt is missing')
assert(existsSync(join(dist, 'sitemap.xml')), 'sitemap.xml is missing')
assert(existsSync(join(dist, 'llms.txt')), 'llms.txt is missing')
assert(existsSync(join(dist, 'google36cc04761872de85.html')), 'Google verification file is missing')
assert(
  existsSync(join(dist, 'assets/identity/hero-line.webp')),
  'hero line asset is missing',
)

const html = read(join(dist, 'index.html'))
const bundle = `${html}\n${assetText()}`
const source = [
  'src/components/NativeExperience.tsx',
  'src/components/WorksIndex.tsx',
  'src/components/AboutEditorial.tsx',
  'src/components/PlaygroundEntrances.tsx',
  'src/components/ContactEditorial.tsx',
  'src/App.tsx',
  'src/lib/seo.ts',
]
  .map((path) => read(join(root, path)))
  .join('\n')

for (const required of [
  '陈与小金',
  'Xiao Chen',
  'FDE',
  'Claude Code',
  'Codex',
  'Works',
  'About',
  'Playground',
  'Contact',
  'blog.xiaochens.com',
  'ai.xiaochens.com',
  'img.xiaochens.com',
  'api.xiaochens.com',
  'github.com/chenyuxiaojin',
  '/works.html',
  '/about.html',
  '/play-ground.html',
  '/contact.html',
  '/assets/identity/hero-line-alpha.png',
  'experience-transition',
  'transition-preview',
  'transition-progress',
  'works-drag-track',
  'cursor-orbit',
  'scroll-progress',
  'hover-preview',
  'field-notes',
]) {
  assert(bundle.includes(required), `missing required text or link: ${required}`)
}

for (const selector of [
  'id="works"',
  'id="about"',
  'id="playground"',
  'id="contact"',
]) {
  assert(source.includes(selector), `missing section marker: ${selector}`)
}

for (const runtimeSeoSignal of ['document.title = seo.title', 'canonical.href = seo.canonical']) {
  assert(source.includes(runtimeSeoSignal), `missing runtime SEO signal: ${runtimeSeoSignal}`)
}

for (const component of [
  'src/components/WorksIndex.tsx',
  'src/components/AboutEditorial.tsx',
  'src/components/PlaygroundEntrances.tsx',
  'src/components/ContactEditorial.tsx',
]) {
  assert(read(join(root, component)).includes('h1'), `missing rendered H1 in ${component}`)
}

assert(read(join(root, 'src/App.tsx')).includes('<NativeExperience />'), 'native interactive home is missing')
assert(read(join(root, 'src/components/NativeExperience.tsx')).includes('/experience/index.html'), 'native iframe entry is missing')
const nativeRoot=join(dist,'experience')
for (const asset of ['index.html','assets/cyxj/personal.js','assets/shaders/compiled.vs','assets/js/app.1782836328290.js','assets/data/uil.1782836328290.json','assets/geometry/story/wander/saint-walk-2-anim.bin','assets/geometry/story/hand/arm-skin.bin']) {
  assert(existsSync(join(nativeRoot,asset)), `native runtime asset is missing: ${asset}`)
}
assert(read(join(nativeRoot,'index.html')).includes('<base href="/experience/">'), 'native assets must resolve inside /experience/')
assert(!read(join(root, 'src/components/EditorialHero.tsx')).includes('(BUILDER)'), 'home still shows BUILDER')
assert(
  read(join(root, 'src/components/SiteFrame.tsx')).includes("aria-label={menuOpen ? 'Close menu' : 'Open menu'}"),
  'minimal home menu button is missing',
)

const css = assetText()
assert(css.includes('#ecebea'), 'warm off-white background token is missing')
assert(css.includes('#161616'), 'graphite ink token is missing')
assert(!css.includes('#0a0a0a'), 'old smoke black background token remains')

console.log('Editorial site verification passed')
