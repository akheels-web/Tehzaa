import { z } from "zod";

export const EVENT_TYPE_OPTIONS = [
  {
    value: "Telugu & South Indian Weddings",
    label: "Telugu & South Indian Weddings (Muhurtham & Mandapam)",
  },
  {
    value: "North Indian / Punjabi / Marwari Ceremonies",
    label: "North Indian, Punjabi & Marwari Ceremonies",
  },
  {
    value: "Hyderabadi Nikkah & Walima",
    label: "Hyderabadi Nikkah & Walima",
  },
  {
    value: "Engagement",
    label: "Engagement / Nischitartham / Ring Ceremony",
  },
  {
    value: "Sangeet & Haldi",
    label: "Sangeet, Mehendi & Haldi",
  },
  {
    value: "Reception",
    label: "Grand Reception",
  },
  {
    value: "Floral Decoration",
    label: "Floral & Mandap Decoration",
  },
  {
    value: "Catering",
    label: "Catering & Culinary Services",
  },
  {
    value: "Baraat",
    label: "Baraat & Grand Entries",
  },
  {
    value: "Seemantham / Baby Shower",
    label: "Seemantham / Godh Bharai / Baby Shower",
  },
  {
    value: "Naming Ceremony",
    label: "Namakaranam / Naming Ceremony",
  },
  {
    value: "Housewarming",
    label: "Gruhapravesham / Housewarming",
  },
  {
    value: "Birthday",
    label: "Milestone Birthday Celebration",
  },
  {
    value: "Corporate Summit & Gala",
    label: "Corporate Summit & Gala",
  },
  {
    value: "Other",
    label: "Other Bespoke Celebration",
  },
] as const;

export const EVENT_TYPES = [
  "Telugu & South Indian Weddings",
  "North Indian / Punjabi / Marwari Ceremonies",
  "Hyderabadi Nikkah & Walima",
  "Wedding",
  "Reception",
  "Floral Decoration",
  "Catering",
  "Baraat",
  "Corporate Summit & Gala",
  "Corporate Event",
  "Birthday",
  "Seemantham / Baby Shower",
  "Baby Shower",
  "Naming Ceremony",
  "Housewarming",
  "Engagement",
  "Sangeet & Haldi",
  "Other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const BUDGET_RANGES = [
  "Below ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹3,00,000",
  "₹3,00,000–₹5,00,000",
  "Above ₹5,00,000",
  "Not decided",
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number];

export const HYDERABAD_LOCALITIES = [
  "Jubilee Hills",
  "Banjara Hills",
  "Madhapur & HITEC City",
  "Gachibowli & Financial District",
  "Kokapet & Gandipet",
  "Taj Falaknuma & Old City",
  "Kondapur & Botanical Garden",
  "Begumpet & Somajiguda",
  "Secunderabad & Cantonment",
  "Shamshabad & Airport Corridor",
  "Kukatpally & Miyapur",
  "Other Area in Hyderabad",
] as const;

// Normalize Indian phone numbers: remove spaces, dashes, brackets
export function sanitizeMobile(raw: string): string {
  return raw.replace(/[\s\-\(\)]/g, "");
}

// Check Indian mobile validity: 10 digits starting with 6-9, optionally with +91, 91, or 0
export const indianMobileRegex = /^(?:(?:\+|0{0,2})91)?[6789]\d{9}$/;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must be at least 2 characters")
    .max(100, "Full Name cannot exceed 100 characters")
    .trim(),

  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number is too long")
    .refine((val) => {
      const sanitized = sanitizeMobile(val);
      return indianMobileRegex.test(sanitized);
    }, "Please provide a valid 10-digit Indian mobile number (e.g., 98765 43210)"),

  email: z
    .string()
    .email("Please provide a valid email address")
    .or(z.literal(""))
    .optional(),

  eventType: z.enum(EVENT_TYPES, {
    errorMap: () => ({ message: "Please select an event type" }),
  }),

  eventDate: z.string().optional(),

  eventLocation: z
    .string()
    .min(2, "Please provide the Hyderabad event location or venue")
    .max(120, "Location description is too long")
    .trim(),

  expectedGuests: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val !== undefined && val !== null ? String(val) : undefined))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = Number(val);
      return !isNaN(num) && num >= 1 && num <= 50000;
    }, "Expected guests must be a valid number between 1 and 50,000"),

  budgetRange: z
    .enum(BUDGET_RANGES)
    .or(z.literal(""))
    .optional(),

  additionalDetails: z
    .string()
    .max(2000, "Details must not exceed 2000 characters")
    .optional(),

  // Honeypot field - must stay empty
  honeypot: z.string().max(0, "Invalid submission").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
