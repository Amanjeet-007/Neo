# Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

## Clerk

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard, API Keys |
| `CLERK_SECRET_KEY` | Clerk dashboard, API Keys |
| `CLERK_WEBHOOK_SECRET` | Clerk dashboard, Webhooks |

## Supabase

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings, API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings, API |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings, API |
| `SUPABASE_JWT_SECRET` | Project Settings, API, JWT Settings |

## Admin page

`ADMIN_SECRET_PASSCODE` unlocks the `/admin` page. Choose a long random value. If it is not set, only Clerk users with the `admin` role can use the page.

## Keep secrets private

- Only variables that start with `NEXT_PUBLIC_` are sent to the browser.
- Never commit `.env.local`.
- The service role key bypasses all security rules. Use it only in server code.
