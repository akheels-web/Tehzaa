import { describe, it, expect } from "vitest";
import { clampProgress, indexFromProgress } from "./progress";
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
