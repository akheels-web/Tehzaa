import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateReferenceId, sendTelegramNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    // 1. IP Identification for Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 5, 15 * 60 * 1000); // 5 requests / 15 mins

    if (!rateLimit.success) {
      const waitMinutes = Math.ceil((rateLimit.reset - Date.now()) / (60 * 1000));
      return NextResponse.json(
        {
          success: false,
          error: `Too many enquiries from this device. Please call our Hyderabad concierge directly at +91 98765 43210 or try again in ${waitMinutes} minute(s).`,
          rateLimited: true,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.reset.toString(),
          },
        }
      );
    }

    // 2. Parse request body
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Malformed request payload. Expected JSON body.",
        },
        { status: 400 }
      );
    }

    // 3. Honeypot check (Bots fill hidden fields)
    const honeypotVal = rawBody.honeypot || rawBody.companyWebsite;
    if (honeypotVal && String(honeypotVal).trim().length > 0) {
      console.warn(`[Tehzaa Anti-Spam] Honeypot triggered by IP ${clientIp}`);
      // Return simulated success to trap bots without sending real Telegram alerts
      const fakeRef = generateReferenceId();
      return NextResponse.json(
        {
          success: true,
          referenceId: fakeRef,
          message: "Your enquiry has been received.",
        },
        { status: 200 }
      );
    }

    // 4. Validate with Zod
    const validationResult = contactFormSchema.safeParse(rawBody);

    if (!validationResult.success) {
      const errorMap: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path.join(".");
        if (path && !errorMap[path]) {
          errorMap[path] = issue.message;
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please review the highlighted fields.",
          details: errorMap,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 5. Generate Reference ID
    const referenceId = generateReferenceId();

    // 6. Send Telegram Notification
    const telegramResult = await sendTelegramNotification(validatedData, referenceId);

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Your royal celebration enquiry has been received by our Hyderabad concierge.",
        simulated: telegramResult.simulated ?? false,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("[Tehzaa Contact API] Unhandled server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your enquiry. Please reach our concierge directly on WhatsApp (+91 98765 43210).",
      },
      { status: 500 }
    );
  }
}
