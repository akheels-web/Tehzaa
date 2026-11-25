/** Single source for the studio's phone and WhatsApp details. */
export const STUDIO_PHONE_DISPLAY = "+91 98765 43210";
export const STUDIO_PHONE_TEL = "+919876543210";

export function whatsappHref(message: string): string {
  return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
}
