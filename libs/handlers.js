const path = require('path');
const config = require('./config');
const fetches = require('./fetch');
const mutators = require('./mutators');

const handlePages = async (connection) => {
    let pages = await fetches.fetch(fetches.queries.getPublishedContentByType('page'), connection);
    // @todo: the routines for pages and posts are nearly identical. abstract that to make CPD happy.
    pages.forEach(async (page, index) => {
        // get page meta keys;
        let pagemeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(page.ID), connection);
        page.wpmeta = {}
        pagemeta.forEach(meta => {
            page.wpmeta[meta.meta_key] = meta.meta_value
        });

        let mutatedPage = mutators.mutatePage(page);
        await config.fwrite(mutatedPage.fcontent, path.resolve(config.paths.outPages, mutatedPage.fname));
    });
};

const handlePosts = async (connection) => {
    let posts = await fetches.fetch(fetches.queries.getPublishedContentByType('post'), connection);
    posts.forEach(async (post, index) => {
        // get page meta keys;
        let pagemeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(post.ID), connection);
        post.wpmeta = {}
        pagemeta.forEach(meta => {
            post.wpmeta[meta.meta_key] = meta.meta_value
        });
        //
        let mutatedPosts = mutators.mutatePage(post);
        await config.fwrite(mutatedPosts.fcontent, path.resolve(config.paths.outPosts, mutatedPosts.fname));
    })
};

const handleNavs = async (connection) => {
    return new Promise(async resolve => {
        let navmenus = await fetches.fetch(fetches.queries.getAllNavMenus, connection);
        let processedMenus = 0; // used later to gate our exit inside the foreach loop
        navmenus.forEach(async (menu, index) => {
            let menuitems = await fetches.fetch(fetches.queries.getNavItemsByMenuId(menu.term_id), connection);
            let processedItems = 0;
            menuitems.map(async (item, index) => {
                //-- will use nav_menu_item meta to rebuild page link
                let itemMeta = await fetches.fetch(fetches.queries.getNavMenuTarget(item.ID), connection);
                let targetItemParams = {
                    type: itemMeta.filter(meta => {
                        return meta.meta_key === "_menu_item_object"
                    })[0].meta_value,
                    id: itemMeta.filter(meta => {
                        return meta.meta_key === "_menu_item_object_id";
                    })[0].meta_value
                };
                let targetItem = await fetches.fetch(fetches.queries.getPostById(targetItemParams.id), connection);
                targetItem = targetItem[0];
                if (targetItem) {
                    menuitems[index] = {
                        ID: item.ID,
                        targetParams: targetItemParams,
                        resolved: {
                            ID: targetItem.ID,
                            post_name: targetItem.post_name,
                            post_title: targetItem.post_title
                        }
                    };
                }

                processedItems++;
                if (processedItems === menuitems.length) { //-- done with this menu
                    let fname = `${menu.term_id}__${menu.slug}.json`;
                    await config.fwrite(
                        JSON.stringify({menu, menuitems}, null, 2),
                        path.resolve(config.paths.outMenus, fname)
                    );

                    processedMenus++;
                    if (processedMenus === navmenus.length - 1) {
                        resolve();
                    }
                }
            })
        });
    })
};

const handleTopics = async (connection) => {
    let topics = await fetches.fetch(fetches.queries.getPublishedContentByType('topic'), connection);
    let replies = await fetches.fetch(fetches.queries.getPublishedContentByType('reply'), connection);

    debugger;
}

module.exports = {
    handlePages,
    handlePosts,
    handleNavs,
    handleTopics,
};