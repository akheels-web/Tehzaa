interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting by IP
const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes to avoid memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpired() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [ip, record] of ipRequestMap.entries()) {
      if (now > record.resetAt) {
        ipRequestMap.delete(ip);
      }
    }
    lastCleanup = now;
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  limit: number;
}

/**
 * Checks and increments rate limit for a given IP.
 * Default: 5 requests per 15 minutes (900,000 ms)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): RateLimitResult {
  cleanupExpired();

  const now = Date.now();
  const normalizedIp = ip.trim().toLowerCase() || "unknown-ip";
  const record = ipRequestMap.get(normalizedIp);

  if (!record || now > record.resetAt) {
    // New window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    ipRequestMap.set(normalizedIp, newRecord);

    return {
      success: true,
      remaining: limit - 1,
      reset: newRecord.resetAt,
      limit,
    };
  }

  // Existing window
  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: record.resetAt,
      limit,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    reset: record.resetAt,
    limit,
  };
}
