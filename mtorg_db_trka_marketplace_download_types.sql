CREATE TABLE mtorg_db.trka_marketplace_download_types
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label varchar(128) NOT NULL,
    slug varchar(128),
    deleted_at timestamp,
    created_at timestamp,
    updated_at timestamp
);
INSERT INTO mtorg_db.trka_marketplace_download_types (id, label, slug, deleted_at, created_at, updated_at) VALUES (1, 'Extension', 'extension', null, '2018-07-01 16:53:49', '2018-07-01 16:53:49');
INSERT INTO mtorg_db.trka_marketplace_download_types (id, label, slug, deleted_at, created_at, updated_at) VALUES (2, 'Theme', 'theme', null, '2018-07-01 16:53:57', '2018-07-01 16:53:57');