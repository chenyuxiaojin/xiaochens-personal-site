// 构建后置步骤:为四个内页生成"带真实内容"的 HTML(替代旧的逐字节复制)。
// 内容与页面组件共用同一数据源 src/lib/content.ts(Node 24 原生剥离 TS 类型直接 import),
// 生成的静态兜底只服务不执行 JS 的访问者;浏览器端仍由 React createRoot 整体接管 #root。
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import {
  about,
  consulting,
  contact,
  identity,
  playground,
  portfolio,
  portfolioIntro,
  serviceEntrances,
  socialLinks,
  footer,
  nav,
} from '../src/lib/content.ts'
import { pageSeo } from '../src/lib/seo.ts'

const SITE = 'https://xiaochens.com'
const PERSON_ID = `${SITE}/#person`

const dist = resolve(process.cwd(), 'dist')
const indexHtml = join(dist, 'index.html')
if (!existsSync(indexHtml)) {
  throw new Error('dist/index.html is missing — run vite build first')
}
const baseHtml = readFileSync(indexHtml, 'utf8')

const esc = (text) =>
  String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// 与 index.html 手写的 Person JSON-LD 保持同一套字段与取值
const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: '陈与小金',
  alternateName: ['chenyuxiaojin', '小陈'],
  jobTitle: 'FDE（Forward Deployed Engineer）',
  url: `${SITE}/`,
  description:
    '陈与小金，FDE，专注 AI 落地。使用 Claude Code、Codex 和自动化工具，把 AI 接入内容创作、视频生产与真实业务工作流。',
  knowsAbout: ['AI 落地', 'Forward Deployed Engineer', 'Claude Code', 'Codex', 'AI 工作流', 'AI 提效'],
  sameAs: [
    'https://www.youtube.com/@cyxj_ai',
    'https://x.com/cyxjya',
    'https://v.douyin.com/A1qVQrOgPjY/',
    'https://space.bilibili.com/505358756',
    'https://github.com/chenyuxiaojin',
  ],
  memberOf: { '@type': 'Organization', name: 'Vibe Motion', url: 'https://github.com/vibe-motion' },
}

const siteNav = () =>
  `<nav aria-label="站内页面">${nav.items
    .map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`)
    .join('\n          ')}</nav>`

const linkRow = (links) =>
  links
    .map((link) => `<a href="${esc(link.href)}" rel="noreferrer">${esc(link.label)}</a>`)
    .join(' · ')

const worksBody = () => `<main aria-label="陈与小金 · Works">
        <h1>Works · 陈与小金</h1>
        <p>Selected works I have shipped since 2024.</p>
        <p>${esc(portfolioIntro)}</p>
        ${portfolio
          .map(
            (project) => `<article>
          <h2>${esc(project.n)} · ${esc(project.name)}（${esc(project.category)}）</h2>
          <p>${esc(project.summary.join(''))}</p>
          <p>${linkRow(project.links)}</p>
        </article>`,
          )
          .join('\n        ')}
        ${siteNav()}
      </main>`

const aboutBody = () => `<main aria-label="陈与小金 · About">
        <h1>About · 陈与小金</h1>
        <h2>我是小陈，陈与小金。主 Claude Code，次 Codex。</h2>
        <p>${esc(identity.role)} · ${esc(identity.location)}</p>
        <p>${esc(about.body)}</p>
        <h2>What I do</h2>
        <p>${esc(about.capabilities.join('，'))}。</p>
        <ul>
          ${about.pillars.map((pillar) => `<li>${esc(pillar)}</li>`).join('\n          ')}
        </ul>
        ${siteNav()}
      </main>`

const playgroundBody = () => `<main aria-label="陈与小金 · Playground">
        <h1>Playground · 陈与小金</h1>
        <p>${esc(playground.intro)}</p>
        <ul>
          ${serviceEntrances
            .map(
              (item) =>
                `<li><a href="${esc(item.href)}" rel="noreferrer">${esc(item.title)}</a>：${esc(item.desc)}</li>`,
            )
            .join('\n          ')}
        </ul>
        ${siteNav()}
      </main>`

const contactBody = () => `<main aria-label="陈与小金 · Contact">
        <h1>Contact · 陈与小金</h1>
        <h2>${esc(contact.headline.join(' '))}</h2>
        <p>${esc(contact.directLines.join(''))}</p>
        <ul>
          ${socialLinks
            .slice(0, 5)
            .map((link) => `<li><a href="${esc(link.href)}" rel="noreferrer">${esc(link.label)}</a></li>`)
            .join('\n          ')}
        </ul>
        <p>${esc(footer.copyright)} · ${esc(contact.tagline)}</p>
        ${siteNav()}
      </main>`

const consultingBody = () => `<main aria-label="陈与小金 · AI 咨询">
        <h1>${esc(consulting.title)}</h1>
        <p>${esc(consulting.lead)}</p>
        <ul>
          ${consulting.details.map((item) => `<li>${esc(item.label)}：${esc(item.text)}</li>`).join('\n          ')}
          <li>预约：加微信了解：${esc(consulting.wechat || '微信号待补')}</li>
        </ul>
        ${siteNav()}
      </main>`

const routes = [
  {
    file: 'works.html',
    ...pageSeo.works,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Works · 陈与小金',
      url: `${SITE}/works.html`,
      inLanguage: 'zh-CN',
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: portfolio.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.name,
          description: project.summary.join(''),
          url: project.links[0].href,
        })),
      },
    },
    body: worksBody,
  },
  {
    file: 'about.html',
    ...pageSeo.about,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About · 陈与小金',
      url: `${SITE}/about.html`,
      inLanguage: 'zh-CN',
      mainEntity: person,
    },
    body: aboutBody,
  },
  {
    file: 'play-ground.html',
    ...pageSeo.playground,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Playground · 陈与小金',
      url: `${SITE}/play-ground.html`,
      inLanguage: 'zh-CN',
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: serviceEntrances.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          description: item.desc,
          url: item.href,
        })),
      },
    },
    body: playgroundBody,
  },
  {
    file: 'contact.html',
    ...pageSeo.contact,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact · 陈与小金',
      url: `${SITE}/contact.html`,
      inLanguage: 'zh-CN',
      about: { '@id': PERSON_ID },
    },
    body: contactBody,
  },
  {
    file: 'courses/index.html',
    ...pageSeo.consulting,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI 咨询 · 陈与小金',
      url: `${SITE}/courses/`,
      inLanguage: 'zh-CN',
      serviceType: 'AI 咨询',
      description: consulting.lead,
      provider: { '@id': PERSON_ID },
      audience: { '@type': 'Audience', audienceType: '企业与个人' },
      availableChannel: { '@type': 'ServiceChannel', name: '线上 / 线下，一对一或企业咨询' },
      offers: {
        '@type': 'Offer',
        price: '500',
        priceCurrency: 'CNY',
        description: '500 元 / 小时，回答不了的不收费',
      },
    },
    body: consultingBody,
  },
]

function mustReplace(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`[prerender] ${label} not found in dist/index.html — 页面骨架变了,请同步本脚本`)
  }
  return html.replace(pattern, () => replacement)
}

for (const route of routes) {
  const url = route.canonical
  let html = baseHtml
  html = mustReplace(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, '<title>')
  html = mustReplace(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(route.description)}" />`,
    'meta description',
  )
  html = mustReplace(
    html,
    /<link rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical',
  )
  html = mustReplace(
    html,
    /<meta property="og:type"[\s\S]*?\/>/,
    `<meta property="og:type" content="website" />`,
    'og:type',
  )
  html = mustReplace(
    html,
    /<meta property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    'og:title',
  )
  html = mustReplace(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    'og:description',
  )
  html = mustReplace(
    html,
    /<meta property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${url}" />`,
    'og:url',
  )
  html = mustReplace(
    html,
    /<meta name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    'twitter:title',
  )
  html = mustReplace(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    'twitter:description',
  )
  html = mustReplace(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n      ${JSON.stringify(route.jsonLd, null, 2).split('\n').join('\n      ')}\n    </script>`,
    'JSON-LD',
  )
  // 兜底内容里不允许出现 </div>,否则会提前截断这里的非贪婪匹配
  const body = route.body()
  if (body.includes('</div>')) {
    throw new Error(`[prerender] ${route.file} 兜底内容含 </div>,会破坏 #root 替换`)
  }
  html = mustReplace(html, /<div id="root">[\s\S]*?<\/div>/, `<div id="root">\n      ${body}\n    </div>`, '#root')
  mkdirSync(dirname(join(dist, route.file)), { recursive: true })
  writeFileSync(join(dist, route.file), html)
}

console.log(`Prerendered route HTML: ${routes.map((r) => r.file).join(', ')}`)
