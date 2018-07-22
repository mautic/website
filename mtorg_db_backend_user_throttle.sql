CREATE TABLE mtorg_db.backend_user_throttle
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id int(10) unsigned,
    ip_address varchar(191),
    attempts int(11) DEFAULT 0 NOT NULL,
    last_attempt_at timestamp,
    is_suspended tinyint(1) DEFAULT 0 NOT NULL,
    suspended_at timestamp,
    is_banned tinyint(1) DEFAULT 0 NOT NULL,
    banned_at timestamp
);
CREATE INDEX backend_user_throttle_user_id_index ON mtorg_db.backend_user_throttle (user_id);
CREATE INDEX backend_user_throttle_ip_address_index ON mtorg_db.backend_user_throttle (ip_address);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (1, 1, '172.17.0.1', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (2, 1, '68.169.160.76', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (3, 1, '66.87.153.79', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (4, 3, '66.87.153.79', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (5, 3, '104.251.247.205', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (6, 1, '104.251.247.205', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (7, 3, '24.61.243.38', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (8, 3, '71.184.226.3', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (9, 3, '75.104.64.134', 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.backend_user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (10, 3, '69.194.133.108', 0, null, 0, null, 0, null);