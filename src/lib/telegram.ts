import { ContactFormData, sanitizeMobile } from "./validation";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let randomCode = "";
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TEH-${year}-${randomCode}`;
}

export interface TelegramNotificationResult {
  success: boolean;
  referenceId: string;
  simulated?: boolean;
  error?: string;
}

export async function sendTelegramNotification(
  data: ContactFormData,
  referenceId: string
): Promise<TelegramNotificationResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const nowIST = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());

  const cleanPhone = sanitizeMobile(data.mobile);

  const message = [
    `✨ <b>NEW TEHZAA ROYAL ENQUIRY</b> ✨`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>Ref ID:</b> <code>${referenceId}</code>`,
    `👤 <b>Name:</b> ${escapeHtml(data.fullName)}`,
    `📱 <b>Mobile:</b> <a href="tel:${cleanPhone}">${escapeHtml(data.mobile)}</a>`,
    `📧 <b>Email:</b> ${data.email ? escapeHtml(data.email) : "<i>Not provided</i>"}`,
    `🎉 <b>Event Type:</b> ${escapeHtml(data.eventType)}`,
    `📅 <b>Event Date:</b> ${data.eventDate ? escapeHtml(data.eventDate) : "<i>Flexible / TBD</i>"}`,
    `📍 <b>Location:</b> ${escapeHtml(data.eventLocation)}`,
    `👥 <b>Expected Guests:</b> ${data.expectedGuests ? escapeHtml(data.expectedGuests) : "<i>Not specified</i>"}`,
    `💰 <b>Budget Range:</b> ${data.budgetRange ? escapeHtml(data.budgetRange) : "<i>Not specified</i>"}`,
    ``,
    `📝 <b>Celebration Vision & Details:</b>`,
    data.additionalDetails
      ? `<blockquote>${escapeHtml(data.additionalDetails)}</blockquote>`
      : `<i>None provided</i>`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `⏰ <b>Received:</b> ${nowIST}`,
    `🌐 <b>Origin:</b> Tehzaa Web Concierge Desk (Hyderabad)`,
  ].join("\n");

  // Graceful fallback if credentials are not configured
  if (!token || !chatId || token === "your_telegram_bot_token_here" || chatId === "your_telegram_chat_id_here") {
    console.warn(
      `[Tehzaa Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured.\n` +
      `[Simulated Telegram Message for ${referenceId}]:\n${message}`
    );
    return {
      success: true,
      referenceId,
      simulated: true,
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`[Tehzaa Telegram] Error from Telegram API (${response.status}):`, errBody);
      return {
        success: false,
        referenceId,
        error: `Telegram API responded with ${response.status}`,
      };
    }

    return {
      success: true,
      referenceId,
    };
  } catch (error) {
    console.error("[Tehzaa Telegram] Failed to send Telegram notification:", error);
    return {
      success: false,
      referenceId,
      error: error instanceof Error ? error.message : "Unknown network error",
    };
  }
}
