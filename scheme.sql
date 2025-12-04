create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  birth_date date not null,
  phone text not null,
  cedula text not null,
  created_by uuid not null
);

alter table public.patients
  add constraint patients_cedula_unique unique (cedula);

create index if not exists patients_full_name_idx
  on public.patients (full_name);

create index if not exists patients_full_name_trgm_gin
  on public.patients using gin (full_name gin_trgm_ops);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete restrict,
  created_at timestamptz not null default now(),
  title text not null,
  detail text not null,
  created_by uuid not null
);

create index if not exists consultations_patient_created_idx
  on public.consultations (patient_id, created_at);