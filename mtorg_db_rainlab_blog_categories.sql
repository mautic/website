CREATE TABLE mtorg_db.rainlab_blog_categories
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(191),
    slug varchar(191),
    code varchar(191),
    description text,
    parent_id int(10) unsigned,
    nest_left int(11),
    nest_right int(11),
    nest_depth int(11),
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX rainlab_blog_categories_slug_index ON mtorg_db.rainlab_blog_categories (slug);
CREATE INDEX rainlab_blog_categories_parent_id_index ON mtorg_db.rainlab_blog_categories (parent_id);
INSERT INTO mtorg_db.rainlab_blog_categories (id, name, slug, code, description, parent_id, nest_left, nest_right, nest_depth, created_at, updated_at) VALUES (1, 'Uncategorized', 'uncategorized', null, null, null, 1, 2, 0, '2018-06-09 12:01:11', '2018-06-09 12:01:11');
INSERT INTO mtorg_db.rainlab_blog_categories (id, name, slug, code, description, parent_id, nest_left, nest_right, nest_depth, created_at, updated_at) VALUES (2, 'Marketer Blog', 'marketer-blog', null, '', null, 3, 4, 0, '2018-06-09 12:26:38', '2018-06-09 12:26:38');