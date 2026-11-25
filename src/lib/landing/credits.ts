import { HYDERABAD_MONUMENTS } from "@/data/monuments";

/** Licence credit for a CC-licensed monument photo (matched by image path), if any. */
export function creditForImage(src: string): string | undefined {
  return HYDERABAD_MONUMENTS.find((m) => m.image === src)?.creditLicense;
}
