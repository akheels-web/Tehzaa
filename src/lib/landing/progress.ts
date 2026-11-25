/** Clamp a scroll progress value into [0, 1]; NaN becomes 0. */
export function clampProgress(p: number): number {
  if (Number.isNaN(p)) return 0;
  return Math.min(1, Math.max(0, p));
}

/** Map scroll progress (0–1) to an item index in [0, count - 1]. */
export function indexFromProgress(progress: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.floor(clampProgress(progress) * count));
}

/** Linear map of `v` from [a, b] onto [from, to], clamped at both ends; NaN maps to `from`. */
export function mapRange(v: number, [a, b]: [number, number], [from, to]: [number, number]): number {
  const t = Number.isNaN(v) ? 0 : Math.min(1, Math.max(0, (v - a) / (b - a)));
  return from + (to - from) * t;
}
