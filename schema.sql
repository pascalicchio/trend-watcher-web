-- TrendWatcher Database Schema
-- Run this in Supabase SQL Editor: https://qijbkikzcvpaqztlitbj.supabase.co

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables (if needed for reset)
-- drop table if exists intelligence_cards;
-- drop table if exists reports;
-- drop table if exists subscriptions;
-- drop table if exists users;

-- Users table
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  name text,
  role text default 'user',
  subscription text default 'free',
  stripe_customer_id text,
  reset_token text,
  reset_token_expires timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscriptions table
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) not null,
  plan text not null,
  stripe_payment_id text,
  status text default 'active',
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reports table
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) not null,
  type text not null,
  title text not null,
  content jsonb,
  data jsonb,
  status text default 'delivered',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Intelligence Cards table
create table if not exists intelligence_cards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table users enable row level security;
alter table subscriptions enable row level security;
alter table reports enable row level security;
alter table intelligence_cards enable row level security;

-- RLS Policies
create policy "Users can view own data" on users for select using (auth.uid() = id);
create policy "Users can update own data" on users for update using (auth.uid() = id);

create policy "Users can view own subscriptions" on subscriptions for select using (
  exists (select 1 from users where id = user_id and auth.uid() = users.id)
);

create policy "Users can view own reports" on reports for select using (
  exists (select 1 from users where id = user_id and auth.uid() = users.id)
);

create policy "Users can create reports" on reports for insert with check (
  exists (select 1 from users where id = user_id and auth.uid() = users.id)
);

create policy "Users can view own intelligence cards" on intelligence_cards for select using (
  exists (select 1 from users where id = user_id and auth.uid() = users.id)
);

create policy "Users can create intelligence cards" on intelligence_cards for insert with check (
  exists (select 1 from users where id = user_id and auth.uid() = users.id)
);

-- Create indexes for performance
create index idx_users_email on users(email);
create index idx_subscriptions_user_id on subscriptions(user_id);
create index idx_reports_user_id on reports(user_id);
create index idx_reports_created_at on reports(created_at desc);
create index idx_intelligence_cards_user_id on intelligence_cards(user_id);

-- Verify tables created
select table_name from information_schema.tables where table_schema = 'public';
