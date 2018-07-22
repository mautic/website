CREATE TABLE mtorg_db.jobs
(
    id bigint(20) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    queue varchar(191) NOT NULL,
    payload text NOT NULL,
    attempts tinyint(3) unsigned NOT NULL,
    reserved_at int(10) unsigned,
    available_at int(10) unsigned NOT NULL,
    created_at int(10) unsigned NOT NULL
);
CREATE INDEX jobs_queue_reserved_at_index ON mtorg_db.jobs (queue, reserved_at);