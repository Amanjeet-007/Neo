import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    if (type === "user.created" || type === "user.updated") {
      const email = data.email_addresses?.[0]?.email_address;
      const fullName = `${data.first_name || ""} ${data.last_name || ""}`.trim();
      const avatarUrl = data.image_url;

      await supabaseAdmin.from("profiles").upsert({
        id: data.id,
        email,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Clerk Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
