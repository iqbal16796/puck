-- Version history / time machine.
-- Run this once in the Supabase dashboard: Project -> SQL Editor -> New query -> paste -> Run.
-- Uses the anon/publishable key policies already in play for `sites` (no
-- auth is wired up yet in this app), so read/write is left open the same way.

create table if not exists site_versions (
  id bigint generated always as identity primary key,
  site_name text not null references sites (site_name) on delete cascade,
  template_id text,
  puck_data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists site_versions_site_name_created_at_idx
  on site_versions (site_name, created_at desc);

alter table site_versions enable row level security;

drop policy if exists "Public can read site_versions" on site_versions;
create policy "Public can read site_versions"
  on site_versions for select
  using (true);

drop policy if exists "Public can insert site_versions" on site_versions;
create policy "Public can insert site_versions"
  on site_versions for insert
  with check (true);
