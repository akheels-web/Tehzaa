import { describe, it, expect } from "vitest";
import { SHOWCASE_BY_SERVICE } from "@/data/showcase";

describe("baraat procession data", () => {
  it("has the four baraat entries, Marfa first", () => {
    const items = SHOWCASE_BY_SERVICE.baraat.items;
    expect(items).toHaveLength(4);
    expect(items[0].tab).toBe("Hyderabadi Marfa & Walima");
    expect(items.some((i) => i.tab.includes("Pallaki"))).toBe(true);
    for (const i of items) expect(i.cues.length).toBeGreaterThanOrEqual(2);
  });
});
