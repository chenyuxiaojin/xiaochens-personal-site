export type PageId = 'home' | 'works' | 'about' | 'playground' | 'contact' | 'consulting'

export const pageSeo: Record<
  PageId,
  { title: string; description: string; canonical: string }
> = {
  home: {
    title: '陈与小金 · FDE，AI 落地',
    description: '陈与小金 · FDE，AI 落地。用 Claude Code 把 AI 装进真实业务——工作、生意、工作流。',
    canonical: 'https://xiaochens.com/',
  },
  works: {
    title: 'Works · 陈与小金',
    description:
      '陈与小金的作品索引：DropKit、obsidian-llm-translate、davinci-resolve-mcp 贡献、xiaochen-skills、cyxj-groksearch、Vibe Motion remotion-starter，以及 AI 内容创作与外部发表。',
    canonical: 'https://xiaochens.com/works.html',
  },
  about: {
    title: 'About · 陈与小金',
    description:
      '主 Claude Code，次 Codex，把 AI 装进真实业务：工作、生意和工作流。做出来的东西、踩过的坑、能复用的流程，都会整理成视频、文章和工具。',
    canonical: 'https://xiaochens.com/about.html',
  },
  playground: {
    title: 'Playground · 陈与小金',
    description: '陈与小金正在用、正在搭的在线入口：博客、AI 服务、图床、API 网关、数字商店。',
    canonical: 'https://xiaochens.com/play-ground.html',
  },
  contact: {
    title: 'Contact · 陈与小金',
    description: '联系陈与小金：YouTube、X、抖音、B站、GitHub，任一平台私信都能找到我。',
    canonical: 'https://xiaochens.com/contact.html',
  },
  consulting: {
    title: 'AI 咨询 · 陈与小金',
    description:
      '陈与小金的 AI 咨询：帮企业和个人把 AI 接进真实工作流。线上线下都可以，一对一或企业咨询，500 元 / 小时，回答不了的不收费，加微信了解。',
    canonical: 'https://xiaochens.com/courses/',
  },
}
