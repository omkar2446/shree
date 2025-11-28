-- Add role column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Ensure role has a default
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';
