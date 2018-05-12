const queries = {
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
    }
};

const fetch = async (query, connection) => {
    return new Promise(resolve => {
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
    })
}

module.exports = {
    queries, fetch
}