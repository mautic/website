CREATE TABLE mtorg_db.cms_theme_data
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    theme varchar(191),
    data mediumtext,
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX cms_theme_data_theme_index ON mtorg_db.cms_theme_data (theme);