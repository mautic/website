CREATE TABLE mtorg_db.sessions
(
    id varchar(191) NOT NULL,
    payload text,
    last_activity int(11),
    user_id int(10) unsigned,
    ip_address varchar(45),
    user_agent text
);
CREATE UNIQUE INDEX sessions_id_unique ON mtorg_db.sessions (id);