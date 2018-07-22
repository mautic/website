CREATE TABLE mtorg_db.system_mail_templates
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code varchar(191),
    subject varchar(191),
    description text,
    content_html text,
    content_text text,
    layout_id int(11),
    is_custom tinyint(1) DEFAULT 0 NOT NULL,
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX system_mail_templates_layout_id_index ON mtorg_db.system_mail_templates (layout_id);