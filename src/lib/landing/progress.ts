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
