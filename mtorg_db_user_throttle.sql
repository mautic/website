CREATE TABLE mtorg_db.user_throttle
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
CREATE INDEX user_throttle_user_id_index ON mtorg_db.user_throttle (user_id);
CREATE INDEX user_throttle_ip_address_index ON mtorg_db.user_throttle (ip_address);
INSERT INTO mtorg_db.user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (1, 1, null, 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (2, 2, null, 0, null, 0, null, 0, null);
INSERT INTO mtorg_db.user_throttle (id, user_id, ip_address, attempts, last_attempt_at, is_suspended, suspended_at, is_banned, banned_at) VALUES (3, 1944, '172.17.0.1', 0, null, 0, null, 0, null);