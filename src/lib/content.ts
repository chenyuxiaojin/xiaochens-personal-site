export type SocialLink = { label: string; href: string }
export type MarqueeItem = { img: string; label: string }
export type DecoPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
export type Deco = {
  src: string
  pos: DecoPosition
  triggerOnView?: boolean
}
export type ServiceItem = { n: string; title: string; desc: string }

export type PortfolioNavItem = {
  n: string
  label: string
  href: string
}

export type WorkItem = {
  n: string
  title: string
  category: string
  desc: string
  href: string | null
  image: string
}

export type Project = {
  n: string
  client: string
  name: string
  images: [string, string, string, string]
  link: string | null
}

export type ServiceEntrance = {
  n: string
  label: string
  title: string
  desc: string
  href: string
}

export type PortfolioProjectLink = { label: string; href: string }

export type PortfolioProject = {
  n: string
  name: string
  category: string
  summary: string[]
  links: PortfolioProjectLink[]
}

export const identity = {
  nameZh: '陈与小金',
  nameEn: 'Xiao Chen',
  mark: 'CYXJ',
  role: 'AI 落地 / Claude Code 实战',
  location: 'China',
  availability: 'Open for practical AI workflow builds',
  portrait: '/assets/identity/cyxj-portrait.webp',
}

export const portfolioNav: PortfolioNavItem[] = [
  { n: '01', label: 'Works', href: '/works.html' },
  { n: '02', label: 'About', href: '/about.html' },
  { n: '03', label: 'Playground', href: '/play-ground.html' },
  { n: '04', label: 'Contact', href: '/contact.html' },
  { n: '05', label: 'Consulting', href: '/courses/' },
]

export const nav = {
  items: [
    { label: 'HOME', href: '/' },
    { label: 'WORKS', href: '/works.html' },
    { label: 'ABOUT', href: '/about.html' },
    { label: 'PLAYGROUND', href: '/play-ground.html' },
    { label: 'CONTACT', href: '/contact.html' },
    { label: 'AI 咨询', href: '/courses/' },
  ],
}

export const socialLinks: SocialLink[] = [
  { label: 'YouTube', href: 'https://www.youtube.com/@cyxj_ai' },
  { label: 'X', href: 'https://x.com/cyxjya' },
  { label: '抖音', href: 'https://v.douyin.com/A1qVQrOgPjY/' },
  { label: 'B站', href: 'https://b23.tv/Wr1JBHo' },
  { label: 'GitHub', href: 'https://github.com/chenyuxiaojin' },
  { label: '博客', href: 'https://blog.xiaochens.com/' },
]

export const heroNotes = [
  '把 Claude Code / Codex 接进真实业务。',
  '从需求、数据、自动化到可运行工具。',
  '工作、生意、工作流，都要落地。',
]

export const hero = {
  bigText: identity.nameZh,
  subtitle: ['AI 落地', '用 Claude Code 把 AI 装进真实业务', '工作 · 生意 · 工作流'],
  videoSrc: '/assets/hero.mp4',
  videoPoster: '/assets/hero-poster.jpg',
  cta: { label: '联系我', href: '/contact.html' },
}

export const marquee: { top: MarqueeItem[]; bottom: MarqueeItem[] } = {
  top: [
    { img: '/assets/platforms/douyin.webp', label: '抖音' },
    { img: '/assets/platforms/bilibili.webp', label: 'B 站' },
    { img: '/assets/platforms/wechat.webp', label: '视频号' },
  ],
  bottom: [
    { img: '/assets/gallery/g01.webp', label: '' },
    { img: '/assets/gallery/g05.webp', label: '' },
    { img: '/assets/gallery/g07.webp', label: '' },
    { img: '/assets/gallery/g11.webp', label: '' },
  ],
}

export const works: WorkItem[] = [
  {
    n: '01',
    title: 'AI 工作流落地',
    category: 'Workflow',
    desc: '把 Claude Code / Codex 接进真实业务，减少重复动作。',
    href: null,
    image: '/assets/gallery/g01.webp',
  },
  {
    n: '02',
    title: '内容平台运营',
    category: 'Content',
    desc: '围绕 AI 落地输出视频、文章与复盘。',
    href: 'https://www.youtube.com/@cyxj_ai',
    image: '/assets/platforms/douyin.webp',
  },
  {
    n: '03',
    title: '本地业务工具',
    category: 'Tools',
    desc: '把零散操作做成稳定脚本、后台入口和可复用流程。',
    href: 'https://ai.xiaochens.com',
    image: '/assets/gallery/g05.webp',
  },
  {
    n: '04',
    title: '跨平台知识输出',
    category: 'Media',
    desc: 'YouTube、抖音、B站、视频号，同一个定位持续沉淀。',
    href: 'https://b23.tv/Wr1JBHo',
    image: '/assets/platforms/bilibili.webp',
  },
]

export const about = {
  bigText: 'ABOUT ME',
  title: '我是小陈，陈与小金。',
  body: '主 Claude Code，次 Codex，把 AI 装进真实业务：工作、生意和工作流。做出来的东西、踩过的坑、能复用的流程，都会整理成视频、文章和工具。',
  cta: { label: '联系我', href: '/contact.html' },
  pillars: [
    '(a) Direction: turn messy goals, data and tools into a usable implementation path.',
    '(b) Build: use Claude Code, Codex and scripts to produce working systems.',
    '(c) Interaction: make workflows easy to inspect, repeat and adjust.',
    '(d) Output: document the result as videos, articles and reusable patterns.',
  ],
  capabilities: [
    'AI 工作流设计',
    'Claude Code / Codex 实战',
    '自动化和业务工具',
    '内容复盘',
    '跨平台输出',
  ],
  decos: {
    moon: { src: '/assets/deco/moon.webp', pos: 'top-left' },
    cube: { src: '/assets/deco/cube.webp', pos: 'top-right' },
    smile: {
      src: '/assets/deco/smile.webp',
      pos: 'bottom-left',
      triggerOnView: true,
    },
    arrow: {
      src: '/assets/deco/arrow.webp',
      pos: 'bottom-right',
      triggerOnView: true,
    },
  } as Record<string, Deco>,
}

export const serviceEntrances: ServiceEntrance[] = [
  {
    n: '01',
    label: 'Blog',
    title: '文章与想法',
    desc: '长期内容、复盘、工具记录。',
    href: 'https://blog.xiaochens.com',
  },
  {
    n: '02',
    label: 'AI Center',
    title: 'AI 模型接口与对话服务',
    desc: 'AI 服务和模型能力入口。',
    href: 'https://ai.xiaochens.com',
  },
  {
    n: '03',
    label: 'Image Host',
    title: 'Lsky Pro 图床服务',
    desc: '图片上传、托管和外链管理。',
    href: 'https://img.xiaochens.com',
  },
  {
    n: '04',
    label: 'API Gateway',
    title: 'OpenAI 兼容接口',
    desc: '接口转发、聚合和调用入口。',
    href: 'https://api.xiaochens.com',
  },
]

export const entrances = {
  bigText: 'DIGITAL DOCK',
  intro: '博客、图床、AI 服务、API 接口，仍然是陈与小金的在线工具入口。',
  items: serviceEntrances,
}

export const playground = {
  intro: '这里放我正在用、正在搭、或者还没有归档到作品里的在线入口。',
}

// AI 咨询:事实全部来自小陈 2026-10-10 口述,登记在 GEO 工作台 products/courses.yaml 的 ai-consulting。
export const consulting = {
  title: 'AI 咨询',
  lead: '帮企业和个人，把 AI 接进真实工作流。',
  wechat: 'chenyuxiaojin',
  details: [
    { label: '方式', text: '线上、线下都可以。可以一对一，也接企业咨询。' },
    { label: '费用', text: '500 元 / 小时。什么问题都可以问，回答不了的不收费。' },
  ],
}

export const contact = {
  headline: ['Let’s collaborate', 'and build real workflows.'],
  directLines: ['有真实业务想装进 AI？', '任一平台私信都能找到我。'],
  tagline: 'AI 落地 / Claude Code / Codex',
}

// 数字口径：均来自 docs/作品集优化-执行提示词.md 的事实清单（2026-07-21 实测）。
// 会漂移的数字（star、clone、播放量）必须带「截至 2026-07」；清单外的数字不许出现。
export const portfolioIntro = '9 个原创公开项目（不含 fork 与主页仓库）· 截至 2026-07'

export const portfolio: PortfolioProject[] = [
  {
    n: '01',
    name: 'DropKit',
    category: 'macOS App',
    summary: [
      'macOS 菜单栏工具：摇一摇唤出悬浮文件架，外加可搜索的剪贴板历史。',
      'Swift 开发，已通过审核上架 Mac App Store，当前版本 v1.0.7。',
      '开源后收到外部开发者提交的 9 个 PR，8 个已整合进主干，README 有公开致谢。',
    ],
    links: [
      { label: 'Mac App Store', href: 'https://apps.apple.com/cn/app/dropkit-clipboard/id6778846792' },
      { label: 'GitHub', href: 'https://github.com/chenyuxiaojin/DropKit' },
    ],
  },
  {
    n: '02',
    name: 'obsidian-llm-translate',
    category: 'Obsidian Plugin',
    summary: [
      'Obsidian 翻译插件：选中即译或整篇翻译，支持 DeepSeek、OpenAI、Gemini 等 OpenAI 兼容服务商。',
      '保留 YAML frontmatter，支持流式输出与中途取消。',
      '已收录进 Obsidian 官方社区插件目录（id: llm-translate），可在 Obsidian 内直接安装。',
    ],
    links: [
      { label: '插件目录', href: 'https://community.obsidian.md/plugins/llm-translate' },
      { label: 'GitHub', href: 'https://github.com/chenyuxiaojin/obsidian-llm-translate' },
    ],
  },
  {
    n: '03',
    name: 'davinci-resolve-mcp 贡献',
    category: 'Open Source Contribution',
    summary: [
      '给第三方项目 davinci-resolve-mcp（1.7k+ star，截至 2026-07）做系统性测试与贡献。',
      '提交的 4 个 bug 报告全部被确认修复，3 个 commit 以 Co-Authored-By 署名进入主干。',
      '代表性发现：用 130 次连续 append 实验，验证了 endFrame 未写入文档的 exclusive-bound 行为。',
      '2 份 release note 点名致谢共 6 次（v2.60.0 内 5 次，v2.52.0 内 1 次）。',
    ],
    links: [
      { label: 'Release v2.60.0', href: 'https://github.com/samuelgursky/davinci-resolve-mcp/releases/tag/v2.60.0' },
    ],
  },
  {
    n: '04',
    name: 'xiaochen-skills',
    category: 'Claude Code Plugins',
    summary: [
      '自建 Claude Code 插件市场：17 个插件、19 个技能。',
      '覆盖内容发布、视频制作、研究检索、数据复盘等日常工作流场景。',
      '近 14 天被 clone 385 次（仓库后台数据，截至 2026-07）。',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/chenyuxiaojin/xiaochen-skills' }],
  },
  {
    n: '05',
    name: 'cyxj-groksearch',
    category: 'MCP Server',
    summary: [
      '为 Claude Code 做的联网搜索 MCP 服务：Grok 搜索 + Tavily 抓取 + Firecrawl 截图，带多 key 自动切换。',
      '开源发布后经 linux.do 社区自然传播。',
      '14 star（截至 2026-07）。',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/chenyuxiaojin/cyxj-groksearch' }],
  },
  {
    n: '06',
    name: 'Vibe Motion · remotion-starter',
    category: 'Open Source Org',
    summary: [
      'Vibe Motion 开源组织成员，维护组织内的 remotion-starter 仓库。',
      '一个用 Claude Code 指挥 Remotion 出视频的工作台脚手架：三层架构 + hooks 守规矩 + skills 编排流程。',
      '仓库官方简介署名「maintained by 陈与小金」。',
    ],
    links: [
      { label: 'remotion-starter', href: 'https://github.com/vibe-motion/remotion-starter' },
      { label: 'Vibe Motion', href: 'https://github.com/vibe-motion' },
    ],
  },
  {
    n: '07',
    name: 'AI 内容创作',
    category: 'Content',
    summary: [
      '围绕 AI 落地持续输出短视频与图文，抖音、YouTube、B 站、视频号同步分发。',
      '近 30 天播放 90 万+，单条最高 68.44 万；已发布的 8 条视频全部入选抖音精选（抖音后台数据，自报口径，截至 2026-07）。',
    ],
    links: [
      { label: '抖音', href: 'https://v.douyin.com/A1qVQrOgPjY/' },
      { label: 'YouTube', href: 'https://www.youtube.com/@cyxj_ai' },
    ],
  },
  {
    n: '08',
    name: '外部发表',
    category: 'Writing',
    summary: [
      '3 篇文章刊于「人人都是产品经理」（woshipm.com）。',
      '长期复盘与工具记录沉淀在个人博客。',
      '发表清单与原文链接见博客 Publications 页。',
    ],
    links: [
      { label: 'Publications', href: 'https://blog.xiaochens.com/publications/' },
      { label: '博客', href: 'https://blog.xiaochens.com/' },
    ],
  },
]

export const services: { bigText: string; items: ServiceItem[] } = {
  bigText: "WHAT I'M UP TO",
  items: [
    { n: '01', title: 'AI 落地', desc: '把 Claude Code 和 Codex 接进真实业务流程' },
    { n: '02', title: '业务工具', desc: '从需求、数据、自动化到可运行工具' },
    { n: '03', title: '内容复盘', desc: '把做出来的东西和踩过的坑讲清楚' },
    { n: '04', title: '工作流搭建', desc: '减少重复动作，让 AI 真正进入日常工作' },
    { n: '05', title: '跨平台输出', desc: 'YouTube、抖音、B 站、视频号，同一个定位' },
  ],
}

export const projects: Project[] = [
  {
    n: '01',
    client: 'PERSONAL',
    name: 'AI 工作流落地',
    images: [
      '/assets/gallery/g01.webp',
      '/assets/gallery/g02.webp',
      '/assets/gallery/g03.webp',
      '/assets/gallery/g06.webp',
    ],
    link: null,
  },
  {
    n: '02',
    client: 'CONTENT',
    name: '内容平台运营',
    images: [
      '/assets/platforms/douyin.webp',
      '/assets/platforms/bilibili.webp',
      '/assets/gallery/g04.webp',
      '/assets/gallery/g08.webp',
    ],
    link: 'https://www.youtube.com/@cyxj_ai',
  },
  {
    n: '03',
    client: 'TOOLS',
    name: '在线工具入口',
    images: [
      '/assets/platforms/wechat.webp',
      '/assets/gallery/g09.jpg',
      '/assets/gallery/g10.jpg',
      '/assets/gallery/g11.webp',
    ],
    link: 'https://ai.xiaochens.com',
  },
]

export const footer = {
  github: {
    label: 'github.com/chenyuxiaojin',
    href: 'https://github.com/chenyuxiaojin',
  },
  links: socialLinks,
  copyright: '© 2026 陈与小金',
}
