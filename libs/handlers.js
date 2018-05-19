const path = require('path');
const mysql = require('mysql');
const config = require('./config');
const fetches = require('./fetch');
const mutators = require('./mutators');

/**
 * Collects users.
 * @todo error: connection closes before the last few inserts run
 * @param connection
 * @returns {Promise<void>}
 */
const handleUsers = async (connection) => {
    return new Promise(async resolve => {
        let wpUsers = await fetches.fetch(fetches.queries.getUsers, connection);
        let octoUsers = wpUsers.map(user => {
            let registerdate = new Date(user.user_registered).toISOString().slice(0, 19).replace('T', ' ');
            let updatedate = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
                updatedAt: updatedate,
            };
        });

        // get a new site-db connection
        let siteDb = mysql.createConnection({
            host: '127.0.0.1',
            port: 3307,
            database: 'mtorg_db',
            user: 'root',
            password: 'dockerpass'
        });
        siteDb.connect(err => {
            if (err) throw err;

            let processedUsers = 0;
            console.log(`inserting ${octoUsers.length} users`);
            octoUsers.forEach(async user => {
                await fetches.fetch(fetches.queries.insertUser(user), siteDb);
                processedUsers++;

                if (processedUsers % 100 === 0) console.log(`--- processed ${processedUsers}/${octoUsers.length}`)

                if (processedUsers === octoUsers.length) {
                    console.log(`processed all users`)
                    connection.end(err => {
                        if (err) throw err
                    })
                    resolve();
                }
            })
        })
    })
}

/**
 * Collect page/meta, format and write to fs for october
 * @param connection
 * @returns {Promise<void>}
 */
const handlePages = async (connection) => {
    let pages = await fetches.fetch(fetches.queries.getPublishedContentByType('page'), connection);
    // @todo: the routines for pages and posts are nearly identical. abstract that to make CPD happy.
    pages.forEach(async (page, index) => {
        // get page meta keys;
        let pagemeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(page.ID), connection);
        page.urlpath = "";
        page.wpmeta = {};
        pagemeta = pagemeta.filter(meta => {
            return meta.meta_key !== "_pgm_post_meta";
        })
        pagemeta.forEach(meta => {
            page.wpmeta[meta.meta_key] = meta.meta_value
        });

        let mutatedPage = mutators.mutatePage(page);
        //-- write content file
        const contentFilename = `pages/${mutatedPage.fnamebase}.${mutatedPage.fcontentFormat}`;
        await config.fwrite(mutatedPage.fcontent, path.resolve(config.paths.outContentBase, contentFilename));
        //-- write page file
        await config.fwrite(`${mutatedPage.fconfig}\n==\n{% content '${contentFilename}' %}`, path.resolve(config.paths.outPages, mutatedPage.fname));
    });
};

/**
 * Collect post/meta, format and write to fs for october
 * @param connection
 * @returns {Promise<void>}
 */
const handlePosts = async (connection) => {
    let posts = await fetches.fetch(fetches.queries.getPublishedContentByType('post'), connection);
    posts.forEach(async (post, index) => {
        // get page meta keys;
        let pagemeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(post.ID), connection);
        post.urlpath = "blog/";
        post.wpmeta = {};
        pagemeta.forEach(meta => {
            post.wpmeta[meta.meta_key] = meta.meta_value
        });
        //
        let mutatedPost = mutators.mutatePage(post);

        //-- write content file
        const contentFilename = `posts/${mutatedPost.fnamebase}.${mutatedPost.fcontentFormat}`;
        await config.fwrite(mutatedPost.fcontent, path.resolve(config.paths.outContentBase, contentFilename));
        //-- write page file
        await config.fwrite(`${mutatedPost.fconfig}\n==\n{% content '${contentFilename}' %}`, path.resolve(config.paths.outPosts, mutatedPost.fname));
    })
};

/**
 * Collect wp nav menus @todo
 * @param connection
 * @returns {Promise<any>}
 */
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

/**
 * Collect forum topics
 * @todo depends on users
 * @param connection
 * @returns {Promise<void>}
 */
const handleTopics = async (connection) => {
    let forums = await fetches.fetch(fetches.queries.getPublishedContentByType('forum'), connection);
    let topics = await fetches.fetch(fetches.queries.getPublishedContentByType('topic'), connection);
    let replies = await fetches.fetch(fetches.queries.getPublishedContentByType('reply'), connection);

    topics.forEach(async (topic, index) => {
        let topicReplies = replies.filter(reply => {
            return reply.post_parent == topic.ID;
        });
        topics[index].childReplies = topicReplies;
    });
    forums.forEach(async (forum, index) => {
        let forumTopics = topics.filter(topic => {
            return topic.post_parent == forum.ID;
        });
        let forumForums = forums.filter(forum => {
            return forum.post_parent == forum.ID;
        })
        forums[index] = {
            ID: forum.ID,
            commentCount: forum.commentCount,
            guid: forum.guid,
            post_content: forum.post_content,
            post_author: forum.post_author,
            post_title: forum.post_title,
            post_name: forum.post_name,
            post_status: forum.post_status,
            childTopics: forumTopics,
            childForums: forumForums,
        }
    });
    debugger;
}

module.exports = {
    handleUsers,
    handlePages,
    handlePosts,
    handleNavs,
    handleTopics
};