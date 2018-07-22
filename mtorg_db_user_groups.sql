CREATE TABLE mtorg_db.user_groups
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(191) NOT NULL,
    code varchar(191),
    description text,
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX user_groups_code_index ON mtorg_db.user_groups (code);
INSERT INTO mtorg_db.user_groups (id, name, code, description, created_at, updated_at) VALUES (1, 'Guest', 'guest', 'Default group for guest users.', '2018-05-02 15:46:36', '2018-05-02 15:46:36');
INSERT INTO mtorg_db.user_groups (id, name, code, description, created_at, updated_at) VALUES (2, 'Registered', 'registered', 'Default group for registered users.', '2018-05-02 15:46:36', '2018-05-02 15:46:36');