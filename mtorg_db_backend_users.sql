CREATE TABLE mtorg_db.backend_users
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name varchar(191),
    last_name varchar(191),
    login varchar(191) NOT NULL,
    email varchar(191) NOT NULL,
    password varchar(191) NOT NULL,
    activation_code varchar(191),
    persist_code varchar(191),
    reset_password_code varchar(191),
    permissions text,
    is_activated tinyint(1) DEFAULT 0 NOT NULL,
    role_id int(10) unsigned,
    activated_at timestamp,
    last_login timestamp,
    created_at timestamp,
    updated_at timestamp,
    is_superuser tinyint(1) DEFAULT 0 NOT NULL
);
CREATE UNIQUE INDEX login_unique ON mtorg_db.backend_users (login);
CREATE UNIQUE INDEX email_unique ON mtorg_db.backend_users (email);
CREATE INDEX act_code_index ON mtorg_db.backend_users (activation_code);
CREATE INDEX reset_code_index ON mtorg_db.backend_users (reset_password_code);
CREATE INDEX admin_role_index ON mtorg_db.backend_users (role_id);
INSERT INTO mtorg_db.backend_users (id, first_name, last_name, login, email, password, activation_code, persist_code, reset_password_code, permissions, is_activated, role_id, activated_at, last_login, created_at, updated_at, is_superuser) VALUES (1, 'Kevin', 'Ard', 'kevinard', 'ard.kevin.84@gmail.com', '$2y$10$rT97m11/M/61tTr2lIAlGO/oQlP1Uxs4N.vGjQyb3cVJiAS0kOSq2', null, '$2y$10$D5GgwzLB6YTdmTtqboM0V.RxKCvVInJ3ri8zRlg/QuTam8psaZ9Ky', null, '', 1, 2, null, '2018-05-05 09:44:04', '2018-05-01 13:39:22', '2018-05-05 09:44:04', 1);
INSERT INTO mtorg_db.backend_users (id, first_name, last_name, login, email, password, activation_code, persist_code, reset_password_code, permissions, is_activated, role_id, activated_at, last_login, created_at, updated_at, is_superuser) VALUES (3, 'David', 'Hurley', 'dbhurley', 'david.hurley@mautic.org', '$2y$10$Pwv0n/W08ia4WnCeURHQkeVmBvcLXDto6ZB/4NVDTptpyfYXp3MCy', null, '$2y$10$kQ.RANwb/zHhW0gAcQdBNOtXpRex3AkwrQbXQ6w6.XFO/uSXMMw/C', null, '', 0, 2, null, '2018-05-11 01:01:39', '2018-05-03 02:59:09', '2018-05-11 01:01:39', 1);