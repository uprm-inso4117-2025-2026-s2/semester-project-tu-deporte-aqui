-- =============================================================
-- TEAM 2 — SUPABASE DEMO / SEED DATA
-- Purpose : Fictional placeholder records for testing only.
--           NOT production data.
-- Run in  : Supabase Dashboard → SQL Editor
-- Note    : profiles.id normally references auth.users(id).
--           The FK is temporarily dropped here to allow demo
--           inserts without real auth users. Re-add it once
--           real auth users are in place.
-- =============================================================


-- -------------------------------------------------------------
-- PRE-STEP: Drop profiles FK so we can insert without auth users
-- -------------------------------------------------------------
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;


-- -------------------------------------------------------------
-- 1. TEAMS (5 mock teams)
--    UUID prefix: a100...
-- -------------------------------------------------------------
INSERT INTO public.teams (id, name, league, city, logo_url) VALUES
  ('a1000001-0000-0000-0000-000000000001', 'River Hawks',  'Basketball League', 'Austin',   NULL),
  ('a1000001-0000-0000-0000-000000000002', 'Iron Wolves',  'Football League',   'Denver',   NULL),
  ('a1000001-0000-0000-0000-000000000003', 'Storm United', 'Soccer League',     'Portland', NULL),
  ('a1000001-0000-0000-0000-000000000004', 'Peak Falcons', 'Baseball League',   'Seattle',  NULL),
  ('a1000001-0000-0000-0000-000000000005', 'Bay Titans',   'Basketball League', 'Miami',    NULL);


-- -------------------------------------------------------------
-- 2. ATHLETES (10 mock athletes linked to teams)
--    UUID prefix: b100...
-- -------------------------------------------------------------
INSERT INTO public.athletes (id, team_id, first_name, last_name, position, number) VALUES
  ('b1000001-0000-0000-0000-000000000001', 'a1000001-0000-0000-0000-000000000001', 'Marcus',   'Bell',   'Guard',       3),
  ('b1000001-0000-0000-0000-000000000002', 'a1000001-0000-0000-0000-000000000001', 'Jordan',   'Hayes',  'Forward',     21),
  ('b1000001-0000-0000-0000-000000000003', 'a1000001-0000-0000-0000-000000000002', 'Carlos',   'Reyes',  'Quarterback', 7),
  ('b1000001-0000-0000-0000-000000000004', 'a1000001-0000-0000-0000-000000000002', 'Devon',    'Marsh',  'Linebacker',  55),
  ('b1000001-0000-0000-0000-000000000005', 'a1000001-0000-0000-0000-000000000003', 'Lena',     'Ortega', 'Midfielder',  10),
  ('b1000001-0000-0000-0000-000000000006', 'a1000001-0000-0000-0000-000000000003', 'Paulo',    'Silva',  'Defender',    4),
  ('b1000001-0000-0000-0000-000000000007', 'a1000001-0000-0000-0000-000000000004', 'Chris',    'Nolan',  'Pitcher',     18),
  ('b1000001-0000-0000-0000-000000000008', 'a1000001-0000-0000-0000-000000000004', 'Amy',      'Grant',  'Catcher',     2),
  ('b1000001-0000-0000-0000-000000000009', 'a1000001-0000-0000-0000-000000000005', 'Terrence', 'Wade',   'Center',      0),
  ('b1000001-0000-0000-0000-000000000010', 'a1000001-0000-0000-0000-000000000005', 'Sofia',    'Mendez', 'Guard',       11);


-- -------------------------------------------------------------
-- 3. GAMES (5 mock games linked to teams)
--    UUID prefix: c100...
-- -------------------------------------------------------------
INSERT INTO public.games (id, home_team_id, away_team_id, league, season, game_date, start_time, venue, status, home_score, away_score) VALUES
  ('c1000001-0000-0000-0000-000000000001',
    'a1000001-0000-0000-0000-000000000001',
    'a1000001-0000-0000-0000-000000000005',
    'Basketball League', '2025-2026', '2026-01-10', '19:00', 'Austin Arena',   'final',     98,   85),

  ('c1000001-0000-0000-0000-000000000002',
    'a1000001-0000-0000-0000-000000000002',
    'a1000001-0000-0000-0000-000000000003',
    'Football League',   '2025-2026', '2026-01-17', '18:00', 'Denver Stadium', 'final',     27,   14),

  ('c1000001-0000-0000-0000-000000000003',
    'a1000001-0000-0000-0000-000000000003',
    'a1000001-0000-0000-0000-000000000004',
    'Soccer League',     '2025-2026', '2026-01-24', '20:00', 'Portland Park',  'final',     2,    1),

  ('c1000001-0000-0000-0000-000000000004',
    'a1000001-0000-0000-0000-000000000004',
    'a1000001-0000-0000-0000-000000000002',
    'Baseball League',   '2025-2026', '2026-02-01', '14:00', 'Seattle Field',  'final',     5,    3),

  ('c1000001-0000-0000-0000-000000000005',
    'a1000001-0000-0000-0000-000000000005',
    'a1000001-0000-0000-0000-000000000001',
    'Basketball League', '2025-2026', '2026-02-10', '19:30', 'Miami Center',   'scheduled', NULL, NULL);


-- -------------------------------------------------------------
-- 4. STANDINGS (3 mock standings linked to teams)
--    UUID prefix: d100...
-- -------------------------------------------------------------
INSERT INTO public.standings (id, team_id, league, season, wins, losses) VALUES
  ('d1000001-0000-0000-0000-000000000001', 'a1000001-0000-0000-0000-000000000001', 'Basketball League', '2025-2026', 8, 2),
  ('d1000001-0000-0000-0000-000000000002', 'a1000001-0000-0000-0000-000000000005', 'Basketball League', '2025-2026', 5, 5),
  ('d1000001-0000-0000-0000-000000000003', 'a1000001-0000-0000-0000-000000000002', 'Football League',   '2025-2026', 6, 3);


-- -------------------------------------------------------------
-- 5. NEWS (5 mock articles linked to teams, athletes, games)
--    UUID prefix: e100...
-- -------------------------------------------------------------
INSERT INTO public.news (id, team_id, athlete_id, game_id, league, title, content, source, source_url, published_at) VALUES
  ('e1000001-0000-0000-0000-000000000001',
    'a1000001-0000-0000-0000-000000000001',
    'b1000001-0000-0000-0000-000000000001',
    'c1000001-0000-0000-0000-000000000001',
    'Basketball League',
    'River Hawks Win Season Opener',
    'The River Hawks kicked off their season with a strong 98-85 victory over the Bay Titans. Marcus Bell led the team with 28 points.',
    'Demo News', NULL, '2026-01-11 08:00:00+00'),

  ('e1000001-0000-0000-0000-000000000002',
    'a1000001-0000-0000-0000-000000000002',
    'b1000001-0000-0000-0000-000000000003',
    'c1000001-0000-0000-0000-000000000002',
    'Football League',
    'Iron Wolves Dominate Storm United',
    'Carlos Reyes threw for 3 touchdowns as the Iron Wolves defeated Storm United 27-14 in a commanding performance.',
    'Demo News', NULL, '2026-01-18 09:00:00+00'),

  ('e1000001-0000-0000-0000-000000000003',
    'a1000001-0000-0000-0000-000000000003',
    'b1000001-0000-0000-0000-000000000005',
    'c1000001-0000-0000-0000-000000000003',
    'Soccer League',
    'Storm United Edge Past Peak Falcons',
    'Lena Ortega scored the decisive goal in the 78th minute to give Storm United a narrow 2-1 win over Peak Falcons.',
    'Demo News', NULL, '2026-01-25 10:00:00+00'),

  ('e1000001-0000-0000-0000-000000000004',
    'a1000001-0000-0000-0000-000000000004',
    'b1000001-0000-0000-0000-000000000007',
    'c1000001-0000-0000-0000-000000000004',
    'Baseball League',
    'Peak Falcons Take Series Opener',
    'Chris Nolan pitched 7 scoreless innings to lead the Peak Falcons to a 5-3 victory over the Iron Wolves.',
    'Demo News', NULL, '2026-02-02 11:00:00+00'),

  ('e1000001-0000-0000-0000-000000000005',
    'a1000001-0000-0000-0000-000000000005',
    NULL, NULL,
    'Basketball League',
    'Bay Titans Prepare for Rematch Against River Hawks',
    'The Bay Titans are gearing up for their upcoming rematch against the River Hawks scheduled for February 10th.',
    'Demo News', NULL, '2026-02-05 08:00:00+00');


-- -------------------------------------------------------------
-- 6. PROFILES (5 mock profiles — FK to auth.users removed above)
--    UUID prefix: f100...
-- -------------------------------------------------------------
INSERT INTO public.profiles (id, display_name, avatar_url) VALUES
  ('f1000001-0000-0000-0000-000000000001', 'Alex Demo',   NULL),
  ('f1000001-0000-0000-0000-000000000002', 'Sam Demo',    NULL),
  ('f1000001-0000-0000-0000-000000000003', 'Jordan Demo', NULL),
  ('f1000001-0000-0000-0000-000000000004', 'Taylor Demo', NULL),
  ('f1000001-0000-0000-0000-000000000005', 'Morgan Demo', NULL);


-- -------------------------------------------------------------
-- 7. COMMENTS (10 mock comments linked to news and profiles)
--    UUID prefix: f200... (f is valid hex)
-- -------------------------------------------------------------
INSERT INTO public.comments (id, user_id, news_id, content, published_at) VALUES
  ('f2000001-0000-0000-0000-000000000001', 'f1000001-0000-0000-0000-000000000001', 'e1000001-0000-0000-0000-000000000001', 'Great game by the Hawks!',                    '2026-01-11 09:00:00+00'),
  ('f2000001-0000-0000-0000-000000000002', 'f1000001-0000-0000-0000-000000000002', 'e1000001-0000-0000-0000-000000000001', 'Marcus Bell was incredible last night.',       '2026-01-11 09:30:00+00'),
  ('f2000001-0000-0000-0000-000000000003', 'f1000001-0000-0000-0000-000000000003', 'e1000001-0000-0000-0000-000000000002', 'Iron Wolves looking strong this season.',      '2026-01-18 10:00:00+00'),
  ('f2000001-0000-0000-0000-000000000004', 'f1000001-0000-0000-0000-000000000004', 'e1000001-0000-0000-0000-000000000002', 'Reyes is having a phenomenal year.',           '2026-01-18 11:00:00+00'),
  ('f2000001-0000-0000-0000-000000000005', 'f1000001-0000-0000-0000-000000000005', 'e1000001-0000-0000-0000-000000000003', 'Ortega saved the day again!',                  '2026-01-25 12:00:00+00'),
  ('f2000001-0000-0000-0000-000000000006', 'f1000001-0000-0000-0000-000000000001', 'e1000001-0000-0000-0000-000000000003', 'Storm United is on fire this season.',         '2026-01-25 13:00:00+00'),
  ('f2000001-0000-0000-0000-000000000007', 'f1000001-0000-0000-0000-000000000002', 'e1000001-0000-0000-0000-000000000004', 'Nolan is the best pitcher in the league.',     '2026-02-02 12:00:00+00'),
  ('f2000001-0000-0000-0000-000000000008', 'f1000001-0000-0000-0000-000000000003', 'e1000001-0000-0000-0000-000000000004', 'Peak Falcons are peaking at the right time.',  '2026-02-02 13:00:00+00'),
  ('f2000001-0000-0000-0000-000000000009', 'f1000001-0000-0000-0000-000000000004', 'e1000001-0000-0000-0000-000000000005', 'Can the Titans get revenge?',                  '2026-02-05 09:00:00+00'),
  ('f2000001-0000-0000-0000-000000000010', 'f1000001-0000-0000-0000-000000000005', 'e1000001-0000-0000-0000-000000000005', 'This rematch is going to be intense.',          '2026-02-05 10:00:00+00');


-- =============================================================
-- QUICK VALIDATION — run after inserting to confirm row counts
-- Expected: teams=5, athletes=10, games=5, standings=3,
--           news=5, profiles=5, comments=10
-- =============================================================
SELECT 'teams'      AS table_name, COUNT(*) AS row_count FROM public.teams
UNION ALL
SELECT 'athletes',                 COUNT(*)               FROM public.athletes
UNION ALL
SELECT 'games',                    COUNT(*)               FROM public.games
UNION ALL
SELECT 'standings',                COUNT(*)               FROM public.standings
UNION ALL
SELECT 'news',                     COUNT(*)               FROM public.news
UNION ALL
SELECT 'profiles',                 COUNT(*)               FROM public.profiles
UNION ALL
SELECT 'comments',                 COUNT(*)               FROM public.comments;
