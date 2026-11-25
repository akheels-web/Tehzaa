import { describe, it, expect } from "vitest";
import { creditForImage } from "./credits";

describe("creditForImage", () => {
  it("returns the monument licence credit for real-* photos and nothing otherwise", () => {
    expect(creditForImage("/images/real-chowmahalla-palace.webp")).toContain("Wikimedia Commons");
    expect(creditForImage("/images/real-charminar.webp")).toContain("CC BY-SA");
    expect(creditForImage("/images/baraat-grand-entry.webp")).toBeUndefined();
  });
});
