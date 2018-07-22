CREATE TABLE mtorg_db.rainlab_user_mail_blockers
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email varchar(191),
    template varchar(191),
    user_id int(10) unsigned,
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX rainlab_user_mail_blockers_email_index ON mtorg_db.rainlab_user_mail_blockers (email);
CREATE INDEX rainlab_user_mail_blockers_template_index ON mtorg_db.rainlab_user_mail_blockers (template);
CREATE INDEX rainlab_user_mail_blockers_user_id_index ON mtorg_db.rainlab_user_mail_blockers (user_id);