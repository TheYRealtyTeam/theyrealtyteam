create table if not exists contact_submissions(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  property_type text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists rate_limit_log(
  id bigserial primary key,
  identifier text not null,
  created_at timestamptz default now()
);

create table if not exists security_logs(
  id bigserial primary key,
  event text not null,
  details jsonb,
  severity text check (severity in ('low','medium','high','critical')) default 'medium',
  created_at timestamptz default now()
);