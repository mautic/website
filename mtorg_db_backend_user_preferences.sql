CREATE TABLE mtorg_db.backend_user_preferences
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id int(10) unsigned NOT NULL,
    namespace varchar(100) NOT NULL,
    `group` varchar(50) NOT NULL,
    item varchar(150) NOT NULL,
    value text
);
CREATE INDEX user_item_index ON mtorg_db.backend_user_preferences (user_id, namespace, `group`, item);
INSERT INTO mtorg_db.backend_user_preferences (id, user_id, namespace, `group`, item, value) VALUES (1, 1, 'backend', 'hints', 'hidden', '{"translation_locales_hint":1,"backend_accesslogs_hint":1}');