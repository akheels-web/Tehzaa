import { SERVICES, type CulinaryDishDetail } from "@/data/services";

export type DegMenuKey = "dawat" | "vindhu" | "veg";

export interface DegMenu {
  label: string;
  dishes: CulinaryDishDetail[];
}

// Collections are found by title prefix (not index) so reordering the data can't break the deg.
const SOURCES: Record<DegMenuKey, { label: string; titlePrefix: string }> = {
  dawat: { label: "Shaadi Dawat", titlePrefix: "Hyderabadi Muslim Shaadi" },
  vindhu: { label: "Pelli Vindhu", titlePrefix: "Telugu Hindu Pelli Vindhu" },
  veg: { label: "Pure Veg & Jain", titlePrefix: "Pure Veg & Sattvic Jain" },
};

/** The three menus the deg can spill out, each capped at 8 dishes from the catering data. */
export function getDegMenus(): Record<DegMenuKey, DegMenu> {
  const collections = SERVICES.find((s) => s.slug === "catering")?.menuCollections ?? [];
  const pick = (prefix: string) =>
    (collections.find((c) => c.title.startsWith(prefix))?.dishes ?? []).slice(0, 8);

  return {
    dawat: { label: SOURCES.dawat.label, dishes: pick(SOURCES.dawat.titlePrefix) },
    vindhu: { label: SOURCES.vindhu.label, dishes: pick(SOURCES.vindhu.titlePrefix) },
    veg: { label: SOURCES.veg.label, dishes: pick(SOURCES.veg.titlePrefix) },
  };
}
