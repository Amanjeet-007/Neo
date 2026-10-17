# Connect Clerk and Supabase

Supabase needs to trust the token Clerk creates. You set this up once.

## Step 1: Copy the Supabase JWT secret

1. Open your project in the Supabase dashboard.
2. Go to **Project Settings**, then **API**.
3. Copy the **JWT Secret**.

## Step 2: Create a JWT template in Clerk

1. Open the Clerk dashboard and go to **JWT Templates**.
2. Click **New template** and choose **Supabase**.
3. Name it exactly `supabase`.
4. Paste the JWT secret as the **Signing key**.
5. Save.

The template should include these claims:

```json
{
  "aud": "authenticated",
  "role": "authenticated",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "app_metadata": {
    "role": "{{user.public_metadata.role}}"
  }
}
```

## Step 3: Use the token in your app

On the server:

```typescript
import { createServerSupabaseClient } from "@/lib/supabase/server";

const supabase = await createServerSupabaseClient();
const { data } = await supabase.from("projects").select("*");
```

In a client component:

```typescript
import { useAuth } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/lib/supabase/client";

const { getToken } = useAuth();
const token = await getToken({ template: "supabase" });
const supabase = createClerkSupabaseClient(token);
```

## Check it works

The `sub` claim in the token is the Clerk user id. Supabase exposes it to your security rules, which is what the next topic uses.
