CREATE TABLE mtorg_db.trka_marketplace_download_tag
(
    download_id int(10) unsigned NOT NULL,
    tag_id int(10) unsigned NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (download_id, tag_id)
);
INSERT INTO mtorg_db.trka_marketplace_download_tag (download_id, tag_id) VALUES (19, 1);
INSERT INTO mtorg_db.trka_marketplace_download_tag (download_id, tag_id) VALUES (19, 2);
INSERT INTO mtorg_db.trka_marketplace_download_tag (download_id, tag_id) VALUES (19, 3);