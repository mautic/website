CREATE TABLE mtorg_db.system_files
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    disk_name varchar(191) NOT NULL,
    file_name varchar(191) NOT NULL,
    file_size int(11) NOT NULL,
    content_type varchar(191) NOT NULL,
    title varchar(191),
    description text,
    field varchar(191),
    attachment_id varchar(191),
    attachment_type varchar(191),
    is_public tinyint(1) DEFAULT 1 NOT NULL,
    sort_order int(11),
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX system_files_field_index ON mtorg_db.system_files (field);
CREATE INDEX system_files_attachment_id_index ON mtorg_db.system_files (attachment_id);
CREATE INDEX system_files_attachment_type_index ON mtorg_db.system_files (attachment_type);
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (2, '5aedb4d765a87651179843.jpg', 'Kevin-ArdBW.jpg', 218881, 'image/jpeg', null, null, 'badgeImage', '1', 'trka\\Badges\\Models\\Badge', 1, 2, '2018-05-05 13:42:47', '2018-05-05 13:42:49');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (3, '5aedb561c75e1637956750.jpg', 'Kevin-ArdBW.jpg', 218881, 'image/jpeg', null, null, 'badgeImage', '3', 'trka\\Badges\\Models\\Badge', 1, 3, '2018-05-05 13:45:05', '2018-05-05 13:45:07');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (6, '5b1d3be81434f234898273.png', 'mautic_3_series-1024x499.png', 179595, 'image/png', null, null, 'featured_images', '104468', 'RainLab\\Blog\\Models\\Post', 1, 6, '2018-06-10 14:55:36', '2018-06-10 14:55:36');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (7, '5b278a14874a5990396000.zip', 'test.zip', 210, 'application/zip', null, null, null, null, null, 1, 7, '2018-06-18 10:31:48', '2018-06-18 10:31:48');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (8, '5b278b2ac6eb9829867800.zip', 'test.zip', 210, 'application/zip', null, null, null, null, null, 1, 8, '2018-06-18 10:36:26', '2018-06-18 10:36:26');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (9, '5b278d14f2071974509900.zip', 'test.zip', 210, 'application/zip', null, null, 'package_file', '10', 'trka\\Marketplace\\Models\\Downloads', 1, 9, '2018-06-18 10:44:36', '2018-06-18 10:44:40');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (10, '5b279f38b8574578240356.zip', 'test.zip', 210, 'application/zip', null, null, 'package_file', '1', 'trka\\Marketplace\\Models\\Downloads', 1, 10, '2018-06-18 12:02:00', '2018-06-18 12:02:13');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (13, '5b2854243f26d307782155.jpg', 'placeimg_164_164_any.jpg', 28281, 'image/jpeg', null, null, 'package_icon', '1', 'trka\\Marketplace\\Models\\Downloads', 1, 13, '2018-06-19 00:53:56', '2018-06-19 00:53:56');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (14, '5b2cfc79950e7091584889.png', 'sweden-flag-400.png', 512, 'image/png', null, null, 'group_image', '1', 'trka\\Groups\\Models\\Group', 1, 14, '2018-06-22 13:41:13', '2018-06-22 13:41:13');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (16, '5b3cb7e14c82b949719426.jpg', 'Kevin-ArdBW.jpg', 218881, 'image/jpeg', null, null, 'avatar', '1', 'RainLab\\User\\Models\\User', 1, 16, '2018-07-04 12:04:49', '2018-07-04 12:04:49');
INSERT INTO mtorg_db.system_files (id, disk_name, file_name, file_size, content_type, title, description, field, attachment_id, attachment_type, is_public, sort_order, created_at, updated_at) VALUES (17, '5b3cd187de88f161094028.jpg', 'Kevin-ArdBW.jpg', 218881, 'image/jpeg', null, null, 'avatar', '1', 'Backend\\Models\\User', 1, 17, '2018-07-04 13:54:15', '2018-07-04 13:54:16');