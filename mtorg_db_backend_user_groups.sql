CREATE TABLE mtorg_db.backend_user_groups
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(191) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    code varchar(191),
    description text,
    is_new_user_default tinyint(1) DEFAULT 0 NOT NULL
);
CREATE UNIQUE INDEX name_unique ON mtorg_db.backend_user_groups (name);
CREATE INDEX code_index ON mtorg_db.backend_user_groups (code);
INSERT INTO mtorg_db.backend_user_groups (id, name, created_at, updated_at, code, description, is_new_user_default) VALUES (1, 'Owners', '2018-05-01 13:39:22', '2018-05-01 13:39:22', 'owners', 'Default group for website owners.', 0);