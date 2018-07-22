CREATE TABLE mtorg_db.system_mail_partials
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(191),
    code varchar(191),
    content_html text,
    content_text text,
    is_custom tinyint(1) DEFAULT 0 NOT NULL,
    created_at timestamp,
    updated_at timestamp
);