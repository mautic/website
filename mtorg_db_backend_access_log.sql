CREATE TABLE mtorg_db.backend_access_log
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id int(10) unsigned NOT NULL,
    ip_address varchar(191),
    created_at timestamp,
    updated_at timestamp
);
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (1, 1, '172.17.0.1', '2018-05-01 13:41:12', '2018-05-01 13:41:12');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (2, 1, '68.169.160.76', '2018-05-02 23:15:07', '2018-05-02 23:15:07');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (3, 1, '66.87.153.79', '2018-05-03 02:34:11', '2018-05-03 02:34:11');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (4, 3, '66.87.153.79', '2018-05-03 02:59:44', '2018-05-03 02:59:44');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (5, 3, '104.251.247.205', '2018-05-03 03:33:17', '2018-05-03 03:33:17');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (6, 1, '104.251.247.205', '2018-05-03 03:34:27', '2018-05-03 03:34:27');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (7, 3, '24.61.243.38', '2018-05-03 03:52:02', '2018-05-03 03:52:02');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (8, 1, '104.251.247.205', '2018-05-03 04:11:24', '2018-05-03 04:11:24');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (9, 1, '104.251.247.205', '2018-05-03 04:56:36', '2018-05-03 04:56:36');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (10, 3, '24.61.243.38', '2018-05-03 15:34:07', '2018-05-03 15:34:07');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (11, 3, '71.184.226.3', '2018-05-03 16:44:28', '2018-05-03 16:44:28');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (12, 1, '68.169.160.76', '2018-05-03 20:55:32', '2018-05-03 20:55:32');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (13, 1, '172.17.0.1', '2018-05-05 09:44:05', '2018-05-05 09:44:05');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (14, 3, '71.184.226.3', '2018-05-07 22:18:43', '2018-05-07 22:18:43');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (15, 3, '75.104.64.134', '2018-05-08 07:24:16', '2018-05-08 07:24:16');
INSERT INTO mtorg_db.backend_access_log (id, user_id, ip_address, created_at, updated_at) VALUES (16, 3, '69.194.133.108', '2018-05-11 01:01:39', '2018-05-11 01:01:39');