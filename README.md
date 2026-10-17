# Build With Neo

A website with two parts: a list of projects, and documentation written as plain markdown.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## What is in it

- Projects: list, search, and a page per project
- Docs: folders of markdown files, shown with a topic list and a table of contents
- Sign in with Clerk
- Projects stored in Supabase (sample projects show until you add your own)
- `/admin` page to add projects

## Add documentation

Docs live in `content/docs/`. No config and no code changes.

```
content/docs/
  my-guide/
    README.md          the overview text
    01-first-topic.md  one file per topic
    02-second-topic.md
```

- Add a folder to create a new documentation.
- Add a `.md` file to add a topic.
- The title is the first `# Heading` in the file.
- The first paragraph after the title is the short description.
- Topics are listed in filename order, so start names with 01, 02, 03.
- The topic list in the sidebar and the page address (`/docs/my-guide/first-topic`) are created for you.

## Set up Clerk and Supabase

1. Create a Clerk app and a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor. Optionally run `supabase/seed.sql` for sample projects.
3. Create a Clerk JWT template named `supabase`, signed with the Supabase JWT secret.
4. Put the keys in `.env.local`.

The steps are written out in `content/docs/nextjs-supabase/`.

## Add a project

- Go to `/admin`, enter the passcode, fill in the form.
- Or insert a row into the `projects` table in Supabase.

## Animations

Built with framer-motion: hero entrance, scroll reveals, sliding menu highlight, page fade, reading progress bar. They turn off automatically for visitors who set "reduce motion". There is no custom cursor.

## Change the look

Colors are variables at the top of `app/globals.css`. Light and dark follow the visitor's system setting.

## Folders

- `app/`: pages
- `components/`: header, footer, project list, markdown renderer
- `content/docs/`: documentation
- `lib/`: docs reader, project data, Supabase and Clerk helpers
- `supabase/`: database schema and sample data

## Deploy

Push to GitHub, import into Vercel, and add the variables from `.env.example`.
a