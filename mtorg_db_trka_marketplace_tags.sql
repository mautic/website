CREATE TABLE mtorg_db.trka_marketplace_tags
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label varchar(128) NOT NULL,
    slug varchar(128),
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);
INSERT INTO mtorg_db.trka_marketplace_tags (id, label, slug, created_at, updated_at, deleted_at) VALUES (1, 'foo', null, '2018-07-15 13:15:30', '2018-07-15 13:15:30', null);
INSERT INTO mtorg_db.trka_marketplace_tags (id, label, slug, created_at, updated_at, deleted_at) VALUES (2, 'bar', null, '2018-07-15 13:15:30', '2018-07-15 13:15:30', null);
INSERT INTO mtorg_db.trka_marketplace_tags (id, label, slug, created_at, updated_at, deleted_at) VALUES (3, 'baz', null, '2018-07-15 13:15:30', '2018-07-15 13:15:30', null);