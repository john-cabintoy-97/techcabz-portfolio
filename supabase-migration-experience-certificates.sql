-- ============================================================
-- MIGRATION: experience + certificates tables
-- Run this in Supabase → SQL Editor if admin crashes with
-- "Could not find the table 'public.certificates'"
-- Safe to re-run (idempotent).
-- ============================================================

create extension if not exists "uuid-ossp";

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ─── EXPERIENCE ─────────────────────────────────────────────

create table if not exists public.experience (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  company text not null,
  location text,
  start_date text not null,
  end_date text,
  description text not null,
  technologies text[] default '{}',
  is_current boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

drop trigger if exists on_experience_updated on public.experience;
create trigger on_experience_updated
  before update on public.experience
  for each row
  execute procedure public.handle_updated_at();

alter table public.experience enable row level security;

drop policy if exists "Public can read experience" on public.experience;
create policy "Public can read experience"
  on public.experience for select
  using (true);

drop policy if exists "Authenticated users can insert experience" on public.experience;
create policy "Authenticated users can insert experience"
  on public.experience for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update experience" on public.experience;
create policy "Authenticated users can update experience"
  on public.experience for update
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete experience" on public.experience;
create policy "Authenticated users can delete experience"
  on public.experience for delete
  to authenticated
  using (true);

-- ─── CERTIFICATES ───────────────────────────────────────────

create table if not exists public.certificates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  issuer text not null,
  issue_date text not null,
  credential_url text,
  image_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

drop trigger if exists on_certificates_updated on public.certificates;
create trigger on_certificates_updated
  before update on public.certificates
  for each row
  execute procedure public.handle_updated_at();

alter table public.certificates enable row level security;

drop policy if exists "Public can read certificates" on public.certificates;
create policy "Public can read certificates"
  on public.certificates for select
  using (true);

drop policy if exists "Authenticated users can insert certificates" on public.certificates;
create policy "Authenticated users can insert certificates"
  on public.certificates for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update certificates" on public.certificates;
create policy "Authenticated users can update certificates"
  on public.certificates for update
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete certificates" on public.certificates;
create policy "Authenticated users can delete certificates"
  on public.certificates for delete
  to authenticated
  using (true);
