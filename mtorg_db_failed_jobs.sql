CREATE TABLE mtorg_db.failed_jobs
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception longtext,
    failed_at timestamp
);