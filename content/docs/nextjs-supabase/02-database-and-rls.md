# Database and row level security

Row level security (RLS) lets the database decide who can read or change each row.

## Create the tables

Run `supabase/schema.sql` in the Supabase SQL editor. It creates:

- `profiles`: one row per user, kept in sync by the Clerk webhook
- `projects`: the projects shown on the site

Optionally run `supabase/seed.sql` to add sample projects.

## Read the user id in SQL

Clerk ids look like `user_2abc...`, which is text, not a UUID. The schema adds a helper:

```sql
create or replace function requesting_user_id()
returns text as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  );
$$ language sql stable;
```

## Write a policy

Anyone can read projects. Only admins can change them:

```sql
create policy "Projects are public"
  on public.projects for select
  using (true);

create policy "Admins manage projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles
      where id = requesting_user_id() and role = 'admin'
    )
  );
```

## Make someone an admin

Set the `role` column on their row in `profiles` to `admin`. The site also accepts a Clerk user with `{ "role": "admin" }` in public metadata.
