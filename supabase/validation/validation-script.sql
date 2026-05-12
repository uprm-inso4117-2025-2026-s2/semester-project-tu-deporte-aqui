-- =============================================================
-- TEAM 2 — SUPABASE VALIDATION SCRIPT
-- Purpose : Smoke test to verify schema correctness, foreign key
--           relationships, seed data presence, and frontend
--           read access for the core platform tables.
-- Run in  : Supabase Dashboard → SQL Editor
-- Reuse   : Can be re-run after any schema migration or reseed
--           to confirm nothing is broken.
-- =============================================================


-- -------------------------------------------------------------
-- SECTION 1: TABLE EXISTENCE
-- Confirms all required tables exist in the public schema.
-- Expected: 7 rows returned, one per table.
-- -------------------------------------------------------------
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'teams',
    'athletes',
    'games',
    'standings',
    'news',
    'profiles',
    'comments'
  )
ORDER BY table_name;


-- -------------------------------------------------------------
-- SECTION 2: PRIMARY KEY CHECK
-- Confirms each table has a primary key defined.
-- Expected: 7 rows returned, one per table.
-- -------------------------------------------------------------
SELECT
  tc.table_name,
  kcu.column_name AS primary_key_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
WHERE tc.constraint_type = 'PRIMARY KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN (
    'teams',
    'athletes',
    'games',
    'standings',
    'news',
    'profiles',
    'comments'
  )
ORDER BY tc.table_name;


-- -------------------------------------------------------------
-- SECTION 3: FOREIGN KEY RELATIONSHIP CHECK
-- Confirms all expected FK relationships exist in the schema.
-- Expected: one row per FK listed below.
-- -------------------------------------------------------------
SELECT
  tc.table_name        AS source_table,
  kcu.column_name      AS source_column,
  ccu.table_name       AS referenced_table,
  ccu.column_name      AS referenced_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN (
    'athletes',
    'games',
    'standings',
    'news',
    'comments',
    'profiles'
  )
ORDER BY tc.table_name, kcu.column_name;


-- -------------------------------------------------------------
-- SECTION 4: SEED DATA ROW COUNT CHECK
-- Confirms demo data is present in all core tables.
-- Expected: all row_count values should be greater than 0.
-- -------------------------------------------------------------
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


-- -------------------------------------------------------------
-- SECTION 5: JOIN CHECK — Athletes linked to Teams
-- Confirms athletes.team_id correctly references teams.id.
-- Expected: 10 rows, each showing athlete name + team name.
-- -------------------------------------------------------------
SELECT
  a.first_name || ' ' || a.last_name AS athlete_name,
  a.position,
  a.number,
  t.name   AS team_name,
  t.league AS team_league
FROM public.athletes a
INNER JOIN public.teams t ON a.team_id = t.id
ORDER BY t.name, a.last_name;


-- -------------------------------------------------------------
-- SECTION 6: JOIN CHECK — Games linked to Teams
-- Confirms both home_team_id and away_team_id reference teams.id.
-- Expected: 5 rows, each showing home team vs away team.
-- -------------------------------------------------------------
SELECT
  home.name  AS home_team,
  away.name  AS away_team,
  g.league,
  g.season,
  g.game_date,
  g.status,
  g.home_score,
  g.away_score
FROM public.games g
INNER JOIN public.teams home ON g.home_team_id = home.id
INNER JOIN public.teams away ON g.away_team_id = away.id
ORDER BY g.game_date;


-- -------------------------------------------------------------
-- SECTION 7: JOIN CHECK — News linked to Teams, Athletes, Games
-- Confirms news FK references are intact.
-- Expected: 5 rows with title, team, athlete, and game info.
-- -------------------------------------------------------------
SELECT
  n.title,
  n.league,
  n.published_at,
  t.name                                AS team_name,
  a.first_name || ' ' || a.last_name   AS athlete_name,
  g.game_date
FROM public.news n
LEFT JOIN public.teams   t ON n.team_id    = t.id
LEFT JOIN public.athletes a ON n.athlete_id = a.id
LEFT JOIN public.games    g ON n.game_id    = g.id
ORDER BY n.published_at;


-- -------------------------------------------------------------
-- SECTION 8: JOIN CHECK — Comments linked to News and Profiles
-- Confirms comments.news_id and comments.user_id are intact.
-- Expected: 10 rows showing commenter, article, and content.
-- -------------------------------------------------------------
SELECT
  p.display_name  AS commenter,
  n.title         AS news_article,
  c.content       AS comment,
  c.published_at
FROM public.comments c
INNER JOIN public.profiles p ON c.user_id  = p.id
INNER JOIN public.news     n ON c.news_id  = n.id
ORDER BY c.published_at;


-- -------------------------------------------------------------
-- SECTION 9: FRONTEND READ ACCESS CHECK
-- Simulates the queries a frontend team would run.
-- Expected: all queries return rows without permission errors.
-- -------------------------------------------------------------

-- Teams list (e.g. for a league standings page)
SELECT id, name, league, city
FROM public.teams
ORDER BY league, name;

-- Athletes roster for a specific team (River Hawks)
SELECT
  first_name || ' ' || last_name AS athlete_name,
  position,
  number
FROM public.athletes
WHERE team_id = 'a1000001-0000-0000-0000-000000000001'
ORDER BY number;

-- Upcoming and recent games
SELECT
  home.name  AS home_team,
  away.name  AS away_team,
  g.game_date,
  g.status,
  g.home_score,
  g.away_score
FROM public.games g
INNER JOIN public.teams home ON g.home_team_id = home.id
INNER JOIN public.teams away ON g.away_team_id = away.id
ORDER BY g.game_date DESC;

-- Latest news articles
SELECT id, title, league, source, published_at
FROM public.news
ORDER BY published_at DESC;

-- Standings table
SELECT
  t.name  AS team_name,
  s.league,
  s.season,
  s.wins,
  s.losses
FROM public.standings s
INNER JOIN public.teams t ON s.team_id = t.id
ORDER BY s.league, s.wins DESC;
