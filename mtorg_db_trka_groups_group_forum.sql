CREATE TABLE mtorg_db.trka_groups_group_forum
(
    forum_id int(10) unsigned NOT NULL,
    group_id int(10) unsigned NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (forum_id, group_id)
);
INSERT INTO mtorg_db.trka_groups_group_forum (forum_id, group_id) VALUES (102673, 3);