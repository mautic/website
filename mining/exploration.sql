# ----------------------------------------------
# Content

# get post types by count
SELECT
  count(*) cnt,
  posts.post_type
from mwp_posts posts
where post_status = 'publish'
group by post_type
order by cnt DESC;

# get published content by post type
SELECT
  posts.post_type,
  posts.post_status,
  posts.*
from mwp_posts posts
where post_status = 'publish'
      and post_type = 'post';

# get post by id
SELECT posts.*
from mwp_posts posts
where posts.ID = 450;

# get post meta by id
SELECT meta.*
from mwp_posts posts
  LEFT JOIN mwp_postmeta meta ON meta.post_id = posts.ID
where posts.ID = 3417;

# ----------------------------------------------
# Navigation

# get nav menu terms
SELECT *
FROM mwp_terms AS t
  LEFT JOIN mwp_term_taxonomy AS tt ON tt.term_id = t.term_id
WHERE tt.taxonomy = 'nav_menu';

# get all nav items
SELECT *
FROM mwp_posts
WHERE post_type = 'nav_menu_item';

# get nav items by menu id
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