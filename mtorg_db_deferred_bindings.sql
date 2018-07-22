CREATE TABLE mtorg_db.deferred_bindings
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    master_type varchar(191) NOT NULL,
    master_field varchar(191) NOT NULL,
    slave_type varchar(191) NOT NULL,
    slave_id varchar(191) NOT NULL,
    session_key varchar(191) NOT NULL,
    is_bind tinyint(1) DEFAULT 1 NOT NULL,
    created_at timestamp,
    updated_at timestamp
);
CREATE INDEX deferred_bindings_master_type_index ON mtorg_db.deferred_bindings (master_type);
CREATE INDEX deferred_bindings_master_field_index ON mtorg_db.deferred_bindings (master_field);
CREATE INDEX deferred_bindings_slave_type_index ON mtorg_db.deferred_bindings (slave_type);
CREATE INDEX deferred_bindings_slave_id_index ON mtorg_db.deferred_bindings (slave_id);
CREATE INDEX deferred_bindings_session_key_index ON mtorg_db.deferred_bindings (session_key);
INSERT INTO mtorg_db.deferred_bindings (id, master_type, master_field, slave_type, slave_id, session_key, is_bind, created_at, updated_at) VALUES (2, 'trka\\Badges\\Models\\Badge', 'badgeImage', 'System\\Models\\File', '1', 'GwtNn5zQRmfWk2BKXtQrlcOq6YvMWDxDxHSrahV5', 0, '2018-05-05 13:41:39', '2018-05-05 13:41:39');
INSERT INTO mtorg_db.deferred_bindings (id, master_type, master_field, slave_type, slave_id, session_key, is_bind, created_at, updated_at) VALUES (7, 'RainLab\\User\\Models\\User', 'avatar', 'System\\Models\\File', '4', 'ePibg2IEbvbkE4VA0DwVJK6PatZloRZ2SUGb8Vxl', 0, '2018-05-06 04:46:40', '2018-05-06 04:46:40');
INSERT INTO mtorg_db.deferred_bindings (id, master_type, master_field, slave_type, slave_id, session_key, is_bind, created_at, updated_at) VALUES (9, 'trka\\Marketplace\\Models\\Downloads', 'package_file', 'System\\Models\\File', '7', 'zuC2HFCMwcsW81Rv3aPriarFHC5pGwMXSRm6NcEv', 1, '2018-06-18 10:31:48', '2018-06-18 10:31:48');
INSERT INTO mtorg_db.deferred_bindings (id, master_type, master_field, slave_type, slave_id, session_key, is_bind, created_at, updated_at) VALUES (10, 'trka\\Marketplace\\Models\\Downloads', 'package_file', 'System\\Models\\File', '8', 'iBapNU3RMi7Tmg6oSGdsOZhpb8vqddKEvEuifJxS', 1, '2018-06-18 10:36:26', '2018-06-18 10:36:26');
INSERT INTO mtorg_db.deferred_bindings (id, master_type, master_field, slave_type, slave_id, session_key, is_bind, created_at, updated_at) VALUES (14, 'trka\\Marketplace\\Models\\Downloads', 'package_icon', 'System\\Models\\File', '11', '9wWw6aRG5vbLcUcmT1TpjmdLmYkY363Y8SXsKJuN', 0, '2018-06-19 00:53:52', '2018-06-19 00:53:52');