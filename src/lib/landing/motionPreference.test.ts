import { describe, it, expect } from "vitest";
import { resolveMotionAllowed } from "./motionPreference";

describe("resolveMotionAllowed", () => {
  it("follows the OS preference by default", () => {
    expect(resolveMotionAllowed({ prefersReduced: false, isDev: false, search: "" })).toBe(true);
    expect(resolveMotionAllowed({ prefersReduced: true, isDev: false, search: "" })).toBe(false);
  });

  it("lets ?motion=full override reduced motion in development only", () => {
    expect(resolveMotionAllowed({ prefersReduced: true, isDev: true, search: "?motion=full" })).toBe(true);
    expect(resolveMotionAllowed({ prefersReduced: true, isDev: false, search: "?motion=full" })).toBe(false);
    expect(resolveMotionAllowed({ prefersReduced: true, isDev: true, search: "?x=1&motion=full" })).toBe(true);
    expect(resolveMotionAllowed({ prefersReduced: true, isDev: true, search: "?motion=off" })).toBe(false);
  });
});
