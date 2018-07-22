CREATE TABLE mtorg_db.trka_marketplace_categories
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label varchar(128),
    slug varchar(128)
);
INSERT INTO mtorg_db.trka_marketplace_categories (id, label, slug) VALUES (1, 'Foo', 'foo');