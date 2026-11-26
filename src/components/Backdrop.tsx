/* The fixed substrate: deep space, a faded blueprint grid, three blooms and grain. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-void" />
      <div className="field-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_78%)]" />
      <div className="absolute -top-52 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-ice/[0.09] blur-[130px]" />
      <div className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full bg-acid/[0.05] blur-[120px]" />
      <div className="absolute -bottom-40 -left-24 h-[420px] w-[620px] rounded-full bg-plasma/[0.045] blur-[130px]" />
      <div className="grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-void to-transparent" />
    </div>
  )
}
