CREATE TABLE mtorg_db.backend_user_roles
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(191) NOT NULL,
    code varchar(191),
    description text,
    permissions text,
    is_system tinyint(1) DEFAULT 0 NOT NULL,
    created_at timestamp,
    updated_at timestamp
);
CREATE UNIQUE INDEX role_unique ON mtorg_db.backend_user_roles (name);
CREATE INDEX role_code_index ON mtorg_db.backend_user_roles (code);
INSERT INTO mtorg_db.backend_user_roles (id, name, code, description, permissions, is_system, created_at, updated_at) VALUES (1, 'Publisher', 'publisher', 'Site editor with access to publishing tools.', '', 1, '2018-05-01 13:39:22', '2018-05-01 13:39:22');
INSERT INTO mtorg_db.backend_user_roles (id, name, code, description, permissions, is_system, created_at, updated_at) VALUES (2, 'Developer', 'developer', 'Site administrator with access to developer tools.', '', 1, '2018-05-01 13:39:22', '2018-05-01 13:39:22');