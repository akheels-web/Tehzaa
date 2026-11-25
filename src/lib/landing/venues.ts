import { HYDERABAD_MONUMENTS } from "@/data/monuments";

export interface MapVenue {
  id: string;
  name: string;
  era: string;
  line: string;
  image: string;
  alt: string;
  /** Position in the map's 0 0 1000 700 viewBox (schematic, from real lat/long). */
  x: number;
  y: number;
}

// Projected from latitude/longitude: x = (lon − 78.35) / 0.15 × 1000, y = (17.48 − lat) / 0.16 × 700.
const POSITIONS: Record<string, { x: number; y: number }> = {
  charminar: { x: 827, y: 520 },
  "chowmahalla-palace": { x: 807, y: 538 },
  "taj-falaknuma-palace": { x: 780, y: 652 },
  "golconda-fort": { x: 340, y: 424 },
  "taramati-baradari": { x: 133, y: 481 },
  "qutb-shahi-tombs": { x: 300, y: 372 },
};

export const MAP_VENUES: MapVenue[] = [
  ...HYDERABAD_MONUMENTS.filter((m) => POSITIONS[m.id]).map((m) => ({
    id: m.id,
    name: m.name,
    era: m.builtEra,
    line: m.celebrationRole,
    image: m.image,
    alt: m.alt,
    ...POSITIONS[m.id],
  })),
  {
    id: "hicc",
    name: "HICC & HITEC City",
    era: "Today's Hyderabad",
    line: "Summits by day, palace galas by night.",
    image: "/images/corporate-gala-hyderabad.webp",
    alt: "A corporate gala banquet set up by Tehzaa in Hyderabad",
    x: 133,
    y: 44,
  },
];
