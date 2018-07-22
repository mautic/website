CREATE TABLE mtorg_db.rainlab_forum_topic_followers
(
    topic_id int(10) unsigned NOT NULL,
    member_id int(10) unsigned NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT `PRIMARY` PRIMARY KEY (topic_id, member_id)
);
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (1, 1, '2018-05-04 02:12:15', '2018-05-05 00:25:57');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (1, 2, '2018-05-05 00:33:17', '2018-05-05 00:33:17');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (2, 1, '2018-05-05 03:26:51', '2018-05-05 03:26:51');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (3, 1, '2018-05-05 03:28:45', '2018-05-06 17:35:25');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (4, 1, '2018-05-05 03:29:56', '2018-05-05 03:29:56');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (6, 1, '2018-05-05 03:57:00', '2018-05-05 03:57:00');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (7, 1, '2018-05-05 03:58:47', '2018-05-05 04:12:01');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (8, 1, '2018-05-05 04:01:45', '2018-05-05 04:01:45');
INSERT INTO mtorg_db.rainlab_forum_topic_followers (topic_id, member_id, created_at, updated_at) VALUES (9, 2, '2018-05-05 07:26:38', '2018-05-05 07:26:38');