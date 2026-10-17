-- =============================================================================
-- BUILD WITH NEO PLATFORM - SAMPLE PROJECTS
-- Optional. Run after schema.sql. Safe to run twice.
-- =============================================================================

insert into public.projects
  (title, slug, tagline, description, category, difficulty, tech_stack, live_url, github_url, featured, innovations, stars_count)
values
(
  'NeoGrid',
  'neogrid',
  'Neural network visualizer that renders in the browser with WebGL.',
  'NeoGrid draws the layers of a small neural network as a 3D graph and lights up nodes as activations change. It uses instanced meshes in Three.js so a graph with tens of thousands of nodes still runs smoothly on a laptop.',
  'Graphics & 3D',
  'Advanced',
  array['Next.js', 'Three.js', 'GLSL', 'TypeScript'],
  'https://neogrid-demo.buildwithneo.online',
  'https://github.com/buildwithneo/neogrid',
  true,
  array['Instanced rendering keeps draw calls low', 'Node colors are computed in a vertex shader', 'Optional audio input drives node brightness'],
  342
),
(
  'HyperSync',
  'hypersync',
  'Shared state for multi-user apps, built on Supabase Realtime and Yjs.',
  'HyperSync wraps Yjs documents in a small API and persists them to Postgres. Clients keep working offline and merge cleanly when they reconnect, so two people can edit the same document without overwriting each other.',
  'Full stack',
  'Advanced',
  array['TypeScript', 'Supabase Realtime', 'Yjs', 'PostgreSQL'],
  'https://hypersync-demo.buildwithneo.online',
  'https://github.com/buildwithneo/hypersync-engine',
  true,
  array['Offline edits are queued and replayed on reconnect', 'Updates are sent as compact binary patches', 'Snapshots are stored in Postgres to speed up loading'],
  289
),
(
  'QuantumPulse',
  'quantumpulse',
  'Studio for building and testing voice agents in the browser.',
  'QuantumPulse connects a microphone to a streaming language model over WebRTC and plays the reply back as speech. You can change the prompt, pick a voice, and watch the latency of each turn while you test.',
  'AI',
  'Experimental',
  array['Next.js', 'WebRTC', 'OpenAI Realtime API', 'Tailwind CSS'],
  'https://quantumpulse.buildwithneo.online',
  'https://github.com/buildwithneo/quantumpulse',
  true,
  array['Per-turn latency is shown next to each reply', 'Tool calls can hit your own HTTP endpoints', 'Prompts and voices are saved per project'],
  415
),
(
  'AeroUI',
  'aeroui',
  'Copy-and-paste React components with GSAP motion and Radix primitives.',
  'AeroUI is a small set of components you copy into your own project: a dock, a magnetic button, scroll-linked sections. Each one is keyboard accessible and works without JavaScript animation if the user prefers reduced motion.',
  'Developer tools',
  'Intermediate',
  array['React', 'GSAP', 'Tailwind CSS', 'Radix UI'],
  'https://aeroui.buildwithneo.online',
  'https://github.com/buildwithneo/aeroui',
  false,
  array['Animations use transforms only, so layout never shifts', 'Respects prefers-reduced-motion', 'Theming through CSS variables'],
  198
)
on conflict (slug) do nothing;
