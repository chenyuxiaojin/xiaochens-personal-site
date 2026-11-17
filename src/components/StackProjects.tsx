import { projects } from '../lib/content'
import { ProjectCard } from './ProjectCard'

export function StackProjects() {
  return (
    <section id="projects" className="relative">
      {/* WORKS 说明卡：扑克堆最底层，内容集中在上半部分 */}
      <div className="sticky top-0 mx-6 flex h-screen flex-col overflow-hidden rounded-[var(--radius-stack)] bg-black px-6 pt-5 pb-10 shadow-2xl shadow-black/50 md:mx-16 md:px-10 md:pt-6 md:pb-14">
        <p className="text-[10px] tracking-[0.3em] text-white/50 md:text-xs">
          WORKS
        </p>
        <h2 className="mt-6 font-[family:var(--font-heavy-en)] text-[clamp(3rem,13vw,10rem)] leading-[0.9] tracking-tight md:mt-10">
          PROJECTS
        </h2>
        <p className="mt-6 max-w-md text-sm text-white/50 md:text-base">
          三个平台，同一个人。滚一下 ↓
        </p>
      </div>

      {/* 3 张项目卡：依次 80px 递增覆盖，形成扑克堆 */}
      {projects.map((p, i) => (
        <ProjectCard key={p.n} index={i + 1} {...p} />
      ))}

      {/* 缓冲槽：让 4 张叠好的状态保持一屏滚动距离 */}
      <div aria-hidden className="h-screen" />
    </section>
  )
}
