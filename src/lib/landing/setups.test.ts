import { describe, it, expect } from "vitest";
import { setupsForService } from "./setups";
import { GALLERY_ITEMS } from "@/data/gallery";

describe("setupsForService", () => {
  it("maps each service to its gallery categories", () => {
    expect(setupsForService("catering-services").every((i) => i.category === "Catering")).toBe(true);
    expect(setupsForService("floral-decorations").every((i) => i.category === "Floral" || i.category === "Weddings")).toBe(true);
    expect(setupsForService("floral-decorations").length).toBe(
      GALLERY_ITEMS.filter((i) => i.category === "Floral" || i.category === "Weddings").length
    );
    expect(setupsForService("corporate-events").every((i) => i.category === "Corporate")).toBe(true);
    expect(setupsForService("nope")).toEqual([]);
  });
});
