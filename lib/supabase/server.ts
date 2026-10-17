import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Creates an authenticated Supabase client for Server Components and Route Handlers.
 * Automatically injects the Clerk user JWT signed for the Supabase template.
 */
export async function createServerSupabaseClient() {
  const { getToken } = await auth();
  
  // Obtain the custom Supabase JWT template created in the Clerk Dashboard
  let token: string | null = null;
  try {
    token = await getToken({ template: "supabase" });
  } catch (err) {
    console.warn("Could not retrieve Clerk Supabase token; falling back to anonymous client", err);
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
