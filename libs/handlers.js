const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');
const fetches = require('./fetch');
const mutators = require('./mutators');
const utils = require('./utils');

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

const getArrayChunks = (chunk, chunkSize = 100) => {
    let i = 0;
    let j = 0;
    let chunks = [];
    for (i = 0, j = chunk.length; i < j; i += chunkSize) {
        let slice = chunk.slice(i, i + chunkSize);
        chunks.push(slice);
    }
    return chunks;
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
    let pagePromises = [];
    pages.forEach(async (page, index) => {
        let pp = new Promise(async pageResolve => {
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

            pageResolve();
        })
        pagePromises.push(pp)
    });
    return new Promise(resolve => {
        Promise.all(pagePromises)
            .then(pages => {
                resolve(pages)
            })
    })
};

/**
 * Collect post/meta, format and write to fs for october
 * @param connection
 * @returns {Promise<void>}
 */
const handlePosts = async (connection) => {
    let posts = await fetches.fetch(fetches.queries.getPublishedContentByType('post'), connection);
    let postPromises = [];

    posts.forEach(async (post, index) => {
        let pp = new Promise(async postResolve => {
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
            postResolve();
        })
        postPromises.push(pp)
    });

    return new Promise(resolve => {
        Promise.all(postPromises)
            .then(posts => {
                resolve(posts)
            })
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
const handleForumTree = async (connection) => {
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
            created: utils.wpDateToMySqlTimeStamp(wptopic.post_date),
        }
    };
    const translateWpReply = (wpreply) => {
        return {
            id: wpreply.ID,
            subject: "...",
            content: wpreply.post_content,
            content_html: wpreply.post_content,
            topicId: wpreply.post_parent,
            memberId: wpreply.post_author,
            mtcorgPoints: 0,
            created: utils.wpDateToMySqlTimeStamp(wpreply.post_date)
        }
    };

    const doForums = async (forums) => {
        let processedforums = 0;
        let forumPromises = [];
        forums.forEach((wpforum, forumIndex) => {
            let octoforum = translateWpForum(wpforum);
            let query_insertForum = `insert into rainlab_forum_channels (id, title, slug) VALUES(${octoforum.id}, "${octoforum.title}", "${octoforum.slug}");`;
            let fp = new Promise(fResolve => {
                siteDb.query(query_insertForum, (err, results) => {
                    if (err && err.errno !== 1062) {
                        console.error(err);
                    }
                    forums[forumIndex].octoforum = octoforum;
                    processedforums++;
                    console.log(`------ [FORUMS] processed: ${processedforums}/${forums.length}`);
                    fResolve(results);
                })
            })
            forumPromises.push(fp);
        });
        return new Promise(forumsResolve => {
            Promise.all(forumPromises)
                .then(forumRes => {
                    forumsResolve(forumRes)
                })
        })
    }
    const doTopics = async (topics) => {
        let processedtopics = 0;
        let topicPromises = [];
        topics.forEach((wptopic, topicIndex) => {
            let octotopic = translateWpTopic(wptopic);
            let table = 'rainlab_forum_topics';
            let query_insertTopic = `insert into ${table} (id, subject, slug, channel_id, start_member_id, created_at) VALUES (?, ?, ?, ?, ?, ?);`;
            let values_insertTopic = [
                octotopic.id,
                octotopic.subject,
                octotopic.slug,
                octotopic.channelId,
                octotopic.memberId,
                octotopic.created
            ];

            let tp = new Promise(tpResolve => {
                siteDb.query(
                    query_insertTopic,
                    values_insertTopic,
                    (err, results) => {
                        if (err && err.errno !== 1062) {
                            console.error(err);
                        }
                        processedtopics++;
                        processedtopics % 100 === 0 ? console.log(`------ [TOPICS] processed: ${processedtopics}/${topics.length}`) : null;
                        processedtopics === topics.length ? console.log(`------ [TOPICS FINISHED]: processed ${processedtopics} of ${topics.length}`) : null;
                        tpResolve(results)
                    })
            })
            topicPromises.push(tp);
        });
        return new Promise(topicsResolve => {
            Promise.all(topicPromises)
                .then(topicRes => {
                    topicsResolve(topicRes);
                })
        })
    }

    const batchInsertReplies = async (replies) => {
        return new Promise(resolve => {
            let table = 'rainlab_forum_posts';
            let batchInsertStmt = `INSERT INTO ${table} (id, subject, content, content_html, topic_id, member_id, mtcorg_points, created_at, updated_at) VALUES `;
            let value_statements = replies.map(wpreply => {
                let octoreply = translateWpReply(wpreply);
                return `(
                ${octoreply.id},
                ${siteDb.escape(octoreply.subject)},
                ${siteDb.escape(octoreply.content)}, ${siteDb.escape(octoreply.content_html)}, 
                ${octoreply.topicId}, ${octoreply.memberId}, 
                0,
                "${octoreply.created}", "${octoreply.created}")`
            });

            let chunkInserts = getArrayChunks(value_statements, 100)
                .map(chunk => {
                    return `${batchInsertStmt} ${chunk.join(',')}`
                })

            let chunkPromises = [];
            chunkInserts.forEach(insert => {
                let p = new Promise(resolve => {
                    siteDb.query(
                        insert,
                        (err, results) => {
                            if (err) console.log(err)
                            resolve(results);
                        }
                    )
                })
                chunkPromises.push(p);
            });

            Promise.all(chunkPromises)
                .then(results => {
                    resolve(results);
                })
        })
    }

    /**
     * @deprecated this is a monster of a thing, because it runs 1:1 queries, use batchInsertReplies instead
     * @param replies
     * @returns {Promise<any>}
     */
    const doReplies = async (replies) => {
        let processedreplies = 0;
        let resolvedReplies = 0;
        let replyPromises = [];
        replies.forEach((wpreply, index) => {
            let octoreply = translateWpReply(wpreply);
            let table = 'rainlab_forum_posts';
            // insert
            let query_insertReply = `INSERT INTO ${table} (id, subject, content, content_html, topic_id, member_id, mtcorg_points, created_at, updated_at) VALUES (?,?,?,?,?,?,0,?,?)`;
            let values_insertReply = [
                octoreply.id,
                octoreply.subject,
                octoreply.content,
                octoreply.content_html,
                octoreply.topicId,
                octoreply.memberId,
                octoreply.created,
                octoreply.created,
            ];
            let rp = new Promise(rpResolve => {
                siteDb.query(
                    query_insertReply,
                    values_insertReply,
                    (err, results) => {
                        if (err && err.errno !== 1062) {
                            console.error(err);
                        }
                        resolvedReplies++;
                        resolvedReplies % 100 === 0 ? console.log(`------ [REPLIES] processed: ${resolvedReplies}/${replies.length}`) : null;
                        resolvedReplies === replies.length ? console.log(`------ [REPLIES FINISHED]: processed ${resolvedReplies} of ${replies.length}`) : null;
                        rpResolve(results);
                    })
            })
            replyPromises.push(rp);
            processedreplies++;
        });
        return new Promise(repliesResolve => {
            Promise.all(replyPromises)
                .then(replyRes => {
                    repliesResolve(replyRes);
                })
        })
    };

    const siteDb = await getSiteDbConn();
    return new Promise(async forumResolve => {

        // let resolvedForums = await doForums(forums);
        // let resolvedTopics = await doTopics(topics);
        let resolvedReplies = await batchInsertReplies(replies);
        forumResolve({
            resolvedForums: '',
            resolvedTopics: '',
            resolvedReplies: resolvedReplies
        })
    })
};

/**
 * Create rainlab_forum users from october users
 * @param connection
 */
const handleForumUsers = async () => {
    return new Promise(async resolve => {
        let siteDb = await getSiteDbConn();
        let moduleLabel = 'FORUM USERS';
        let query_getFeUsers = `SELECT * FROM users;`
        let query_insertForumUser = `INSERT INTO rainlab_forum_members (id, user_id, username, slug, created_at) VALUES (?,?,?,?,?)`;

        let feUsers = await fetches.fetch(query_getFeUsers, siteDb);

        let processedUsers = 0;
        let resolved = 0;
        let promises = [];
        feUsers.forEach(feUser => {
            let p = new Promise(resolve => {
                let values_insertForumUser = [
                    feUser.id,
                    feUser.id,
                    feUser.username,
                    `${feUser.username}_${feUser.id}`,
                    feUser.created_at
                ];
                siteDb.query(
                    query_insertForumUser,
                    values_insertForumUser,
                    (err, results) => {
                        if (err && err.errno !== 1062) {
                            console.error(err);
                        }
                        resolved++;
                        resolved % 100 === 0 ? console.log(`------ [${moduleLabel}] processed: ${resolved}/${feUsers.length}`) : null;
                        resolved === feUsers.length ? console.log(`------ [${moduleLabel} FINISHED]: processed ${resolved} of ${feUsers.length}`) : null;
                        resolve(results)
                    })
            })
            promises.push(p);
            processedUsers++;
        });
        Promise.all(promises)
            .then(res => {
                resolve(res);
            })
    })
}

const handleForumMetrics = async () => {
    const collectAllPromises = async (promises) => {
        return new Promise(resolve => {
            Promise.all(promises)
                .then(resolved => {
                    resolve(resolved)
                })
        })
    }

    const siteDb = await getSiteDbConn();

    //-- enrich topics
    let topicPromisesAll = 0;
    let topicPromisesResolved = 0;
    const loadTopicIds = async () => {
        let query = `select id from rainlab_forum_topics LIMIT 0,20`;
        let topicIds = await fetches.fetch(query, siteDb);
        return topicIds.map(topic => {
            return topic.id
        });
    };
    const batchCountPostsInTopics = async () => {
        return new Promise(resolve => {
            let query_batchpostsintopics = `
                SELECT
                    topics.id, count(*) posts
                    from rainlab_forum_posts posts
                    left join rainlab_forum_topics topics on posts.topic_id = topics.id
                    where topics.id IS NOT NULL
                    group by topics.id;
            `;
            siteDb.query(
                query_batchpostsintopics,
                (err, results) => {
                    if (err) console.log(err);
                    resolve(results);
                }
            )
        })
    }
    const updateTopicsPostCount = async (countResults) => {
        topicPromisesAll = countResults.length;
        return new Promise(async resolve => {
            let promises_updatetopicpostcount = [];
            countResults.forEach(row => {
                let rp = new Promise(rpResolve => {
                    siteDb.query(
                        `update rainlab_forum_topics SET count_posts = ? where id = ?;`,
                        [row.posts, row.id],
                        (err, results) => {
                            topicPromisesResolved++;
                            console.log(`updated topic counts: ${topicPromisesResolved}/${topicPromisesAll}`)
                            rpResolve(results)
                        }
                    )
                });
                promises_updatetopicpostcount.push(rp)
            });
            let results = await collectAllPromises(promises_updatetopicpostcount);
            resolve(results);
        })
    }
    /*
        // get count of posts per topic, update topic records count_posts
        let allTopicsPostsCounts = await batchCountPostsInTopics();
        let updatedTopics = await updateTopicsPostCount(allTopicsPostsCounts);
    */

    //-- enrich channels
    let channelPromisesAll = 0;
    let channelPromisesResolved = 0;
    const batchCountPostsInChannel = async () => {
        return new Promise(resolve => {
            let query_batchcountpostsinchannel = `
                SELECT channels.id, count(*) topicsCount, sum(topics.count_posts) postsCount
                from rainlab_forum_topics topics
                left join rainlab_forum_channels channels on topics.channel_id = channels.id
                where channels.id IS NOT NULL
                group by channels.id
            `
            siteDb.query(
                query_batchcountpostsinchannel,
                (err, results) => {
                    if (err) console.log(err);
                    resolve(results);
                }
            )
        })
    };
    const updateChannelsTallies = async (countResults) => {
        channelPromisesAll = countResults.length;
        return new Promise(async resolve => {
            let promises_updatechannelstallies = [];
            countResults.forEach(row => {
                let rp = new Promise(rpResolve => {
                    siteDb.query(
                        `UPDATE rainlab_forum_channels SET count_topics=?, count_posts=? where id=?;`,
                        [
                            row.topicsCount,
                            row.postsCount,
                            row.id
                        ],
                        (err, results) => {
                            channelPromisesResolved++;
                            console.log(`updated topic counts: ${channelPromisesResolved}/${channelPromisesAll}`)
                            rpResolve(results)
                        }
                    );
                });
                promises_updatechannelstallies.push(rp)
            })
            let results = await collectAllPromises(promises_updatechannelstallies);
            resolve(results)
        })
    }
    /*
        // get count of topics and posts in channels
        let allChannelsPostsCounts = await batchCountPostsInChannel();
        let updatedPosts = await updateChannelsTallies(allChannelsPostsCounts);
    */


    debugger;
}

module.exports = {
    handleUsers,
    handlePages,
    handlePosts,
    handleNavs,
    handleForumTree,
    handleForumUsers,
    handleForumMetrics,
};