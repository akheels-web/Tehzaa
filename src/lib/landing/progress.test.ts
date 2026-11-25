import { describe, it, expect } from "vitest";
import {
  clampProgress,
  indexFromProgress,
  mapRange,
  sliceScrollTarget,
  darbarArchWidth,
  stripTarget,
  stripIndex,
} from "./progress";
import { whatsappHref } from "../contact";

describe("clampProgress", () => {
  it("clamps and handles NaN", () => {
    expect(clampProgress(-0.5)).toBe(0);
    expect(clampProgress(1.7)).toBe(1);
    expect(clampProgress(Number.NaN)).toBe(0);
    expect(clampProgress(0.42)).toBe(0.42);
  });
});

describe("indexFromProgress", () => {
  it("maps progress to a valid index", () => {
    expect(indexFromProgress(0, 5)).toBe(0);
    expect(indexFromProgress(0.39, 5)).toBe(1);
    expect(indexFromProgress(1, 5)).toBe(4);
    expect(indexFromProgress(2, 5)).toBe(4);
    expect(indexFromProgress(-1, 5)).toBe(0);
    expect(indexFromProgress(Number.NaN, 5)).toBe(0);
    expect(indexFromProgress(0.5, 0)).toBe(0);
  });
});

describe("whatsappHref", () => {
  it("encodes the message", () => {
    expect(whatsappHref("Chai pe milenge?")).toBe(
      "https://wa.me/919876543210?text=Chai%20pe%20milenge%3F"
    );
  });
});

describe("mapRange", () => {
  it("maps linearly inside the input range and clamps outside it", () => {
    expect(mapRange(0.5, [0, 1], [0, 100])).toBe(50);
    expect(mapRange(0.06, [0.06, 0.28], [1, 0])).toBe(1);
    expect(mapRange(0.28, [0.06, 0.28], [1, 0])).toBe(0);
    expect(mapRange(0.9, [0.06, 0.28], [1, 0])).toBe(0);
    expect(mapRange(-1, [0.06, 0.28], [1, 0])).toBe(1);
    expect(mapRange(Number.NaN, [0, 1], [10, 20])).toBe(10);
  });
});

describe("sliceScrollTarget", () => {
  it("scrolls to the middle of item i's slice of the pinned range", () => {
    // section top 1000, pinned range 2000, slices span 0.04..0.96 of it, 5 items
    expect(sliceScrollTarget({ top: 1000, range: 2000, start: 0.04, span: 0.92, index: 0, count: 5 })).toBeCloseTo(1000 + 2000 * (0.04 + 0.092));
    expect(sliceScrollTarget({ top: 1000, range: 2000, start: 0.04, span: 0.92, index: 4, count: 5 })).toBeCloseTo(1000 + 2000 * (0.04 + 0.92 * 0.9));
  });
  it("clamps the index into range", () => {
    const a = sliceScrollTarget({ top: 0, range: 100, start: 0, span: 1, index: 99, count: 4 });
    expect(a).toBeCloseTo(87.5);
    expect(sliceScrollTarget({ top: 0, range: 100, start: 0, span: 1, index: -3, count: 4 })).toBeCloseTo(12.5);
  });
});

describe("darbarArchWidth", () => {
  it("is width-limited on tall screens and height-limited on short laptops", () => {
    expect(darbarArchWidth(1440, 900)).toBe(270);
    expect(darbarArchWidth(1000, 1200)).toBe(190);
    // 1366x657: heading + text need ~400px, and the active arch is 4/3 tall × 1.06 scale
    expect(darbarArchWidth(1366, 657)).toBeLessThanOrEqual(Math.floor((657 - 400) * 0.7));
    expect(darbarArchWidth(1366, 657)).toBeGreaterThan(150);
    expect(darbarArchWidth(1366, 300)).toBe(120);
  });
});

describe("stripTarget", () => {
  it("steps one frame per index and clamps to the drag range", () => {
    expect(stripTarget(0, 328, 1000)).toBe(-0);
    expect(stripTarget(1, 328, 1000)).toBe(-328);
    expect(stripTarget(3, 328, 1000)).toBe(-984);
    expect(stripTarget(4, 328, 1000)).toBe(-1000);
    expect(stripTarget(-2, 328, 1000)).toBe(-0);
  });
  it("maps an x offset back to the nearest frame index", () => {
    expect(stripIndex(-500, 328, 1000)).toBe(2);
    expect(stripIndex(0, 328, 1000)).toBe(0);
    expect(stripIndex(-1000, 328, 1000)).toBe(4);
  });
});
