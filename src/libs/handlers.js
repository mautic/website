const path = require('path');
const fs = require('fs');
const config = require('./config');
const fetches = require('./fetch');
const utils = require('./utils');

/**
 * Collects users.
 * @todo error: connection closes before the last few inserts run
 * @param sourceDataConn
 * @param targetDataConn
 * @returns {Promise<void>}
 */
const handleUsers = async (sourceDataConn, targetDataConn) => {
    return new Promise(async (resolve) => {
        let wpUsers = await fetches.queryConnection(
            fetches.queries.getUsers,
            sourceDataConn
        );
        let octoUsers = wpUsers.map((user) => {
            let registerdate = new Date(user.user_registered)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
            let updatedate = new Date()
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
            return {
                id: user.ID,
                name: user.display_name,
                surname: '', // @todo: hydrate usermeta to breakout fname/lname
                email: user.user_email,
                password: '---',
                isActivated: 1,
                username: user.user_login,
                mtcorgPoints: 0,
                createdAt: registerdate,
                activatedAt: registerdate,
                updatedAt: updatedate
            };
        });

        // get a new site-db connection
        // @todo: deprecate this for getSiteDbConn
        // let siteDb = await config.getDbConnection(config.db_connParams.db_localdev);
        let processedUsers = 0;
        console.log(`inserting ${octoUsers.length} users`);
        octoUsers.forEach(async (user) => {
            await fetches.queryConnection(
                fetches.queries.insertUser(user),
                targetDataConn
            );
            processedUsers++;

            if (processedUsers % 100 === 0)
                console.log(`--- processed ${processedUsers}/${octoUsers.length}`);

            if (processedUsers === octoUsers.length) {
                console.log(`processed all users`);
                sourceDataConn.end((err) => {
                    if (err) throw err;
                });
                resolve();
            }
        });
    });
};

/**
 * Collect wp nav menus @todo
 * @param connection
 * @returns {Promise<any>}
 */
const handleNavs = async (connection) => {
    return new Promise(async (resolve) => {
        let navmenus = await fetches.queryConnection(
            fetches.queries.getAllNavMenus,
            connection
        );
        let processedMenus = 0; // used later to gate our exit inside the foreach loop
        navmenus.forEach(async (menu, index) => {
            let menuitems = await fetches.queryConnection(
                fetches.queries.getNavItemsByMenuId(menu.term_id),
                connection
            );
            let processedItems = 0;
            menuitems.map(async (item, index) => {
                //-- will use nav_menu_item meta to rebuild page link
                let itemMeta = await fetches.queryConnection(
                    fetches.queries.getNavMenuTarget(item.ID),
                    connection
                );
                let targetItemParams = {
                    type: itemMeta.filter((meta) => {
                        return meta.meta_key === '_menu_item_object';
                    })[0].meta_value,
                    id: itemMeta.filter((meta) => {
                        return meta.meta_key === '_menu_item_object_id';
                    })[0].meta_value
                };
                let targetItem = await fetches.queryConnection(
                    fetches.queries.getPostById(targetItemParams.id),
                    connection
                );
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
                if (processedItems === menuitems.length) {
                    //-- done with this menu
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
            });
        });
    });
};

module.exports = {
    handleUsers,
    handleNavs,
    handleForumTree,
    handleForumUsers,
    handleForumMetrics
};
