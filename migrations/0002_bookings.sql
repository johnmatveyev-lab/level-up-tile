-- Consultation bookings (web form + voice agent)
create table if not exists bookings (
  id text primary key,
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  preferred_date text not null,
  time_window text not null,
  message text not null default '',
  source text not null default 'web',
  status text not null default 'confirmed'
);

create index if not exists bookings_created_at_idx on bookings (created_at desc);
create index if not exists bookings_email_idx on bookings (email);
