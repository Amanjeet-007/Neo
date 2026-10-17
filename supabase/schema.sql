-- =============================================================================
-- BUILD WITH NEO PLATFORM - DATABASE SCHEMA
-- Integrates seamlessly with Clerk Authentication & Row-Level Security (RLS)
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- Helper function to extract Clerk User ID from JWT claims
-- Clerk signs JWTs with claim "sub" containing user id (e.g., 'user_2xyz...')
-- -----------------------------------------------------------------------------
create or replace function requesting_user_id()
returns text as $$
begin
  return coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  );
exception when others then
  return null;
end;
$$ language plpgsql stable;

-- -----------------------------------------------------------------------------
-- 1. PROFILES (one row per Clerk user, filled by the Clerk webhook)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id text primary key, -- Clerk user id ('user_...')
  email text,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- -----------------------------------------------------------------------------
-- 2. PROJECTS (shown on /projects)
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  tagline text not null,
  description text not null,
  category text not null, -- 'Graphics & 3D', 'AI', 'Full stack', 'Developer tools'
  difficulty text,
  tech_stack text[] not null default '{}',
  live_url text,
  github_url text,
  image_url text,
  featured boolean default false,
  innovations text[] default '{}',
  stars_count integer default 0,
  author_id text references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.projects enable row level security;

-- Profiles: readable by everyone, editable by the owner
create policy "Profiles are readable"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (id = requesting_user_id())
  with check (id = requesting_user_id() and role = 'user');

-- Projects: public read, admin-only write
create policy "Projects are readable"
  on public.projects for select
  using (true);

create policy "Admins manage projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles
      where id = requesting_user_id() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = requesting_user_id() and role = 'admin'
    )
  );

-- =============================================================================
-- updated_at trigger
-- =============================================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_projects_updated_at
  before update on public.projects
  for each row execute function update_updated_at_column();
