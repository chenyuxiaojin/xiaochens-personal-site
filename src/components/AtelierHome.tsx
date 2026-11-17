import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react'
import { portfolio, serviceEntrances, socialLinks } from '../lib/content'
import './AtelierHome.css'

const portrait = '/assets/atelier/portrait-engraving.png'
const workflow = '/assets/atelier/workflow-engraving.png'
const chapters = [
  { id: 'journey', label: '故事', en: 'STORY' },
  { id: 'collection', label: '作品', en: 'WORKS' },
  { id: 'connect', label: '联系', en: 'CONTACT' },
]
const paths = [
  { n: '01', title: '让想法成形', en: 'BUILD', color: '#b4332d', lead: '一个想法，直到它真的能用。', desc: '从实际问题出发，用 Claude Code、Codex 和自动化，把零散操作变成工具，把反复劳动变成流程。', link: '/works.html', cta: '看看做出来的东西', tags: 'AI 工作流 / 业务工具 / 开源项目' },
  { n: '02', title: '把经验讲清', en: 'SHARE', color: '#8b9c9a', lead: '做过一遍，再把它讲明白。', desc: '做出来的东西、踩过的坑和能复用的方法，整理成视频与文章。让一次实践，成为下一次出发的起点。', link: 'https://www.youtube.com/@cyxj_ai', cta: '去看视频与实战', tags: '内容创作 / 视频制作 / 实践复盘' },
  { n: '03', title: '一起做点事', en: 'CONNECT', color: '#c0a56c', lead: '带着你的问题，一起往前走。', desc: '企业或个人，线上或线下。从你正在做的工作开始，找到 AI 能真正帮上忙的地方。', link: '/courses/', cta: '了解 AI 咨询', tags: 'AI 咨询 / 场景拆解 / 工作流搭建' },
]
const featured = [portfolio[0], portfolio[1], portfolio[3], portfolio[5]]

function Seal({ large = false }: { large?: boolean }) {
  return <span className={`atelier-seal ${large ? 'large' : ''}`} aria-hidden="true"><span>陈</span><i /><b>CYXJ</b></span>
}

function Journey() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-3%'])
  const captionY = useTransform(scrollYProgress, [0, 1], [30, -20])
  return <section ref={ref} className="atelier-journey" id="journey" aria-labelledby="journey-title">
    <div className="atelier-sticky">
      <div className="atelier-chapter"><span>CHAPTER 01</span><span>从一个真实问题开始</span><span>THE HUMAN BEHIND THE TOOLS</span></div>
      <div className="atelier-portrait-panel">
        <motion.img src={portrait} alt="小陈戴着圆框眼镜、身穿黑色外套，抱着电脑站在朱红色拱门前的版画插画" width="1536" height="1024" style={reduced ? undefined : { scale, x }} />
        <div className="atelier-intro-copy"><span className="atelier-kicker">HELLO, I'M XIAO CHEN.</span><h2 id="journey-title">想法很多。<br />先做出一个。</h2><p>我是小陈，陈与小金。<br />把 AI 装进真实业务，<br />也把过程里的发现分享出来。</p></div>
        <motion.div className="atelier-caption caption-one" style={reduced ? undefined : { y: captionY }}>「故事，通常从一句“能不能”开始。」</motion.div>
        <span className="atelier-panel-number">FIG. 01 / THE MAKER</span>
      </div>
      <div className="atelier-panel-footer"><span>工作 · 生意 · 工作流</span><span>SCROLL TO KEEP EXPLORING <ArrowDown size={13} /></span></div>
    </div>
  </section>
}

function Threshold() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [.8, 2.8])
  const figureX = useTransform(scrollYProgress, [0, 1], ['-13%', '14%'])
  const figureScale = useTransform(scrollYProgress, [0, 1], [.88, 1.08])
  const wordsX = useTransform(scrollYProgress, [0, 1], ['0%', '-9%'])
  return <section className="atelier-threshold" ref={ref} aria-labelledby="threshold-title">
    <div className="atelier-threshold-stage">
      <motion.div className="atelier-portal" aria-hidden="true" style={reduced ? undefined : { scale }}><span /><span /><span /></motion.div>
      <div className="atelier-threshold-top"><span className="atelier-kicker">CHAPTER 02 / CROSS THE THRESHOLD</span><span>从想法，到行动。</span></div>
      <motion.h2 id="threshold-title" style={reduced ? undefined : { x: wordsX }}>想到，<br />就动手。</motion.h2>
      <motion.img src="/assets/atelier/maker-cutout.png" width="1024" height="1536" loading="lazy" alt="版画中的小陈抱着电脑，迈步穿过红色圆环" style={reduced ? undefined : { x: figureX, scale: figureScale }} />
      <div className="atelier-threshold-note"><span className="atelier-caption">「不用等到万事俱备。」</span><p>先让一个真实问题，<br />遇见一个能运行的答案。</p></div>
      <a href="#process" className="atelier-threshold-next">继续往前 <ArrowDown size={16} /></a>
      <span className="atelier-threshold-bottom">MAKE SOMETHING REAL.</span>
    </div>
  </section>
}

function Workshop() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return <section ref={ref} className="atelier-workshop" id="process" aria-labelledby="workshop-title">
    <div className="atelier-workshop-heading"><span className="atelier-kicker">CHAPTER 03 / THE PROCESS</span><h2 id="workshop-title">少一点重复。<br /><em>多一点创造。</em></h2><p>工具不该停在演示里。<br />让它进入日常，才算真正完成。</p></div>
    <div className="atelier-workshop-frame"><motion.img src={workflow} alt="双手在电脑上工作，红色屏幕中的纸张和工作流向外延伸，旁边有一只猫" width="1536" height="1024" loading="lazy" style={reduced ? undefined : { y }} /><span className="atelier-caption caption-two">把繁琐交给工具，把判断留给人。</span><span className="atelier-caption caption-three">CLAUDE CODE / CODEX / HUMAN IDEAS</span></div>
  </section>
}

function Paths() {
  const [active, setActive] = useState(0)
  const path = paths[active]
  const panelRef = useRef<HTMLDivElement>(null)
  const selectPath = (index: number, focus = false) => {
    const next = (index + paths.length) % paths.length
    setActive(next)
    if (focus) panelRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }
  return <section className="atelier-paths" id="practice" style={{ '--path-color': path.color } as CSSProperties} aria-labelledby="practice-title">
    <div className="atelier-paths-top"><span className="atelier-kicker">CHAPTER 04 / CHOOSE YOUR PATH</span><p>同一份好奇心，三种打开方式。</p></div>
    <h2 id="practice-title" className="atelier-paths-title">你想从哪里开始？</h2>
    <div className="atelier-tabs" role="tablist" aria-label="探索方向" ref={panelRef}>{paths.map((item, index) => <button key={item.n} id={`path-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`path-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => selectPath(index)} onKeyDown={event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) { event.preventDefault(); selectPath(event.key === 'Home' ? 0 : event.key === 'End' ? 2 : active + (event.key === 'ArrowRight' ? 1 : -1), true) } }}><span>{item.n}</span><strong>{item.title}</strong><ArrowUpRight size={22} /></button>)}</div>
    <div className="atelier-path-panel" role="tabpanel" id={`path-panel-${active}`} aria-labelledby={`path-tab-${active}`}>
      <motion.div key={path.en} className="atelier-path-word" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} aria-hidden="true">{path.en}<span>✳</span></motion.div>
      <div className="atelier-path-copy"><p className="atelier-kicker">{path.tags}</p><h3>{path.lead}</h3><p>{path.desc}</p><a className="atelier-link" href={path.link}>{path.cta}<ArrowUpRight size={19} /></a></div>
    </div>
  </section>
}

export function AtelierHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    document.body.classList.add('atelier-page')
    const update = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => { document.body.classList.remove('atelier-page'); window.removeEventListener('scroll', update) }
  }, [])
  useEffect(() => {
    if (!menuOpen) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
        const items = [menuButton.current, ...links].filter((x): x is HTMLButtonElement | HTMLAnchorElement => !!x)
        const first = items[0]; const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', onKey) }
  }, [menuOpen])
  const closeMenu = () => { setMenuOpen(false); menuButton.current?.focus() }
  return <div className="atelier">
    <a className="atelier-skip" href="#journey">跳过开场，查看内容</a>
    <header className={`atelier-header ${menuOpen ? 'is-open' : ''}`}>
      <a className="atelier-brand" href="#top" aria-label="陈与小金，回到顶部" onClick={closeMenu}><Seal /><span>陈与小金<small>THE PERSONAL ATELIER</small></span></a>
      <nav className="atelier-desktop-nav" aria-label="主页导航">{chapters.map(item => <a key={item.id} href={`#${item.id}`}>{item.en}<span>{item.label}</span></a>)}</nav>
      <button ref={menuButton} className="atelier-menu-button" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} aria-expanded={menuOpen} aria-controls="atelier-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <Minus /> : <Plus />}<span>MENU</span></button>
    </header>
    {menuOpen && <nav ref={menuRef} className="atelier-menu" id="atelier-menu" aria-label="展开的站点导航"><span className="atelier-kicker">A SMALL MAP OF MY WORLD</span>{[{ href: '#journey', name: '故事', sub: 'THE JOURNEY' }, { href: '#collection', name: '作品', sub: 'SELECTED WORKS' }, { href: '#playground', name: '工具', sub: 'PLAYGROUND' }, { href: '#connect', name: '联系', sub: 'LET’S TALK' }].map((item, i) => <a href={item.href} key={item.href} onClick={closeMenu}><span>0{i + 1}</span>{item.name}<small>{item.sub}</small><ArrowUpRight /></a>)}</nav>}
    <div className="atelier-progress" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
    <section className="atelier-cover" id="top" aria-labelledby="atelier-title">
      <div className="atelier-cover-texture" style={{ backgroundImage: `url(${workflow})` }} />
      <div className="atelier-cover-orbit" aria-hidden="true"><span /><span /><span /></div>
      <motion.div className="atelier-cover-title" initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [.22, 1, .36, 1] }}>
        <p className="atelier-kicker">A JOURNEY FROM IDEAS TO REALITY</p>
        <h1 id="atelier-title">陈与小金</h1>
        <p className="atelier-cover-english">The art of <em>making it real.</em></p>
        <p className="atelier-cover-description">让 AI 走进真实世界。<br /><span>工作 · 生意 · 工作流</span></p>
      </motion.div>
      <a className="atelier-enter" href="#journey"><span>进入我的世界<small>SCROLL TO EXPLORE</small></span><span className="atelier-arrow-circle"><ArrowDown size={22} /></span></a>
      <div className="atelier-cover-bottom"><span>INDEPENDENT MAKER<br />AI × CODE × CREATIVITY</span><span>有想法，就让它发生。<br />BASED IN CHINA · CONNECTED EVERYWHERE</span></div>
      <div className="atelier-cover-tear" aria-hidden="true" />
    </section>
    <Journey />
    <Threshold />
    <Workshop />
    <Paths />
    <section className="atelier-collection" id="collection" aria-labelledby="collection-title">
      <div className="atelier-collection-heading"><span className="atelier-kicker">THE COLLECTION / SELECTED WORKS</span><h2 id="collection-title">留下的，<br /><em>是做出来的东西。</em></h2><p>从一个小工具，到一套工作流。<br />每一个项目，都是一次把想法落地的尝试。</p></div>
      <div className="atelier-work-list">{featured.map((project, index) => <a key={project.n} href={project.links[0].href} target="_blank" rel="noreferrer" className="atelier-work-row"><span className="atelier-work-index">0{index + 1}</span><div><span className="atelier-kicker">{project.category}</span><h3>{project.name === 'Vibe Motion · remotion-starter' ? 'Vibe Motion' : project.name}</h3><p>{project.name === 'xiaochen-skills' ? '把内容发布、视频制作和研究检索，整理成可复用的 Claude Code 技能。' : project.summary[0]}</p></div><ArrowUpRight className="atelier-work-arrow" /><span className="atelier-work-open">EXPLORE</span></a>)}</div>
      <a className="atelier-link" href="/works.html">完整作品集<ArrowUpRight size={19} /></a>
    </section>
    <section className="atelier-playground" id="playground" aria-labelledby="playground-title"><div><span className="atelier-kicker">OPEN DOORS / EVERYDAY TOOLS</span><h2 id="playground-title">日常的<br /><em>小小实验场。</em></h2><img src="/assets/identity/hero-line-alpha.png" alt="小陈与猫坐在长椅上使用电脑的线稿" width="1000" height="600" loading="lazy" /></div><div className="atelier-tool-list">{serviceEntrances.map(item => <a key={item.n} href={item.href} target="_blank" rel="noreferrer"><span>{item.n}</span><div><h3>{item.label}</h3><p>{item.title}</p></div><ArrowUpRight size={22} /></a>)}</div></section>
    <footer className="atelier-connect" id="connect"><div className="atelier-connect-top"><span className="atelier-kicker">THE NEXT CHAPTER IS OURS</span><Seal large /></div><h2>下一章，<br />一起<span>写。</span></h2><div className="atelier-connect-bottom"><p>有真实业务想装进 AI？<br />带着你的想法，来找我聊聊。</p><a href="/courses/" className="atelier-consult">聊聊你的项目<ArrowUpRight size={24} /></a></div><div className="atelier-socials">{socialLinks.map(item => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={14} /></a>)}</div><div className="atelier-colophon"><span>© {new Date().getFullYear()} 陈与小金 · XIAO CHEN</span><a href="#top">BACK TO TOP <ArrowRight size={14} /></a><span>MADE WITH CURIOSITY.</span></div></footer>
  </div>
}
