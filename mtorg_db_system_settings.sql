CREATE TABLE mtorg_db.system_settings
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    item varchar(191),
    value mediumtext
);
CREATE INDEX system_settings_item_index ON mtorg_db.system_settings (item);
INSERT INTO mtorg_db.system_settings (id, item, value) VALUES (1, 'rainlab_builder_settings', '{"author_name":"Kevin Ard","author_namespace":"trka"}');