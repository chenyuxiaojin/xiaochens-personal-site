export function SmokeBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 animate-[smoke-sway-a_17s_ease-in-out_infinite] will-change-transform">
        <div
          className="flex h-full animate-[smoke-scroll-left_180s_linear_infinite] opacity-25 will-change-transform"
          style={{ width: '400vw' }}
        >
          <img
            src="/assets/bg/smoke-main-tiled.webp"
            alt=""
            className="h-full shrink-0 object-cover"
            style={{ width: '200vw' }}
          />
          <img
            src="/assets/bg/smoke-main-tiled.webp"
            alt=""
            className="h-full shrink-0 object-cover"
            style={{ width: '200vw' }}
          />
        </div>
      </div>
      <div className="absolute inset-0 animate-[smoke-sway-b_23s_ease-in-out_infinite] will-change-transform">
        <div
          className="flex h-full animate-[smoke-scroll-right_240s_linear_infinite] opacity-50 will-change-transform"
          style={{ width: '400vw' }}
        >
          <img
            src="/assets/bg/smoke-mist-tiled.webp"
            alt=""
            className="h-full shrink-0 object-cover"
            style={{ width: '200vw' }}
          />
          <img
            src="/assets/bg/smoke-mist-tiled.webp"
            alt=""
            className="h-full shrink-0 object-cover"
            style={{ width: '200vw' }}
          />
        </div>
      </div>
    </div>
  )
}
