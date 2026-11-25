import { GALLERY_ITEMS, type GalleryItem } from "@/data/gallery";

const CATEGORIES_BY_SERVICE: Record<string, GalleryItem["category"][]> = {
  "floral-decorations": ["Floral", "Weddings"],
  "catering-services": ["Catering"],
  baraat: ["Weddings"],
  "corporate-events": ["Corporate"],
  "family-celebrations": ["Family"],
};

/** Real gallery setups to show on a service page (empty for unknown services). */
export function setupsForService(serviceId: string): GalleryItem[] {
  const cats = CATEGORIES_BY_SERVICE[serviceId];
  return cats ? GALLERY_ITEMS.filter((item) => cats.includes(item.category)) : [];
}
