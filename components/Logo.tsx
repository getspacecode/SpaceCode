// The SpaceCode mark, rebuilt as vector from the supplied logo:
// two identical rounded slabs tilted -35°, the lower one offset down-left.
// Colours follow the active theme (dark: white + blue, light: black).

export const SLAB = { w: 316.6, h: 112.1, r: 26, angle: -35 };
export const SLAB_TOP = { cx: 636.7, cy: 492.5 };
export const SLAB_BOTTOM = { cx: 562.3, cy: 706.4 };

export function slabProps(c: { cx: number; cy: number }) {
  return {
    x: c.cx - SLAB.w / 2,
    y: c.cy - SLAB.h / 2,
    width: SLAB.w,
    height: SLAB.h,
    rx: SLAB.r,
    transform: `rotate(${SLAB.angle} ${c.cx} ${c.cy})`,
  };
}

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="400 354 400 490" className={className} role="img" aria-label="SpaceCode">
      <rect {...slabProps(SLAB_TOP)} fill="var(--logo-a)" />
      <rect {...slabProps(SLAB_BOTTOM)} fill="var(--logo-b)" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans text-[13px] font-semibold uppercase tracking-[0.36em] ${className}`}>
      Space Code
    </span>
  );
}
