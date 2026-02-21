-- ============================================================
-- LEVELS WEBSITE — SEED DATA
-- Run AFTER schema.sql in: Supabase Dashboard → SQL Editor → New query
-- ============================================================


-- ── 1. EVENTS (7 total) ───────────────────────────────────────
-- Prices in NZD cents: standard $89 = 8900, VIP $149 = 14900

INSERT INTO public.events (title, date, city, venue, address, capacity, registered_count, status, price_standard, price_vip, description) VALUES

-- Auckland (3)
(
  'LEVELS Auckland — Round 1',
  '2026-03-15 09:00:00+13',
  'Auckland',
  'Les Mills Auckland',
  '12 Mayoral Drive, Auckland CBD, Auckland 1010',
  200, 47, 'upcoming', 8900, 14900,
  'Kick off the 2026 season at Les Mills Auckland. All five levels run simultaneously across dedicated stations. Open to all fitness levels — your performance determines your tier.'
),
(
  'LEVELS Auckland — Round 2',
  '2026-06-21 09:00:00+12',
  'Auckland',
  'Spark Arena Surrounds',
  'Mahuhu Crescent, Auckland CBD, Auckland 1010',
  300, 12, 'upcoming', 8900, 14900,
  'Mid-season clash at the iconic Spark Arena precinct. Outdoor multi-station format with a roaring crowd. One of the biggest LEVELS events in the NZ calendar.'
),
(
  'LEVELS Auckland — Round 3',
  '2026-09-13 09:00:00+12',
  'Auckland',
  'Les Mills Auckland',
  '12 Mayoral Drive, Auckland CBD, Auckland 1010',
  200, 0, 'upcoming', 8900, 14900,
  'Season finale for Auckland. Points locked in — this is your last chance to hit the level you have been chasing all year. Full five-level format, maximum intensity.'
),

-- Wellington (2)
(
  'LEVELS Wellington — Round 1',
  '2026-04-26 09:00:00+12',
  'Wellington',
  'TSB Arena',
  'Queens Wharf, 1 Jervois Quay, Wellington 6011',
  250, 88, 'upcoming', 8900, 14900,
  'Wellington''s first LEVELS event of 2026. The TSB Arena waterfront setting sets the scene for an electric morning of competition. All levels, one arena.'
),
(
  'LEVELS Wellington — Round 2',
  '2026-08-08 09:00:00+12',
  'Wellington',
  'TSB Arena',
  'Queens Wharf, 1 Jervois Quay, Wellington 6011',
  250, 0, 'upcoming', 8900, 14900,
  'Wellington returns for round two — and the competition is fierce. With the season leaderboard taking shape, every rep counts. Five levels, one unforgettable morning.'
),

-- Christchurch (2)
(
  'LEVELS Christchurch — Round 1',
  '2026-05-10 09:00:00+12',
  'Christchurch',
  'Christchurch Arena',
  '55 Jack Hinton Drive, Addington, Christchurch 8024',
  300, 134, 'upcoming', 8900, 14900,
  'The South Island''s premier LEVELS event. Christchurch Arena provides the perfect backdrop for a full five-level competition. Join hundreds of athletes from across Canterbury.'
),
(
  'LEVELS Christchurch — Round 2',
  '2026-10-17 09:00:00+13',
  'Christchurch',
  'Christchurch Arena',
  '55 Jack Hinton Drive, Addington, Christchurch 8024',
  300, 0, 'upcoming', 8900, 14900,
  'Season closer for the South Island. The final event of the 2026 LEVELS season — go out swinging. All five levels in full force at Christchurch Arena.'
);


-- ── 2. PRODUCTS (18 total) ────────────────────────────────────
-- Prices in NZD cents. level_association: NULL = general, 1–5 = level-specific

INSERT INTO public.products (name, description, category, level_association, price, in_stock, stock_count, size_options, colour_hex, featured, image_url) VALUES

-- BACKPACKS (3)
(
  'LEVELS Ruck 20L',
  'The everyday training pack. Built for the gym, the commute, and everything between. 20L capacity with padded laptop sleeve, external molle webbing, and the LEVELS wordmark embossed in matte black.',
  'backpack', NULL, 18900, true, 80, NULL, '#1A1A2E', true,
  '/images/products/ruck-20l.jpg'
),
(
  'LEVELS Ruck 30L Elite',
  'For athletes who carry more — gear, ambition, and expectations. The Elite 30L features a reinforced base, hip-transfer carry system, and dual hydration ports. Level 04 crimson hardware details.',
  'backpack', 4, 24900, true, 45, NULL, '#E63946', true,
  '/images/products/ruck-30l-elite.jpg'
),
(
  'LEVELS Apex Pack 35L',
  'Reserved for those who have reached the top. The Apex Pack 35L is LEVELS'' most premium bag — full-grain leather base, magnetic buckle closure, and a royal purple interior lining. Level 05 only.',
  'backpack', 5, 34900, true, 20, NULL, '#8338EC', true,
  '/images/products/apex-pack-35l.jpg'
),

-- PATCHES (5, one per level)
(
  'Foundation Patch — Level 01',
  'Woven iron-on patch marking your entry into LEVELS. Teal on black. 8cm x 8cm. Sew or iron onto your kit to show you showed up.',
  'patch', 1, 1500, true, 200, NULL, '#2EC4B6', false,
  '/images/products/patch-l1-foundation.jpg'
),
(
  'Build Patch — Level 02',
  'Steel blue woven patch for those building momentum. 8cm x 8cm. Earned, not bought — but available for those who have competed at Level 02 or above.',
  'patch', 2, 1500, true, 200, NULL, '#457B9D', false,
  '/images/products/patch-l2-build.jpg'
),
(
  'Surge Patch — Level 03',
  'Amber fire. The surge point. 8cm x 8cm woven patch for competitors who have broken through to Level 03. The colour that turns heads.',
  'patch', 3, 1500, true, 150, NULL, '#FFB703', false,
  '/images/products/patch-l3-surge.jpg'
),
(
  'Elite Patch — Level 04',
  'Crimson. Only the serious carry this one. 8cm x 8cm precision-woven Level 04 patch. You earned the right to wear it.',
  'patch', 4, 1500, true, 100, NULL, '#E63946', false,
  '/images/products/patch-l4-elite.jpg'
),
(
  'Apex Patch — Level 05',
  'Royal purple. Ultra-rare. The APEX patch is the rarest wearable in LEVELS. 8cm x 8cm. If you''re buying this, you know what it means.',
  'patch', 5, 2500, true, 30, NULL, '#8338EC', false,
  '/images/products/patch-l5-apex.jpg'
),

-- CLOTHING (7)
(
  'Foundation Tee — Level 01',
  'Relaxed-fit training tee in Foundation Teal. 100% combed cotton. LEVELS wordmark on chest, Level 01 badge on sleeve. The starting point.',
  'clothing', 1, 5900, true, 120, ARRAY['XS','S','M','L','XL','XXL'], '#2EC4B6', false,
  '/images/products/foundation-tee.jpg'
),
(
  'Build Tee — Level 02',
  'Performance-cut training tee in Steel Blue. Moisture-wicking jersey knit. Level 02 badge detail on left chest. Wear what you are working towards.',
  'clothing', 2, 5900, true, 100, ARRAY['XS','S','M','L','XL','XXL'], '#457B9D', false,
  '/images/products/build-tee.jpg'
),
(
  'Surge Hoodie — Level 03',
  'Midweight pullover in Amber Surge colourway. Kangaroo pocket, ribbed cuffs, LEVELS back print. This is where things start to heat up.',
  'clothing', 3, 8900, true, 80, ARRAY['XS','S','M','L','XL','XXL'], '#FFB703', false,
  '/images/products/surge-hoodie.jpg'
),
(
  'Elite Performance Tee — Level 04',
  'Technical performance tee built for high-output training. Crimson colourway, four-way stretch fabric, laser-cut ventilation panels. Level 04 badge embossed on right sleeve.',
  'clothing', 4, 7900, true, 60, ARRAY['XS','S','M','L','XL','XXL'], '#E63946', false,
  '/images/products/elite-performance-tee.jpg'
),
(
  'Apex Hoodie — Level 05',
  'The flagship LEVELS garment. Royal Purple heavyweight fleece, gold-tipped drawcord, interior satin lining. APEX logo embroidered — not printed. For the rare ones.',
  'clothing', 5, 14900, true, 25, ARRAY['XS','S','M','L','XL','XXL'], '#8338EC', true,
  '/images/products/apex-hoodie.jpg'
),
(
  'LEVELS Core Shorts',
  '5" training shorts in LEVELS signature black. Quick-dry shell, internal compression liner, zip side pocket. Pairs with any level kit. Built to move.',
  'clothing', NULL, 6900, true, 150, ARRAY['XS','S','M','L','XL','XXL'], '#1A1A2E', false,
  '/images/products/core-shorts.jpg'
),
(
  'LEVELS Event Singlet',
  'Official LEVELS event singlet — the one you see on the floor. Performance mesh, LEVELS logo front, your level badge placement on back. Available post-event or early purchase.',
  'clothing', NULL, 4900, true, 200, ARRAY['XS','S','M','L','XL','XXL'], '#FFFFFF', false,
  '/images/products/event-singlet.jpg'
),

-- FOOTWEAR (3)
(
  'LEVELS Training Shoe',
  'All-purpose cross-training shoe designed for the LEVELS format. Wide toe box, zero-drop heel, grippy rubber outsole for ruck and run transitions. Matte black with LEVELS logo.',
  'footwear', NULL, 18900, true, 60, ARRAY['7','8','9','10','11','12','13'], '#1A1A2E', false,
  '/images/products/training-shoe.jpg'
),
(
  'LEVELS Ruck Boot',
  'Low-profile tactical boot built for rucking events. Ankle support, reinforced toe cap, moisture-wicking liner. The serious athlete''s choice for long-distance formats.',
  'footwear', NULL, 22900, true, 40, ARRAY['7','8','9','10','11','12','13'], '#2D2D2D', false,
  '/images/products/ruck-boot.jpg'
),
(
  'LEVELS Apex Performance Trainer',
  'The most technically advanced shoe in the LEVELS lineup. Carbon fibre shank, energy-return foam, purple and gold colourway. Built for athletes competing at Levels 04–05.',
  'footwear', 5, 28900, true, 20, ARRAY['7','8','9','10','11','12','13'], '#8338EC', true,
  '/images/products/apex-trainer.jpg'
);


-- ── 3. RECOVERY LOUNGE PRODUCTS (8 total) ─────────────────────
-- Premium sponsor products for Level 05 APEX members

INSERT INTO public.recovery_lounge_products (name, sponsor_brand, description, retail_value, category, is_available, tagline) VALUES

(
  'Collagen Recover Pro — 30 Serve',
  'Momentous',
  'Clinical-grade collagen peptides formulated for connective tissue recovery. 10g collagen per serve, with vitamin C and hyaluronic acid. Used by elite athletes worldwide.',
  8500, 'nutrition', true,
  'Rebuild from the inside out.'
),
(
  'AG1 Greens — Monthly Supply',
  'Athletic Greens',
  'The gold standard in daily foundational nutrition. 75 vitamins, minerals and whole-food sourced nutrients in one daily serve. Complimentary for APEX members for one full month.',
  18900, 'nutrition', true,
  'One habit. Total coverage.'
),
(
  'Whoop 4.0 — 6 Month Membership',
  'Whoop',
  'The most sophisticated fitness wearable on the market. Continuous HRV, sleep staging, recovery scoring, and strain tracking — no screen, just signal. Six months free for APEX members.',
  18000, 'tech', true,
  'Know your body. Master your performance.'
),
(
  'Theragun PRO — Full Massage Gun',
  'Therabody',
  'Professional-grade percussive therapy device. 6 attachments, 5 speeds, Bluetooth-enabled with smart app integration. Used in professional sports franchises globally.',
  74900, 'recovery', true,
  'Deep tissue relief, anywhere.'
),
(
  'Hyperice Normatec 3 — Leg Sleeves',
  'Hyperice',
  'Pneumatic compression system for accelerated lower-body recovery. Used by Olympic athletes, NBA teams, and the world''s top performers. Promotes circulation and reduces soreness.',
  119900, 'recovery', true,
  'Recover like a pro.'
),
(
  'Infrared Sauna Session — 3 Pack',
  'Clearlight Saunas',
  'Three complimentary 45-minute infrared sauna sessions at a partnered Clearlight facility. Infrared therapy promotes deep muscle recovery, detoxification, and stress reduction.',
  15000, 'wellness', true,
  'Heat. Release. Reset.'
),
(
  'Momentous Omega-3 — 90 Day Supply',
  'Momentous',
  'Ultra-pure fish oil sourced from wild Alaskan salmon. 2g EPA+DHA per serve. Third-party tested, NSF certified. 90-day supply to keep inflammation in check through your season.',
  7500, 'nutrition', true,
  'The foundation of every recovery protocol.'
),
(
  'LEVELS x Apex Co. Recovery Kit',
  'Apex Co.',
  'A curated recovery package exclusive to LEVELS APEX members. Includes magnesium spray, CBD muscle balm, sleep support capsules, and a premium foam roller. The complete recovery arsenal.',
  12900, 'wellness', true,
  'Everything you need. Nothing you don''t.'
);
