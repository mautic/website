CREATE TABLE mtorg_db.trka_marketplace_download
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    slug varchar(128),
    description varchar(191),
    user_id int(11),
    type_id int(11),
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp,
    repository_provider varchar(128),
    repository_url varchar(128),
    review_status varchar(64),
    category_id int(10) unsigned
);
INSERT INTO mtorg_db.trka_marketplace_download (id, name, slug, description, user_id, type_id, created_at, updated_at, deleted_at, repository_provider, repository_url, review_status, category_id) VALUES (18, 'mautic', 'mautic', 'Mautic: Open Source Marketing Automation Software.', 1, 1, '2018-07-01 20:56:21', '2018-07-15 17:42:54', null, 'github.com', 'https://github.com/mautic/mautic', 'approved', null);
INSERT INTO mtorg_db.trka_marketplace_download (id, name, slug, description, user_id, type_id, created_at, updated_at, deleted_at, repository_provider, repository_url, review_status, category_id) VALUES (19, 'MauticFBAdsCustomAudiencesBundle', 'mauticfbadscustomaudiencesbundle', 'Enables integration with Facebook Ads Custom Audiences Syncing your Mautic segments.', 1, 1, '2018-07-01 21:26:59', '2018-07-15 13:08:22', null, 'github.com', 'https://github.com/rmuilwijk/MauticFBAdsCustomAudiencesBundle', 'pending', null);
INSERT INTO mtorg_db.trka_marketplace_download (id, name, slug, description, user_id, type_id, created_at, updated_at, deleted_at, repository_provider, repository_url, review_status, category_id) VALUES (20, 'An extension with review in progress', 'extension-review-progress', '', 2, 1, '2018-07-15 17:52:57', '2018-07-15 18:15:20', null, 'github.com', 'https://github.com/mautic/mautic', 'under-review', 1);
INSERT INTO mtorg_db.trka_marketplace_download (id, name, slug, description, user_id, type_id, created_at, updated_at, deleted_at, repository_provider, repository_url, review_status, category_id) VALUES (21, 'A rejected Extension', 'rejected-extension', '', 1, 1, '2018-07-15 18:02:35', '2018-07-15 18:15:31', null, 'github.com', 'https://github.com/mautic/mautic', 'rejected', 1);