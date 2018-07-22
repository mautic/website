CREATE TABLE mtorg_db.rainlab_translate_locales
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code varchar(191) NOT NULL,
    name varchar(191),
    is_default tinyint(1) DEFAULT 0 NOT NULL,
    is_enabled tinyint(1) DEFAULT 0 NOT NULL,
    sort_order int(11) DEFAULT 0 NOT NULL
);
CREATE INDEX rainlab_translate_locales_code_index ON mtorg_db.rainlab_translate_locales (code);
CREATE INDEX rainlab_translate_locales_name_index ON mtorg_db.rainlab_translate_locales (name);
INSERT INTO mtorg_db.rainlab_translate_locales (id, code, name, is_default, is_enabled, sort_order) VALUES (1, 'en', 'English', 1, 1, 1);
INSERT INTO mtorg_db.rainlab_translate_locales (id, code, name, is_default, is_enabled, sort_order) VALUES (2, 'de', 'German', 0, 1, 2);
INSERT INTO mtorg_db.rainlab_translate_locales (id, code, name, is_default, is_enabled, sort_order) VALUES (3, 'fr', 'French', 0, 1, 3);
INSERT INTO mtorg_db.rainlab_translate_locales (id, code, name, is_default, is_enabled, sort_order) VALUES (4, 'pgl', 'Pig Latin', 0, 1, 4);