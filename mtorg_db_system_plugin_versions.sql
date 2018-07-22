CREATE TABLE mtorg_db.system_plugin_versions
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code varchar(191) NOT NULL,
    version varchar(50) NOT NULL,
    created_at timestamp,
    is_disabled tinyint(1) DEFAULT 0 NOT NULL,
    is_frozen tinyint(1) DEFAULT 0 NOT NULL
);
CREATE INDEX system_plugin_versions_code_index ON mtorg_db.system_plugin_versions (code);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (2, 'RainLab.User', '1.4.6', '2018-06-03 12:48:26', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (3, 'RainLab.Builder', '1.0.22', '2018-05-02 15:46:56', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (4, 'October.Drivers', '1.1.1', '2018-05-02 15:50:31', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (5, 'OFFLINE.SiteSearch', '1.3.8', '2018-05-02 15:50:54', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (6, 'Esroyo.UserProfile', '1.0.12', '2018-05-02 15:51:03', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (8, 'RainLab.Forum', '1.1.1', '2018-05-02 23:16:38', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (9, 'RainLab.Translate', '1.3.8', '2018-05-04 03:30:04', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (12, 'Bedard.Debugbar', '2.0.0', '2018-05-05 11:02:10', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (17, 'trka.Badges', '1.0.2', '2018-05-05 13:14:57', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (19, 'October.Demo', '1.0.1', '2018-06-03 12:48:26', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (21, 'trka.Groups', '1.0.13', '2018-07-07 20:28:54', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (23, 'RainLab.Blog', '1.2.19', '2018-06-09 12:01:14', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (47, 'trka.Marketplace', '1.0.12', '2018-07-15 11:54:36', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (48, 'trka.MauticdotorgExtensions', '1.0.8', '2018-07-15 13:40:37', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (49, 'Mey.Breadcrumbs', '1.0.10', '2018-06-24 13:22:12', 0, 0);
INSERT INTO mtorg_db.system_plugin_versions (id, code, version, created_at, is_disabled, is_frozen) VALUES (50, 'trka.Taggable', '1.0.3', '2018-07-15 12:02:19', 0, 0);