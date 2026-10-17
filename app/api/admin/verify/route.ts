import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/clerk/roles";

// The admin page calls this to unlock. The passcode is only ever compared on the server.
export async function POST(req: Request) {
  const { passcode } = await req.json().catch(() => ({ passcode: "" }));
  const ok = await checkIsAdmin(passcode);
  return NextResponse.json({ ok }, { status: ok ? 200 : 401 });
}
