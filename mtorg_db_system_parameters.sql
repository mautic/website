CREATE TABLE mtorg_db.system_parameters
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    namespace varchar(100) NOT NULL,
    `group` varchar(50) NOT NULL,
    item varchar(150) NOT NULL,
    value text
);
CREATE INDEX item_index ON mtorg_db.system_parameters (namespace, `group`, item);
INSERT INTO mtorg_db.system_parameters (id, namespace, `group`, item, value) VALUES (1, 'system', 'update', 'count', '0');
INSERT INTO mtorg_db.system_parameters (id, namespace, `group`, item, value) VALUES (2, 'system', 'core', 'hash', '"d4a4e1f641e333ff5c26037f86cfe619"');
INSERT INTO mtorg_db.system_parameters (id, namespace, `group`, item, value) VALUES (3, 'system', 'core', 'build', '"437"');
INSERT INTO mtorg_db.system_parameters (id, namespace, `group`, item, value) VALUES (4, 'system', 'update', 'retry', '1532363800');
INSERT INTO mtorg_db.system_parameters (id, namespace, `group`, item, value) VALUES (5, 'cms', 'theme', 'active', '"oc-theme-mautic-org"');