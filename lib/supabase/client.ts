import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Creates an authenticated Supabase client for client-side components using Clerk JWT
 * @param clerkToken - The JWT obtained from Clerk's `useAuth().getToken({ template: 'supabase' })`
 */
export function createClerkSupabaseClient(clerkToken?: string | null) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: clerkToken
        ? {
            Authorization: `Bearer ${clerkToken}`,
          }
        : {},
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Fallback public client for unauthenticated queries
export const supabasePublicClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});
