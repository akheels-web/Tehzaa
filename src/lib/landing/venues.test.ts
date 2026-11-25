import { describe, it, expect } from "vitest";
import { MAP_VENUES } from "./venues";
import { HYDERABAD_MONUMENTS } from "@/data/monuments";

describe("MAP_VENUES", () => {
  it("covers every monument plus HICC, inside the viewBox, with unique ids", () => {
    const ids = MAP_VENUES.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const m of HYDERABAD_MONUMENTS) expect(ids).toContain(m.id);
    expect(ids).toContain("hicc");
    for (const v of MAP_VENUES) {
      expect(v.x).toBeGreaterThanOrEqual(0);
      expect(v.x).toBeLessThanOrEqual(1000);
      expect(v.y).toBeGreaterThanOrEqual(0);
      expect(v.y).toBeLessThanOrEqual(700);
      expect(v.image.startsWith("/images/")).toBe(true);
      expect(v.line.length).toBeGreaterThan(10);
    }
  });
});
