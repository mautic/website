CREATE TABLE mtorg_db.trka_taggable_tags
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label varchar(128) NOT NULL,
    slug varchar(128) NOT NULL
);
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (6, 'Facebook', 'facebook');
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (7, 'Mautic Core', 'mautic-core');
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (8, 'Extension', 'extension');
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (9, 'Theme', 'theme');
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (10, 'martech', 'martech');
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (11, 'Looking Ahead', 'looking-ahead');
INSERT INTO mtorg_db.trka_taggable_tags (id, label, slug) VALUES (12, 'Social Media', 'social-media');