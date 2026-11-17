import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

// Keep the original canvas and input handlers in the top document in production.
// The existing React entry remains on all prerendered portfolio routes.
const path = new URL('../dist/index.html', import.meta.url)
const experiencePath = new URL('../dist/experience/index.html', import.meta.url)
let html = readFileSync(experiencePath, 'utf8')
// Personal assets use stable names; content versions bypass stale CDN/browser copies.
for (const asset of ['personal.css', 'personal.js']) {
  const bytes = readFileSync(new URL(`../dist/experience/assets/cyxj/${asset}`, import.meta.url))
  const version = createHash('sha256').update(bytes).digest('hex').slice(0, 12)
  html = html.replaceAll(`assets/cyxj/${asset}\"`, `assets/cyxj/${asset}?v=${version}\"`)
}
writeFileSync(experiencePath, html)
html = html.replace(/<title>.*?<\/title>/, '<title>陈与小金 · FDE，AI 落地</title>')
  .replace(/content="https:\/\/santionispirits.com"/g, 'content="https://xiaochens.com/"')
  .replace('</head>', '<link rel="canonical" href="https://xiaochens.com/"></head>')
writeFileSync(path, html)
console.log('Native interactive home written; portfolio routes preserved')
