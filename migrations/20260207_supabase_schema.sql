-- Supabase SQL Schema for TrendWatcher
-- Run this in Supabase Dashboard → SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (already exists, but ensure columns exist)
ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_expires TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_users_setup_token ON users(setup_token);
CREATE INDEX IF NOT EXISTS idx_users_customer_id ON users(stripe_customer_id);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free',
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'active',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  content JSONB,
  status TEXT DEFAULT 'generated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);

-- Intelligence cards table
CREATE TABLE IF NOT EXISTS intelligence_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intelligence_cards_user_id ON intelligence_cards(user_id);

-- Products table (for trend tracking)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT,
  velocity_current DECIMAL(10,2),
  saturation_idx DECIMAL(10,2),
  organic_source_url TEXT,
  supplier_url TEXT,
  target_margin DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies (users can only see their own data)
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own intelligence cards" ON intelligence_cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own intelligence cards" ON intelligence_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert products" ON products
  FOR INSERT WITH CHECK (true);

-- Note: For service_role access (used by API), bypass RLS
-- This is handled by using the service_role key in API routes

-- Seed data - example products
INSERT INTO products (title, category, velocity_current, saturation_idx) VALUES
  ('AI Writing Assistant', 'software', 85.5, 12.3),
  ('Wireless Earbuds Pro', 'electronics', 92.1, 8.7),
  ('Minimalist Desk Setup', 'home', 78.3, 15.2),
  ('Smart Home Hub', 'technology', 88.9, 10.1),
  ('Portable Power Station', 'outdoor', 95.2, 6.8)
ON CONFLICT DO NOTHING;

SELECT '✅ Schema created successfully!' as status;
