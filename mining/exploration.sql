-- ----------------------------------------------
-- Content

-- get post types by count
SELECT
  count(*) cnt,
  posts.post_type
from mwp_posts posts
where post_status = 'publish'
group by post_type
order by cnt DESC;

-- get published content by post type
SELECT
  posts.post_type,
  posts.post_status,
  posts.*
from mwp_posts posts
where post_status = 'publish'
      and post_type = 'post';

-- ----------------------------------------------
-- Forum Topics

-- get top-level forum
SELECT posts.*
from mwp_posts posts
WHERE posts.post_type = 'forum'
      and posts.post_parent = 0;
-- get next-level forums (68636 = mauticamps)
SELECT posts.*
from mwp_posts posts
WHERE posts.post_parent = 68636 and posts.post_type = 'forum';
-- get next-level topics
SELECT posts.*
from mwp_posts posts
WHERE posts.post_parent = 68636 and posts.post_type = 'topic';

-- get topic replies, in sequence. 103181 = https://www.mautic.org/topic/mautic-v3-design-discussion/
SELECT posts.*
from mwp_posts posts
WHERE posts.post_parent = 103181
      AND post_type = 'reply'
ORDER BY posts.post_date ASC;

SELECT * from mwp_posts where post_name = 'please-devs-take-note';
SELECT * from mwp_posts where post_parent = 104242;

SELECT posts.*
from mwp_posts posts
      WHERE post_type = 'reply'
      AND post_parent = 0
ORDER BY posts.post_date ASC;

-- get post meta by id
SELECT meta.*
from mwp_posts posts
  LEFT JOIN mwp_postmeta meta ON meta.post_id = posts.ID
where posts.ID = 74937;

SELECT * from mwp_posts where ID = 75214;
SELECT * from mwp_postmeta where post_id = 75214;
SELECT * from mwp_posts where ID = 358;

-- ----------------------------------------------
-- Users
-- #-- wordpress
SELECT * from mwp_users;
SELECT * from mwp_usermeta where user_id in (9466);

-- #-- october
INSERT INTO users (id, name, surname, email, password, is_activated, username, mtcorg_points, created_at, activated_at, updated_at)
VALUES (3, "mbabker", "", "michael.babker@mautic.org", "---", 1, "mbabker", 0, 2014-11-14 01:23:08, 2014-11-14 01:23:08, 2018-05-19 10:44:33);

-- ----------------------------------------------
-- Navigation

-- get nav menu terms
SELECT *
FROM mwp_terms AS t
  LEFT JOIN mwp_term_taxonomy AS tt ON tt.term_id = t.term_id
WHERE tt.taxonomy = 'nav_menu';

-- get all nav items
SELECT *
FROM mwp_posts
WHERE post_type = 'nav_menu_item';

-- get nav items by menu id
SELECT p.*
FROM mwp_posts AS p
  LEFT JOIN mwp_term_relationships AS tr ON tr.object_id = p.ID
  LEFT JOIN mwp_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
WHERE p.post_type = 'nav_menu_item'
      AND tt.term_id = 78
ORDER BY p.menu_order ASC;


SELECT meta.*
from mwp_posts posts
  LEFT JOIN mwp_postmeta meta ON meta.post_id = posts.ID
where posts.ID = 257;

SELECT meta.*
from mwp_posts posts
  LEFT JOIN mwp_postmeta meta ON meta.post_id = posts.ID
where posts.ID = 3419;