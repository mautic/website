CREATE TABLE mtorg_db.rainlab_translate_attributes
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    locale varchar(191) NOT NULL,
    model_id varchar(191),
    model_type varchar(191),
    attribute_data mediumtext
);
CREATE INDEX rainlab_translate_attributes_locale_index ON mtorg_db.rainlab_translate_attributes (locale);
CREATE INDEX rainlab_translate_attributes_model_id_index ON mtorg_db.rainlab_translate_attributes (model_id);
CREATE INDEX rainlab_translate_attributes_model_type_index ON mtorg_db.rainlab_translate_attributes (model_type);
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (1, 'de', '16', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (2, 'fr', '16', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (3, 'pgl', '16', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (4, 'de', '17', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (5, 'fr', '17', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (6, 'pgl', '17', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (7, 'de', '18', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (8, 'fr', '18', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (9, 'pgl', '18', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (10, 'de', '2', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"3-secrets-growing-community-online","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (11, 'fr', '2', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"3-secrets-growing-community-online","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (12, 'pgl', '2', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"3-secrets-growing-community-online","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (13, 'de', '2', 'RainLab\\Blog\\Models\\Category', '{"name":"","slug":"marketer-blog","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (14, 'fr', '2', 'RainLab\\Blog\\Models\\Category', '{"name":"","slug":"marketer-blog","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (15, 'pgl', '2', 'RainLab\\Blog\\Models\\Category', '{"name":"","slug":"marketer-blog","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (16, 'de', '2567', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (17, 'fr', '2567', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (18, 'pgl', '2567', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (19, 'de', '104416', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (20, 'fr', '104416', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (21, 'pgl', '104416', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (22, 'de', '104417', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (23, 'fr', '104417', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (24, 'pgl', '104417', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (31, 'de', '104418', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (32, 'fr', '104418', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (33, 'pgl', '104418', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (34, 'de', '104419', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (35, 'fr', '104419', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (36, 'pgl', '104419', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (37, 'de', '104420', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (38, 'fr', '104420', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (39, 'pgl', '104420', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (40, 'de', '104421', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (41, 'fr', '104421', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (42, 'pgl', '104421', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (43, 'de', '104422', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (44, 'fr', '104422', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (45, 'pgl', '104422', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (46, 'de', '104423', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (47, 'fr', '104423', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (48, 'pgl', '104423', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (49, 'de', '102406', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (50, 'fr', '102406', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (51, 'pgl', '102406', 'RainLab\\Forum\\Models\\Channel', '{"title":"","description":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (52, 'de', '104468', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (53, 'fr', '104468', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (54, 'pgl', '104468', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (55, 'de', '104469', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"maintains-user","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (56, 'fr', '104469', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"maintains-user","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (57, 'pgl', '104469', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"maintains-user","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (58, 'de', '63', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (59, 'fr', '63', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');
INSERT INTO mtorg_db.rainlab_translate_attributes (id, locale, model_id, model_type, attribute_data) VALUES (60, 'pgl', '63', 'RainLab\\Blog\\Models\\Post', '{"title":"","slug":"","content":"","content_html":"","excerpt":""}');