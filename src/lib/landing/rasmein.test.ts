import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { RASMEIN } from "./rasmein";

describe("RASMEIN", () => {
  it("has the 7 rasms in order with real image files", () => {
    expect(RASMEIN.map((r) => r.id)).toEqual([
      "sanchaq",
      "manjha-haldi",
      "mehendi",
      "pelli-pandiri",
      "baraat",
      "nikkah",
      "walima-vindhu",
    ]);
    for (const r of RASMEIN) {
      expect(existsSync(join(process.cwd(), "public", r.image))).toBe(true);
      expect(r.meaning.length).toBeGreaterThan(20);
      expect(r.weHandle.length).toBeGreaterThan(20);
    }
  });
});
