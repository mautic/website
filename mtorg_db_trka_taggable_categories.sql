CREATE TABLE mtorg_db.trka_taggable_categories
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label varchar(128) NOT NULL,
    slug varchar(128) NOT NULL,
    parent_id int(10) unsigned,
    nest_left int(11),
    nest_right int(11),
    nest_depth int(11)
);
INSERT INTO mtorg_db.trka_taggable_categories (id, label, slug, parent_id, nest_left, nest_right, nest_depth) VALUES (5, 'Boo', 'boo', null, 1, 4, 0);
INSERT INTO mtorg_db.trka_taggable_categories (id, label, slug, parent_id, nest_left, nest_right, nest_depth) VALUES (6, 'Hoo', 'hoo', 5, 2, 3, 1);