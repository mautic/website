CREATE TABLE mtorg_db.backend_users_groups
(
    user_id int(10) unsigned NOT NULL,
    user_group_id int(10) unsigned NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (user_id, user_group_id)
);
INSERT INTO mtorg_db.backend_users_groups (user_id, user_group_id) VALUES (1, 1);
INSERT INTO mtorg_db.backend_users_groups (user_id, user_group_id) VALUES (3, 1);