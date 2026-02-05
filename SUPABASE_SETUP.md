# Supabase Setup for TrendWatcher

## 1. Create Supabase Account
1. Go to https://supabase.com
2. Sign up with GitHub (fastest)
3. Create new project: "trendwatcher"

## 2. Get Credentials
After project creation, go to:
- **Settings → API**
- Copy:
  - `SUPABASE_URL` (Project URL)
  - `SUPABASE_ANON_KEY` (Anonymous key)

## 3. Create Database Schema
Run this in Supabase's SQL Editor:

```sql
-- Users table
create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  name text,
  role text default 'user',
  subscription text default 'free',
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscriptions table
create table subscriptions (
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
create table reports (
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
create table intelligence_cards (
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

-- Policies
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
```

## 4. Add Environment Variables
Create `.env.local` in project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Update Vercel
Add the same variables in Vercel Dashboard:
- Project Settings → Environment Variables
- Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Redeploy

## 6. Future: Enable Auth (Optional)
Supabase Auth can replace our JWT system:
- Built-in email/password auth
- Magic links
- OAuth providers
- Row Level Security handles protection

## Need Help?
- Docs: https://supabase.com/docs
- SQL Editor: In Supabase dashboard → SQL Editor
