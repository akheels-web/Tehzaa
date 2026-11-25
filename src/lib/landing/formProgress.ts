export interface FieldGroup {
  id: string;
  label: string;
  required: string[];
  optional: string[];
}

/** Contact form fields grouped by meaning (not by row) for the gold-thread progress rail. */
export const CONTACT_GROUPS: FieldGroup[] = [
  { id: "about", label: "About you", required: ["fullName", "mobile"], optional: ["email"] },
  { id: "event", label: "Your event", required: ["eventType", "eventLocation"], optional: ["eventDate", "expectedGuests"] },
  { id: "details", label: "Details", required: [], optional: ["budgetRange", "additionalDetails"] },
];

function isFilled(v: unknown): boolean {
  if (typeof v === "number") return !Number.isNaN(v);
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Which groups are complete.
 * - With required fields: every required field filled and error-free, and no filled
 *   optional field in the group has an error.
 * - All-optional: at least one field filled, and no filled field has an error
 *   (so it never ties on an empty form).
 */
export function groupProgress(
  values: Record<string, unknown>,
  errors: Record<string, unknown>,
  groups: FieldGroup[]
): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const g of groups) {
    const ok = (f: string) => isFilled(values[f]) && !errors[f];
    const filledOptionalOk = g.optional.filter((f) => isFilled(values[f])).every((f) => !errors[f]);
    out[g.id] =
      g.required.length > 0
        ? g.required.every(ok) && filledOptionalOk
        : g.optional.some(ok) && filledOptionalOk;
  }
  return out;
}
