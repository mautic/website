CREATE TABLE mtorg_db.cache
(
    `key` varchar(191) NOT NULL,
    value longtext NOT NULL,
    expiration int(11) NOT NULL
);
CREATE UNIQUE INDEX cache_key_unique ON mtorg_db.cache (`key`);