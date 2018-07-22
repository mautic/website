CREATE TABLE mtorg_db.system_request_logs
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    status_code int(11),
    url varchar(191),
    referer text,
    count int(11) DEFAULT 0 NOT NULL,
    created_at timestamp,
    updated_at timestamp
);