CREATE TABLE mtorg_db.system_revisions
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id int(10) unsigned,
    field varchar(191),
    cast varchar(191),
    old_value text,
    new_value text,
    revisionable_type varchar(191) NOT NULL,
    revisionable_id int(11) NOT NULL,
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX system_revisions_user_id_index ON mtorg_db.system_revisions (user_id);
CREATE INDEX system_revisions_field_index ON mtorg_db.system_revisions (field);
CREATE INDEX system_revisions_revisionable_id_revisionable_type_index ON mtorg_db.system_revisions (revisionable_id, revisionable_type);