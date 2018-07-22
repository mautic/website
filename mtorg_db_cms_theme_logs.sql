CREATE TABLE mtorg_db.cms_theme_logs
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type varchar(20) NOT NULL,
    theme varchar(191),
    template varchar(191),
    old_template varchar(191),
    content longtext,
    old_content longtext,
    user_id int(11),
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX cms_theme_logs_type_index ON mtorg_db.cms_theme_logs (type);
CREATE INDEX cms_theme_logs_theme_index ON mtorg_db.cms_theme_logs (theme);
CREATE INDEX cms_theme_logs_user_id_index ON mtorg_db.cms_theme_logs (user_id);