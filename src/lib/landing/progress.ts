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

/**
 * Scroll position that puts item `index` in the middle of its slice of a pinned
 * section (`top` = section's document top, `range` = section height − viewport).
 */
export function sliceScrollTarget({
  top,
  range,
  start,
  span,
  index,
  count,
}: {
  top: number;
  range: number;
  start: number;
  span: number;
  index: number;
  count: number;
}): number {
  const i = Math.min(Math.max(index, 0), Math.max(count - 1, 0));
  return top + range * (start + (span * (i + 0.5)) / Math.max(count, 1));
}

/** Darbar arch width: 19vw capped at 270px, and shrunk on short screens so the heading
 *  and caption (~400px incl. header) plus a 3:4 arch at 1.06 active scale fit the pin. */
export function darbarArchWidth(vw: number, vh: number): number {
  return Math.floor(Math.max(120, Math.min(vw * 0.19, 270, (vh - 400) * 0.7)));
}

/** Filmstrip x for frame `index`: one frame width per step, clamped to [−maxDrag, 0]. */
export function stripTarget(index: number, frameW: number, maxDrag: number): number {
  return -Math.min(Math.max(index, 0) * frameW, maxDrag);
}

/** Nearest frame index for an x offset; at the end of the range it is the last index. */
export function stripIndex(x: number, frameW: number, maxDrag: number): number {
  const lastIndex = Math.ceil(maxDrag / frameW);
  if (-x >= maxDrag - 1) return lastIndex;
  return Math.min(lastIndex, Math.max(0, Math.round(-x / frameW)));
}
