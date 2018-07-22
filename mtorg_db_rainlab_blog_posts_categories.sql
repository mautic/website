CREATE TABLE mtorg_db.rainlab_blog_posts_categories
(
    post_id int(10) unsigned NOT NULL,
    category_id int(10) unsigned NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (post_id, category_id)
);
INSERT INTO mtorg_db.rainlab_blog_posts_categories (post_id, category_id) VALUES (2, 2);