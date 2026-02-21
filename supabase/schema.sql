-- ============================================================
-- LEVELS WEBSITE — COMPLETE DATABASE SCHEMA
-- Paste into: Supabase Dashboard → SQL Editor → New query
-- ============================================================


-- ── 1. PROFILES ──────────────────────────────────────────────
-- Linked 1:1 to auth.users. Auto-created on signup via trigger.

CREATE TABLE IF NOT EXISTS public.profiles (
  id                            uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name                     text,
  date_of_birth                 date,
  gender                        text CHECK (gender IN ('Male', 'Female', 'Non-binary', 'Prefer not to say')),
  profile_photo_url             text,
  phone                         text,
  emergency_contact_name        text,
  emergency_contact_phone       text,
  medical_notes                 text,
  tshirt_size                   text CHECK (tshirt_size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL')),
  city                          text,
  region                        text,
  fitness_level                 text CHECK (fitness_level IN ('Beginner', 'Intermediate', 'Advanced')),
  notifications_event_reminders boolean NOT NULL DEFAULT true,
  notifications_results         boolean NOT NULL DEFAULT true,
  notifications_new_events      boolean NOT NULL DEFAULT true,
  notifications_marketing       boolean NOT NULL DEFAULT false,
  created_at                    timestamptz NOT NULL DEFAULT now(),
  updated_at                    timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at on any change
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create a profile row whenever a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Allow users to fully delete their own account
CREATE OR REPLACE FUNCTION public.delete_own_user()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile"   ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- ── 2. EVENTS ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.events (
  id               uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title            text        NOT NULL,
  date             timestamptz NOT NULL,
  city             text        NOT NULL,
  venue            text        NOT NULL,
  address          text,
  capacity         integer     NOT NULL DEFAULT 200,
  registered_count integer     NOT NULL DEFAULT 0,
  status           text        NOT NULL DEFAULT 'upcoming'
                               CHECK (status IN ('upcoming', 'sold_out', 'completed')),
  price_standard   integer     NOT NULL DEFAULT 8900,
  price_vip        integer     NOT NULL DEFAULT 14900,
  description      text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);


-- ── 3. PRODUCTS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.products (
  id                uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name              text        NOT NULL,
  description       text,
  category          text        NOT NULL CHECK (category IN ('backpack', 'patch', 'clothing', 'footwear')),
  level_association integer,
  price             integer     NOT NULL,
  in_stock          boolean     NOT NULL DEFAULT true,
  stock_count       integer     NOT NULL DEFAULT 100,
  size_options      text[],
  colour_hex        text,
  featured          boolean     NOT NULL DEFAULT false,
  image_url         text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);


-- ── 4. RECOVERY LOUNGE PRODUCTS ──────────────────────────────

CREATE TABLE IF NOT EXISTS public.recovery_lounge_products (
  id            uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text        NOT NULL,
  sponsor_brand text        NOT NULL,
  description   text,
  retail_value  integer     NOT NULL,
  category      text        NOT NULL CHECK (category IN ('nutrition', 'recovery', 'tech', 'apparel', 'wellness')),
  is_available  boolean     NOT NULL DEFAULT true,
  tagline       text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.recovery_lounge_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view recovery products" ON public.recovery_lounge_products;
CREATE POLICY "Anyone can view recovery products"
  ON public.recovery_lounge_products FOR SELECT USING (true);


-- ── 5. EMAIL CAPTURES ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.email_captures (
  id            uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email         text        NOT NULL UNIQUE,
  first_name    text,
  last_name     text,
  city_interest text,
  current_level integer     NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert email capture" ON public.email_captures;
CREATE POLICY "Anyone can insert email capture"
  ON public.email_captures FOR INSERT WITH CHECK (true);


-- ── 6. REGISTRATIONS ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.registrations (
  id          uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id    uuid        REFERENCES public.events(id) ON DELETE CASCADE,
  first_name  text        NOT NULL,
  last_name   text        NOT NULL,
  email       text        NOT NULL,
  phone       text,
  ticket_type text        NOT NULL DEFAULT 'standard'
                          CHECK (ticket_type IN ('standard', 'vip')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert registration" ON public.registrations;
CREATE POLICY "Anyone can insert registration"
  ON public.registrations FOR INSERT WITH CHECK (true);


-- ── 7. AVATARS STORAGE BUCKET ────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar"     ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar"     ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar"     ON storage.objects;

CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
