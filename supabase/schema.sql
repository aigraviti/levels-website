-- ================================================
-- LEVELS WEBSITE — SUPABASE SCHEMA + SEED DATA
-- Paste this into the Supabase SQL Editor and click Run
-- ================================================

-- ── CREATE TABLES ────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date timestamptz NOT NULL,
  city text NOT NULL,
  venue text NOT NULL,
  address text,
  capacity int NOT NULL DEFAULT 200,
  registered_count int DEFAULT 0,
  status text DEFAULT 'upcoming',
  price_standard int NOT NULL DEFAULT 8900,
  price_vip int NOT NULL DEFAULT 14900,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  level_association int,
  price int NOT NULL,
  in_stock bool DEFAULT true,
  stock_count int DEFAULT 100,
  size_options text[],
  colour_hex text,
  featured bool DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  ticket_type text DEFAULT 'standard',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recovery_lounge_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sponsor_brand text NOT NULL,
  description text,
  retail_value int NOT NULL,
  category text NOT NULL,
  is_available bool DEFAULT true,
  tagline text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_captures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  city_interest text,
  current_level int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ── ROW LEVEL SECURITY ───────────────────────────

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_lounge_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read recovery" ON recovery_lounge_products FOR SELECT USING (true);

-- Public insert policies (forms)
CREATE POLICY "Public insert registrations" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert email_captures" ON email_captures FOR INSERT WITH CHECK (true);

-- ── SEED: EVENTS ─────────────────────────────────

INSERT INTO events (title, date, city, venue, address, capacity, registered_count, status, price_standard, price_vip, description) VALUES
(
  'LEVELS Auckland — Open Season',
  '2026-03-14 19:00:00+00',
  'Auckland',
  'Spark Arena Surrounds',
  'Mahuhu Crescent, Auckland CBD',
  350, 187, 'upcoming', 8900, 14900,
  'The flagship Auckland event. Open to all levels. 350 athletes competing across 5 levels with live DJ, media zone, and full festival experience.'
),
(
  'LEVELS Auckland — Winter Series',
  '2026-06-20 20:00:00+00',
  'Auckland',
  'Les Mills Auckland',
  '12 Mayoral Drive, Auckland CBD',
  200, 94, 'upcoming', 8900, 14900,
  'A high-energy mid-year event in one of Auckland''s premier fitness facilities. Limited to 200 athletes for an intimate, intense atmosphere.'
),
(
  'LEVELS Auckland — Grand Prix',
  '2026-09-12 19:00:00+00',
  'Auckland',
  'Spark Arena Surrounds',
  'Mahuhu Crescent, Auckland CBD',
  500, 32, 'upcoming', 9900, 16900,
  'The biggest LEVELS event of the year. Qualifying heats, live scoring, and the APEX Registry reveal. The Grand Prix format, amplified.'
),
(
  'LEVELS Wellington — Autumn Classic',
  '2026-04-25 20:00:00+00',
  'Wellington',
  'TSB Arena',
  'Queens Wharf, Wellington',
  250, 201, 'upcoming', 8900, 14900,
  'Wellington''s first major LEVELS event. The TSB Arena provides the perfect urban backdrop for five levels of athletic achievement.'
),
(
  'LEVELS Wellington — Winter Push',
  '2026-08-07 20:00:00+00',
  'Wellington',
  'TSB Arena',
  'Queens Wharf, Wellington',
  250, 68, 'upcoming', 8900, 14900,
  'Push through the Wellington winter with the city''s most driven fitness community. Limited heats. Full five-level format.'
),
(
  'LEVELS Christchurch — Foundation Event',
  '2026-05-09 20:00:00+00',
  'Christchurch',
  'Christchurch Arena',
  '55 Jack Hinton Drive, Addington',
  200, 156, 'upcoming', 8900, 14900,
  'LEVELS lands in the South Island. Christchurch''s athletic community comes together for the first-ever LEVELS Christchurch event. All levels welcome.'
),
(
  'LEVELS Christchurch — Spring Series',
  '2026-10-16 19:00:00+00',
  'Christchurch',
  'Christchurch Arena',
  '55 Jack Hinton Drive, Addington',
  300, 18, 'upcoming', 9900, 16900,
  'Celebrate the spring season with LEVELS'' biggest South Island event. Five levels, three hundred athletes, one unforgettable day.'
);

-- ── SEED: PRODUCTS — BACKPACKS ───────────────────

INSERT INTO products (name, description, category, level_association, price, colour_hex, featured) VALUES
(
  'LEVELS Ruck 20L',
  'The everyday training backpack. 500D nylon, padded laptop sleeve, external hydration access, and the LEVELS logo in contrast stitching. Built for the athlete who is always preparing.',
  'backpack', NULL, 16900, '#252530', true
),
(
  'LEVELS Ruck 30L Elite',
  'Built for the Elite athlete. Extra volume for event day gear, integrated sled-pull handle, reinforced base, and crimson accent hardware throughout.',
  'backpack', 4, 21900, '#E63946', false
),
(
  'LEVELS Apex Pack 35L',
  'The ultimate LEVELS carry. Reserved for Level 5 completers. Purple titanium zips, Apex embroidery, moisture-wicking back panel, and a lifetime warranty. Proof you reached the summit.',
  'backpack', 5, 28900, '#8338EC', false
);

-- ── SEED: PRODUCTS — PATCHES ─────────────────────

INSERT INTO products (name, description, category, level_association, price, colour_hex) VALUES
('Foundation Patch — Level 01', 'Woven iron-on patch. Your first mark. Teal on black. 7cm × 7cm.', 'patch', 1, 1490, '#2EC4B6'),
('Build Patch — Level 02', 'Woven iron-on patch. The builder''s mark. Steel blue on black. 7cm × 7cm.', 'patch', 2, 1490, '#457B9D'),
('Surge Patch — Level 03', 'Woven iron-on patch. The surge begins. Amber gold on black. 7cm × 7cm.', 'patch', 3, 1490, '#FFB703'),
('Elite Patch — Level 04', 'Woven iron-on patch. Elite status. Crimson on black. 7cm × 7cm.', 'patch', 4, 1490, '#E63946'),
('Apex Patch — Level 05', 'Woven iron-on patch. The summit. Royal purple on black. 7cm × 7cm. Only for those who''ve reached the top.', 'patch', 5, 1490, '#8338EC');

-- ── SEED: PRODUCTS — CLOTHING ────────────────────

INSERT INTO products (name, description, category, level_association, price, size_options, colour_hex, featured) VALUES
(
  'Foundation Tee — Level 01',
  'Lightweight technical tee in Foundation Teal. Moisture-wicking fabric, dropped hem, LEVELS 01 embroidery on chest.',
  'clothing', 1, 5900, ARRAY['XS','S','M','L','XL','XXL'], '#2EC4B6', false
),
(
  'Build Tee — Level 02',
  'Steel Blue technical tee. Premium 200gsm pique fabric. LEVELS 02 BUILD printed across the back.',
  'clothing', 2, 5900, ARRAY['XS','S','M','L','XL','XXL'], '#457B9D', false
),
(
  'Surge Hoodie — Level 03',
  'Amber gold midlayer hoodie. Heavyweight 400gsm French terry. SURGE printed in tonal letters across the chest.',
  'clothing', 3, 11900, ARRAY['XS','S','M','L','XL','XXL'], '#FFB703', true
),
(
  'Elite Performance Tee — Level 04',
  'Crimson red competition-grade tee. Ultra-light 140gsm performance fabric. LEVELS 04 ELITE on chest, station PRs on the back.',
  'clothing', 4, 7900, ARRAY['XS','S','M','L','XL','XXL'], '#E63946', true
),
(
  'Apex Hoodie — Level 05',
  'Royal purple heavyweight hoodie. Brushed inner fleece, embroidered APEX crown logo, Level 5 achievement date tag inside the collar. Limited availability.',
  'clothing', 5, 14900, ARRAY['XS','S','M','L','XL','XXL'], '#8338EC', false
),
(
  'LEVELS Core Shorts',
  'Technical training shorts for every level. 4-way stretch fabric, built-in liner, zip pocket, 7-inch inseam. Void Black.',
  'clothing', NULL, 6900, ARRAY['XS','S','M','L','XL','XXL'], '#252530', false
),
(
  'LEVELS Event Singlet',
  'The official LEVELS competition singlet. Ultra-light 120gsm. Worn by thousands of athletes across all five levels.',
  'clothing', NULL, 4900, ARRAY['XS','S','M','L','XL','XXL'], '#E63946', false
);

-- ── SEED: PRODUCTS — FOOTWEAR ────────────────────

INSERT INTO products (name, description, category, level_association, price, size_options, colour_hex, featured) VALUES
(
  'LEVELS Training Shoe',
  'The everyday training shoe built for the LEVELS athlete. Wide toe box, zero-drop heel, reinforced lateral support for sled movements.',
  'footwear', NULL, 18900, ARRAY['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13'], '#252530', true
),
(
  'LEVELS Ruck Boot',
  'When your training goes outside. Waterproof upper, Vibram outsole, ankle support, and the LEVELS logo in reflective print.',
  'footwear', NULL, 22900, ARRAY['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13'], '#3A3A4A', false
),
(
  'LEVELS Apex Performance Trainer',
  'Purple colourway. Carbon fibre shank, race-last construction, explosive response foam. Only available to Apex completers.',
  'footwear', 5, 25900, ARRAY['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13'], '#8338EC', false
);

-- ── SEED: RECOVERY LOUNGE PRODUCTS ───────────────

INSERT INTO recovery_lounge_products (name, sponsor_brand, description, retail_value, category, tagline) VALUES
(
  'AG1 — 30 Serving Travel Pack',
  'Athletic Greens',
  'The all-in-one daily nutritional supplement. 75 vitamins, minerals, and whole-food sourced nutrients in one daily serving. Complimentary 30-serving travel pack for all Apex completers.',
  17999, 'nutrition', 'Your daily nutritional foundation'
),
(
  'Normatec 3 Legs',
  'Hyperice',
  'Sequential pulse technology for full leg recovery. Used by elite athletes worldwide. 30-minute post-event session included for all Apex completers in the Recovery Lounge.',
  89900, 'recovery', 'Elite recovery, engineered for the few'
),
(
  'WHOOP 5.0 — 3 Month Membership',
  'WHOOP',
  'The wearable that tracks strain, recovery, and sleep 24/7. Know exactly when you''re ready to go again. 3 months complimentary for Apex athletes.',
  9900, 'tech', 'Track the metrics that matter'
),
(
  'Grass-Fed Whey Protein — 30 Serves',
  'Momentous',
  'NSF Certified for Sport. Informed Sport tested. The protein supplement trusted by professional athletes. Chocolate or vanilla. 30-serve bag complimentary.',
  13900, 'nutrition', 'The cleanest protein on the market'
),
(
  'Theragun Mini 2.0',
  'Therabody',
  'The go-anywhere percussive therapy device. Three speeds, 12mm amplitude, whisper-quiet. LEVELS branded carry case included.',
  29900, 'recovery', 'Recovery in your pocket'
),
(
  'LEVELS × Apex Bomber Jacket',
  'LEVELS',
  'Matte black satin shell, purple inner lining with Apex map print, embroidered crown on chest. One per Apex completer. This does not go on sale.',
  29900, 'apparel', 'You can''t buy this. You have to earn it.'
),
(
  'Vital Greens Daily Bundle',
  'Good Health NZ',
  'New Zealand''s best-selling greens powder. Gut health, immunity, and energy in one serve. 30-day supply. Sourced and made in New Zealand.',
  6900, 'wellness', 'NZ-made. Athlete-approved.'
),
(
  'Recovery Sleep Patches — 30 Pack',
  'Patch NZ',
  'Transdermal magnesium and melatonin patches. Wear overnight, wake recovered. Your body needs this after Level 5.',
  5500, 'wellness', 'Sleep like you earned it'
);
