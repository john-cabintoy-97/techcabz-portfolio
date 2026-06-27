-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
create table if not exists public.projects (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  content     text,                         -- Markdown for case study
  image_url   text,
  project_url text,                         -- nullable
  github_url  text,                         -- nullable
  tags        text[] default '{}',          -- Array of tags
  featured    boolean default false,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Auto-update updated_at on row change
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_projects_updated
  before update on public.projects
  for each row
  execute procedure public.handle_updated_at();

-- ============================================================
-- EXPERIENCE TABLE
-- ============================================================
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

create trigger on_experience_updated
  before update on public.experience
  for each row
  execute procedure public.handle_updated_at();

-- ============================================================
-- CERTIFICATES TABLE
-- ============================================================
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

create trigger on_certificates_updated
  before update on public.certificates
  for each row
  execute procedure public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.certificates enable row level security;

-- Public read access (anyone can view projects)
create policy "Public can read projects"
  on public.projects for select
  using (true);

-- Only authenticated users (admins) can insert/update/delete
create policy "Authenticated users can insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update projects"
  on public.projects for update
  to authenticated
  using (true);

create policy "Authenticated users can delete projects"
  on public.projects for delete
  to authenticated
  using (true);

-- Experience policies
create policy "Public can read experience"
  on public.experience for select
  using (true);

create policy "Authenticated users can insert experience"
  on public.experience for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update experience"
  on public.experience for update
  to authenticated
  using (true);

create policy "Authenticated users can delete experience"
  on public.experience for delete
  to authenticated
  using (true);

-- Certificate policies
create policy "Public can read certificates"
  on public.certificates for select
  using (true);

create policy "Authenticated users can insert certificates"
  on public.certificates for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update certificates"
  on public.certificates for update
  to authenticated
  using (true);

create policy "Authenticated users can delete certificates"
  on public.certificates for delete
  to authenticated
  using (true);

-- ============================================================
-- SEED DATA (optional — remove in production)
-- ============================================================
insert into public.projects (title, description, content, image_url, project_url, github_url, tags, featured)
values
(
  'E-Commerce Platform',
  'A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard.',
  '## Overview

Built a production-grade e-commerce platform handling thousands of SKUs with real-time stock updates via Supabase Realtime.

## Technical Highlights

- **Next.js App Router** for streaming SSR and optimal Core Web Vitals
- **Stripe** for payment processing with webhook-based order fulfillment
- **Supabase** for PostgreSQL + real-time subscriptions
- **Redis** caching layer for product catalog performance

## Challenges

The main challenge was keeping inventory counts consistent under high-concurrency checkout flows. Solved using Postgres row-level locking and optimistic UI updates with rollback.

## Results

- 40% improvement in page load times vs. previous solution
- 99.9% uptime over 6 months in production
- Handles 500+ concurrent users comfortably',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  'https://example.com',
  'https://github.com',
  ARRAY['Next.js', 'Supabase', 'Stripe', 'TypeScript', 'Redis'],
  true
),
(
  'AI Code Review Tool',
  'A developer tool that uses Claude AI to perform automated code reviews, catching bugs and suggesting improvements.',
  '## Overview

An automated code review assistant that integrates with GitHub PRs and provides line-by-line feedback using large language models.

## Technical Highlights

- **Anthropic Claude API** for intelligent code analysis
- **GitHub Webhooks** for PR event triggers
- **Worker Queue** (BullMQ) for async review processing
- **React** dashboard for review history and metrics

## Challenges

Token budget management for large PRs was critical — implemented a chunking strategy with semantic diff analysis to prioritize high-risk changes.

## Results

- Average review time reduced from 2 days to 15 minutes
- 200+ developers using it across 3 organizations',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://example.com',
  'https://github.com',
  ARRAY['TypeScript', 'Claude AI', 'GitHub API', 'BullMQ', 'React'],
  true
),
(
  'Real-Time Dashboard',
  'A WebSocket-powered analytics dashboard with live data streaming, custom chart library, and multi-tenant auth.',
  '## Overview

Built for a SaaS analytics product, this dashboard streams live events from millions of user sessions into interactive charts with sub-second latency.

## Technical Highlights

- **Custom WebSocket server** with room-based subscriptions
- **D3.js** rendering pipeline optimized for 60fps updates
- **Multi-tenant** architecture with org-scoped data isolation
- **ClickHouse** for OLAP-style aggregation queries

## Results

- 10ms p95 latency for live metric updates
- Scales to 50,000 concurrent dashboard viewers',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://example.com',
  'https://github.com',
  ARRAY['React', 'WebSockets', 'D3.js', 'ClickHouse', 'Node.js'],
  false
);
