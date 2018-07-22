CREATE TABLE mtorg_db.trka_badges_badges
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name text NOT NULL,
    description text,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);
INSERT INTO mtorg_db.trka_badges_badges (id, name, description, created_at, updated_at, deleted_at) VALUES (1, 'Test Badge', 'This is a test badge.', '2018-05-05 13:26:02', '2018-05-05 13:44:37', '2018-05-05 13:44:37');
INSERT INTO mtorg_db.trka_badges_badges (id, name, description, created_at, updated_at, deleted_at) VALUES (2, 'Another Test Badge', 'This is another testing badge. I need to check backend sorting, multiselect, and other things that need a few entities.', '2018-05-05 13:26:42', '2018-05-05 13:27:01', '2018-05-05 13:27:01');
INSERT INTO mtorg_db.trka_badges_badges (id, name, description, created_at, updated_at, deleted_at) VALUES (3, 'Is Kevin', 'Badge for users named Kevin.', '2018-05-05 13:45:07', '2018-05-05 13:45:07', null);