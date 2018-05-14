const queries = {
    getPostById: (id) => {
        return `SELECT posts.*
            from mwp_posts posts
            where posts.ID = ${id};`
    },
    getPublishedTypesCount: `
        SELECT
          count(*) cnt,
          posts.post_type
        from mwp_posts posts
        where post_status = 'publish'
        group by post_type;`,
    getPublishedContentByType: (type) => {
        return `
        SELECT
          posts.post_type,
          posts.post_status,
          posts.*
        from mwp_posts posts
        where post_status = 'publish'
        and post_type = '${type}';`
    },
    getPostMetaRowsForId: (id) => {
        return `
            SELECT
              meta.*
            from mwp_posts posts
            LEFT JOIN mwp_postmeta meta ON meta.post_id = posts.ID
            where posts.ID = ${id};`;
    },
    getAllNavMenus: `SELECT *
        FROM mwp_terms AS t
          LEFT JOIN mwp_term_taxonomy AS tt ON tt.term_id = t.term_id
        WHERE tt.taxonomy = 'nav_menu'`,
    getNavItemsByMenuId: (menuId) => {
        return `SELECT p.*
            FROM mwp_posts AS p
              LEFT JOIN mwp_term_relationships AS tr ON tr.object_id = p.ID
              LEFT JOIN mwp_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
            WHERE p.post_type = 'nav_menu_item'
                  AND tt.term_id = ${menuId}
            ORDER BY  p.menu_order ASC`
    },
    getNavMenuTarget: (id) => {
        return `
            SELECT
              meta.*
            from mwp_posts posts
            LEFT JOIN mwp_postmeta meta ON meta.post_id = posts.ID
            where posts.ID = ${id} and meta.meta_key in ("_menu_item_object", "_menu_item_object_id")
            ;`;
    }
};

const fetch = async (query, connection) => {
    return new Promise(resolve => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                throw error
            }
            ;
            resolve(results);
        });
    })
}

module.exports = {
    queries, fetch
}