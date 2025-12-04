alter table public.patients enable row level security;
alter table public.consultations enable row level security;

create policy patients_select_authenticated
  on public.patients
  for select
  using (auth.uid() is not null);

create policy patients_insert_owner
  on public.patients
  for insert
  with check (created_by = auth.uid());

create policy patients_update_owner
  on public.patients
  for update
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

create policy consultations_select_authenticated
  on public.consultations
  for select
  using (auth.uid() is not null);

create policy consultations_insert_owner
  on public.consultations
  for insert
  with check (created_by = auth.uid());

create policy consultations_update_owner
  on public.consultations
  for update
  using (created_by = auth.uid())
  with check (created_by = auth.uid());