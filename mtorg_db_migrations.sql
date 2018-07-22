CREATE TABLE mtorg_db.migrations
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    migration varchar(191) NOT NULL,
    batch int(11) NOT NULL
);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (1, '2013_10_01_000001_Db_Deferred_Bindings', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (2, '2013_10_01_000002_Db_System_Files', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (3, '2013_10_01_000003_Db_System_Plugin_Versions', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (4, '2013_10_01_000004_Db_System_Plugin_History', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (5, '2013_10_01_000005_Db_System_Settings', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (6, '2013_10_01_000006_Db_System_Parameters', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (7, '2013_10_01_000007_Db_System_Add_Disabled_Flag', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (8, '2013_10_01_000008_Db_System_Mail_Templates', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (9, '2013_10_01_000009_Db_System_Mail_Layouts', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (10, '2014_10_01_000010_Db_Jobs', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (11, '2014_10_01_000011_Db_System_Event_Logs', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (12, '2014_10_01_000012_Db_System_Request_Logs', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (13, '2014_10_01_000013_Db_System_Sessions', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (14, '2015_10_01_000014_Db_System_Mail_Layout_Rename', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (15, '2015_10_01_000015_Db_System_Add_Frozen_Flag', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (16, '2015_10_01_000016_Db_Cache', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (17, '2015_10_01_000017_Db_System_Revisions', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (18, '2015_10_01_000018_Db_FailedJobs', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (19, '2016_10_01_000019_Db_System_Plugin_History_Detail_Text', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (20, '2016_10_01_000020_Db_System_Timestamp_Fix', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (21, '2017_08_04_121309_Db_Deferred_Bindings_Add_Index_Session', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (22, '2017_10_01_000021_Db_System_Sessions_Update', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (23, '2017_10_01_000022_Db_Jobs_FailedJobs_Update', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (24, '2017_10_01_000023_Db_System_Mail_Partials', 1);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (25, '2013_10_01_000001_Db_Backend_Users', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (26, '2013_10_01_000002_Db_Backend_User_Groups', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (27, '2013_10_01_000003_Db_Backend_Users_Groups', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (28, '2013_10_01_000004_Db_Backend_User_Throttle', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (29, '2014_01_04_000005_Db_Backend_User_Preferences', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (30, '2014_10_01_000006_Db_Backend_Access_Log', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (31, '2014_10_01_000007_Db_Backend_Add_Description_Field', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (32, '2015_10_01_000008_Db_Backend_Add_Superuser_Flag', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (33, '2016_10_01_000009_Db_Backend_Timestamp_Fix', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (34, '2017_10_01_000010_Db_Backend_User_Roles', 2);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (35, '2014_10_01_000001_Db_Cms_Theme_Data', 3);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (36, '2016_10_01_000002_Db_Cms_Timestamp_Fix', 3);
INSERT INTO mtorg_db.migrations (id, migration, batch) VALUES (37, '2017_10_01_000003_Db_Cms_Theme_Logs', 3);