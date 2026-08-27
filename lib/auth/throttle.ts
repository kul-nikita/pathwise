import { getDb } from "@/lib/db/mongo";

const MAX_ATTEMPTS = 8;
const WINDOW_MINUTES = 15;

type Attempt = { key: string; count: number; firstAttemptAt: Date };

/**
 * Per-identifier login throttle. Backed by Mongo rather than process memory so
 * it still holds across multiple server instances.
 */
export async function registerFailedAttempt(key: string) {
  const col = (await getDb()).collection<Attempt>("login_attempts");
  await col.updateOne(
    { key },
    { $inc: { count: 1 }, $setOnInsert: { firstAttemptAt: new Date() } },
    { upsert: true }
  );
}

export async function isThrottled(key: string): Promise<boolean> {
  const col = (await getDb()).collection<Attempt>("login_attempts");
  const record = await col.findOne({ key });

  if (!record) {
    return false;
  }

  const windowExpired = Date.now() - record.firstAttemptAt.getTime() > WINDOW_MINUTES * 60 * 1000;

  if (windowExpired) {
    await col.deleteOne({ key });
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

export async function clearAttempts(key: string) {
  await (await getDb()).collection<Attempt>("login_attempts").deleteOne({ key });
}
