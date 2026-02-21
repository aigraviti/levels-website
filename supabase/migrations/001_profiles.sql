-- ================================================
-- LEVELS — ATHLETE PROFILES
-- Run this in Supabase SQL Editor
-- ================================================

-- ── PROFILES TABLE ───────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  date_of_birth date,
  gender text CHECK (gender IN ('Male', 'Female', 'Non-binary', 'Prefer not to say')),
  profile_photo_url text,
  phone text,
  emergency_contact_name text,
  emergency_contact_phone text,
  medical_notes text,
  tshirt_size text CHECK (tshirt_size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL')),
  city text,
  region text,
  fitness_level text CHECK (fitness_level IN ('Beginner', 'Intermediate', 'Advanced')),
  notifications_event_reminders boolean DEFAULT true,
  notifications_results boolean DEFAULT true,
  notifications_new_events boolean DEFAULT true,
  notifications_marketing boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── ROW LEVEL SECURITY ───────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ── AUTO-CREATE PROFILE ON SIGNUP ────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── AUTO-UPDATE updated_at ────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- ── DELETE OWN ACCOUNT ────────────────────────────
-- Allows users to delete themselves (cascades to profile)

CREATE OR REPLACE FUNCTION public.delete_own_user()
RETURNS void AS $$
BEGIN
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── STORAGE BUCKET FOR PROFILE PHOTOS ────────────
-- Run separately if needed:
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
-- create policy "Avatar images are publicly accessible."
--   on storage.objects for select using (bucket_id = 'avatars');
-- create policy "Users can upload their own avatar."
--   on storage.objects for insert with check (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
-- create policy "Users can update their own avatar."
--   on storage.objects for update using (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
