# Next.js with Clerk and Supabase

How to build a signed-in app with Next.js, Clerk for authentication, and Supabase for the database.

## What you will learn

- Connect Clerk and Supabase so database rules know who the user is
- Set up the tables and row level security
- Configure the environment variables

## Before you start

- Node.js 18.20 or newer
- A free Clerk account and a free Supabase project

## How it fits together

1. Clerk signs the user in.
2. Clerk creates a token for Supabase.
3. Your app sends that token with each database request.
4. Supabase reads the user id from the token and applies your security rules.
