import { currentUser } from "@clerk/nextjs/server";
import { timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * True when the request comes from an admin.
 * - a Clerk user whose public metadata has { "role": "admin" }, or
 * - the correct ADMIN_SECRET_PASSCODE (only if that variable is set).
 */
export async function checkIsAdmin(passcode?: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET_PASSCODE;
  if (secret && passcode && safeEqual(passcode, secret)) return true;

  try {
    const user = await currentUser();
    return (user?.publicMetadata as { role?: string } | undefined)?.role === "admin";
  } catch {
    return false;
  }
}
