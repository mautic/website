CREATE TABLE mtorg_db.rainlab_translate_indexes
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    locale varchar(191) NOT NULL,
    model_id varchar(191),
    model_type varchar(191),
    item varchar(191),
    value mediumtext
);
CREATE INDEX rainlab_translate_indexes_locale_index ON mtorg_db.rainlab_translate_indexes (locale);
CREATE INDEX rainlab_translate_indexes_model_id_index ON mtorg_db.rainlab_translate_indexes (model_id);
CREATE INDEX rainlab_translate_indexes_model_type_index ON mtorg_db.rainlab_translate_indexes (model_type);
CREATE INDEX rainlab_translate_indexes_item_index ON mtorg_db.rainlab_translate_indexes (item);
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (1, 'de', '2', 'RainLab\\Blog\\Models\\Post', 'slug', '3-secrets-growing-community-online');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (2, 'fr', '2', 'RainLab\\Blog\\Models\\Post', 'slug', '3-secrets-growing-community-online');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (3, 'pgl', '2', 'RainLab\\Blog\\Models\\Post', 'slug', '3-secrets-growing-community-online');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (4, 'de', '2', 'RainLab\\Blog\\Models\\Category', 'slug', 'marketer-blog');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (5, 'fr', '2', 'RainLab\\Blog\\Models\\Category', 'slug', 'marketer-blog');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (6, 'pgl', '2', 'RainLab\\Blog\\Models\\Category', 'slug', 'marketer-blog');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (7, 'de', '104469', 'RainLab\\Blog\\Models\\Post', 'slug', 'maintains-user');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (8, 'fr', '104469', 'RainLab\\Blog\\Models\\Post', 'slug', 'maintains-user');
INSERT INTO mtorg_db.rainlab_translate_indexes (id, locale, model_id, model_type, item, value) VALUES (9, 'pgl', '104469', 'RainLab\\Blog\\Models\\Post', 'slug', 'maintains-user');