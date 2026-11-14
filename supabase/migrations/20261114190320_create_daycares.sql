-- Root entity: daycare centers.
create table public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.daycares enable row level security;

-- Seed: demo daycares. "Guarderia Sala Soles" is the active one used by the UI mockups.
insert into public.daycares (name) values
  ('Guardería Sala Soles'),
  ('Guardería Pequeños Pasos'),
  ('Guardería Lunita'),
  ('Guardería Los Peques');
