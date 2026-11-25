import { describe, it, expect } from "vitest";
import { getDegMenus } from "./menus";

describe("getDegMenus", () => {
  it("returns three labelled menus with 1-8 real dishes each", () => {
    const m = getDegMenus();
    expect(Object.keys(m)).toEqual(["dawat", "vindhu", "veg"]);
    expect(m.dawat.label).toBe("Shaadi Dawat");
    expect(m.vindhu.label).toBe("Pelli Vindhu");
    expect(m.veg.label).toBe("Pure Veg & Jain");
    for (const k of ["dawat", "vindhu", "veg"] as const) {
      expect(m[k].dishes.length).toBeGreaterThan(0);
      expect(m[k].dishes.length).toBeLessThanOrEqual(8);
    }
    expect(m.veg.dishes.every((d) => d.veg === true)).toBe(true);
  });
});
