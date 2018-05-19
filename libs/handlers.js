const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');
const fetches = require('./fetch');
const mutators = require('./mutators');

const getSiteDbConn = async () => {
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3307,
        database: 'mtorg_db',
        user: 'root',
        password: 'dockerpass'
    });
    return new Promise(resolve => {
        connection.connect(err => {
            if (err) throw err;
            resolve(connection);
        })
    })
}

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
        // @todo: deprecate this for getSiteDbConn
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
    /*
    * wp | oc
    * __________
    * forum | channel > top-level groupings
    * topic | topic > conversation top-level
    * reply | post > message inside a conversation
    * */
    const cacheRebuild = false;
    const cacheFile = path.resolve(config.paths.cacheBase, 'forums.json');
    let forums, topics, replies;
    if (cacheRebuild) {
        forums = await fetches.fetch(fetches.queries.getPublishedContentByType('forum'), connection);
        topics = await fetches.fetch(fetches.queries.getPublishedContentByType('topic'), connection);
        replies = await fetches.fetch(fetches.queries.getPublishedContentByType('reply'), connection);


        //---------- traversing the forum>topic>reply tree
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
        await config.fwrite(JSON.stringify({
            forums,
            topics,
            replies,
        }), cacheFile);
    }
    else {
        let cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        forums = cached.forums;
        topics = cached.topics;
        replies = cached.replies;
    }

    const translateWpForum = (wpforum) => {
        return {
            parentId: wpforum.post_parent === 0 ? 'null' : wpforum.post_parent,
            id: wpforum.ID,
            title: wpforum.post_title,
            slug: wpforum.post_name,
        }
    };
    const translateWpTopic = (wptopic) => {
        return {
            id: wptopic.ID,
            subject: wptopic.post_title,
            slug: wptopic.post_name,
            channelId: wptopic.post_parent,
            startMemberId: wptopic.post_author,
            lastPostId: 0,
            lastPostMemberId: 0,
        }
    }
    const translateWpReply = (wpreply) => {
        return {
            id: wpreply.ID,
            subject: "...",
            content: wpreply.post_content,
            content_html: wpreply.post_content,
            topicId: wpreply.post_parent,
            memberId: wpreply.post_author,
            mtcorgPoints: 0,
        }
    }

    // upserts
    const siteDb = await getSiteDbConn();
    return new Promise(resolve => {

        /*
                let processedforums = 0;
                forums.forEach((wpforum, forumIndex) => {
                    let octoforum = translateWpForum(wpforum);
                    let query_insertForum = `insert into rainlab_forum_channels (id, title, slug) VALUES(${octoforum.id}, "${octoforum.title}", "${octoforum.slug}");`;
                    // insert forum
                    siteDb.query(query_insertForum, (err, results) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        forums[forumIndex].octoforum = octoforum;
                        processedforums++;
                        console.log(`------ [FORUMS] processed: ${processedforums}/${forums.length}`);
                    })

                })
        */

        let processedtopics = 0;
        topics.forEach((wptopic, topicIndex) => {
            let octotopic = translateWpTopic(wptopic);
            // let query_insertTopic = `insert into rainlab_forum_topics (id, subject, slug, channel_id, start_member_id) VALUES (${octotopic.id}, "${octotopic.subject}","${octotopic.slug}", ${octotopic.channelId}, ${octotopic.startMemberId});`;
            let query_insertTopic = `insert into rainlab_forum_topics (id, subject, slug, channel_id, start_member_id) VALUES (?, ?, ?, ?, ?);`;
            siteDb.query(
                query_insertTopic,
                [
                    octotopic.id,
                    octotopic.subject,
                    octotopic.slug,
                    octotopic.channelId,
                    octotopic.memberId,
                ],
                (err, results) => {
                    if (err && err.errno !== 1062) {
                        console.error(err);
                    }
                    processedtopics++;
                    processedtopics % 100 === 0 ? console.log(`------ [TOPICS] processed: ${processedtopics}/${topics.length}`) : null;
                    processedtopics === topics.length ? console.log(`------ [TOPICS FINISHED]: processed ${processedtopics} of ${topics.length}`) : null;
                });

        });

        let processedreplies = 0;
        replies.forEach((wpreply, index) => {
            let octoreply = translateWpReply(wpreply);
            let query_insertReply = `INSERT INTO rainlab_forum_posts (id, subject, content, content_html, topic_id, member_id, mtcorg_points) VALUES (?,?,?,?,?,?,0)`;

            siteDb.query(
                query_insertReply,
                [
                    octoreply.id,
                    octoreply.subject,
                    octoreply.content,
                    octoreply.content_html,
                    octoreply.topicId,
                    octoreply.memberId
                ],
                (err, results) => {
                    if (err && err.errno !== 1062) {
                        console.error(err);
                    }
                    processedreplies++;
                    processedreplies % 100 === 0 ? console.log(`------ [REPLIES] processed: ${processedreplies}/${replies.length}`) : null;
                    processedreplies === replies.length ? console.log(`------ [REPLIES FINISHED]: processed ${processedreplies} of ${replies.length}`) : null;
                })
        })
    })
}

module.exports = {
    handleUsers,
    handlePages,
    handlePosts,
    handleNavs,
    handleTopics
};