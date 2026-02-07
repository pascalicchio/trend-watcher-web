-- Add password setup columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_expires TIMESTAMPTZ;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_setup_token ON users(setup_token);
