-- ============================================================
-- LEVELS WEBSITE — UPDATE PRODUCT IMAGE URLs
-- Run once in: Supabase Dashboard → SQL Editor → New query
-- Maps existing products to local images in /public/images/products/
-- ============================================================

UPDATE public.products SET image_url = '/images/products/ruck-20l.jpg'            WHERE name = 'LEVELS Ruck 20L';
UPDATE public.products SET image_url = '/images/products/ruck-30l-elite.jpg'       WHERE name = 'LEVELS Ruck 30L Elite';
UPDATE public.products SET image_url = '/images/products/apex-pack-35l.jpg'        WHERE name = 'LEVELS Apex Pack 35L';

UPDATE public.products SET image_url = '/images/products/patch-l1-foundation.jpg'  WHERE name = 'Foundation Patch — Level 01';
UPDATE public.products SET image_url = '/images/products/patch-l2-build.jpg'       WHERE name = 'Build Patch — Level 02';
UPDATE public.products SET image_url = '/images/products/patch-l3-surge.jpg'       WHERE name = 'Surge Patch — Level 03';
UPDATE public.products SET image_url = '/images/products/patch-l4-elite.jpg'       WHERE name = 'Elite Patch — Level 04';
UPDATE public.products SET image_url = '/images/products/patch-l5-apex.jpg'        WHERE name = 'Apex Patch — Level 05';

UPDATE public.products SET image_url = '/images/products/foundation-tee.jpg'       WHERE name = 'Foundation Tee — Level 01';
UPDATE public.products SET image_url = '/images/products/build-tee.jpg'            WHERE name = 'Build Tee — Level 02';
UPDATE public.products SET image_url = '/images/products/surge-hoodie.jpg'         WHERE name = 'Surge Hoodie — Level 03';
UPDATE public.products SET image_url = '/images/products/elite-performance-tee.jpg' WHERE name = 'Elite Performance Tee — Level 04';
UPDATE public.products SET image_url = '/images/products/apex-hoodie.jpg'          WHERE name = 'Apex Hoodie — Level 05';
UPDATE public.products SET image_url = '/images/products/core-shorts.jpg'          WHERE name = 'LEVELS Core Shorts';
UPDATE public.products SET image_url = '/images/products/event-singlet.jpg'        WHERE name = 'LEVELS Event Singlet';

UPDATE public.products SET image_url = '/images/products/training-shoe.jpg'        WHERE name = 'LEVELS Training Shoe';
UPDATE public.products SET image_url = '/images/products/ruck-boot.jpg'            WHERE name = 'LEVELS Ruck Boot';
UPDATE public.products SET image_url = '/images/products/apex-trainer.jpg'         WHERE name = 'LEVELS Apex Performance Trainer';
