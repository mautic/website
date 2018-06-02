const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');
const fetches = require('./fetch');
const mutators = require('./mutators');
const utils = require('./utils');

const getArrayChunks = (chunk, chunkSize = 100) => {
  let i = 0;
  let j = 0;
  let chunks = [];
  for (i = 0, j = chunk.length; i < j; i += chunkSize) {
    let slice = chunk.slice(i, i + chunkSize);
    chunks.push(slice);
  }
  return chunks;
};

/**
 * Collects users.
 * @todo error: connection closes before the last few inserts run
 * @param stagingConnection
 * @param localdevConnection
 * @returns {Promise<void>}
 */
const handleUsers = async (stagingConnection, localdevConnection) => {
  return new Promise(async (resolve) => {
    let wpUsers = await fetches.queryConnection(
        fetches.queries.getUsers,
        stagingConnection
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
          localdevConnection
      );
      processedUsers++;

      if (processedUsers % 100 === 0)
        console.log(`--- processed ${processedUsers}/${octoUsers.length}`);

      if (processedUsers === octoUsers.length) {
        console.log(`processed all users`);
        stagingConnection.end((err) => {
          if (err) throw err;
        });
        resolve();
      }
    });
  });
};

/**
 * Collect page/meta, format and write to fs for october
 */
const handlePages = async (connection) => {
  let pages = await fetches.queryConnection(
      fetches.queries.getPublishedContentByType('page'),
      connection
  );
  let pagePromises = pages.map((page) => {
    return new Promise(async (pageResolve) => {
      // get page meta keys;
      let pagemeta = await fetches.queryConnection(
          fetches.queries.getPostMetaRowsForId(page.ID),
          connection
      );
      page.urlpath = '';
      page.wpmeta = {};
      pagemeta = pagemeta.filter((meta) => {
        return meta.meta_key !== '_pgm_post_meta';
      });
      pagemeta.forEach((meta) => {
        page.wpmeta[meta.meta_key] = meta.meta_value;
      });

      let mutatedPage = mutators.mutatePage(page);
      //-- write content file
      const contentFilename = `pages/${mutatedPage.fnamebase}.${
          mutatedPage.fcontentFormat
          }`;
      await config.fwrite(
          mutatedPage.fcontent,
          path.resolve(config.paths.outContentBase, contentFilename)
      );
      //-- write page file
      await config.fwrite(
          `${mutatedPage.fconfig}\n==\n{% content '${contentFilename}' %}`,
          path.resolve(config.paths.outPages, mutatedPage.fname)
      );

      pageResolve(mutatedPage);
    });
  });
  return await utils.collectAllPromises(pagePromises);
};

/**
 * Collect post/meta, format and write to fs for october
 */
const handlePosts = async (connection) => {
  let posts = await fetches.queryConnection(
      fetches.queries.getPublishedContentByType('post'),
      connection
  );
  let postPromises = posts.map((post) => {
    return new Promise(async (postResolve) => {
      // get page meta keys;
      let pagemeta = await fetches.queryConnection(
          fetches.queries.getPostMetaRowsForId(post.ID),
          connection
      );
      post.urlpath = 'blog/';
      post.wpmeta = {};
      pagemeta.forEach((meta) => {
        post.wpmeta[meta.meta_key] = meta.meta_value;
      });
      //
      let mutatedPost = mutators.mutatePage(post);

      //-- write content file
      const contentFilename = `posts/${mutatedPost.fnamebase}.${
          mutatedPost.fcontentFormat
          }`;
      await config.fwrite(
          mutatedPost.fcontent,
          path.resolve(config.paths.outContentBase, contentFilename)
      );
      //-- write page file
      await config.fwrite(
          `${mutatedPost.fconfig}\n==\n{% content '${contentFilename}' %}`,
          path.resolve(config.paths.outPosts, mutatedPost.fname)
      );
      postResolve(mutatedPost);
    });
  });
  return await utils.collectAllPromises(postPromises);
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

/**
 * Collect forum topics
 * @param stagingConnection
 * @param localdevConnection
 * @param cacheRebuild
 * @returns {Promise<void>}
 */
const handleForumTree = async (
    stagingConnection,
    localdevConnection,
    cacheRebuild = false
) => {
  const cacheFile = path.resolve(config.paths.cacheBase, 'forums.json');
  let forums, topics, replies;
  if (cacheRebuild) {
    console.log(`rebuilding cache...`);
    //-- get entities from db
    forums = await fetches.queryConnection(
        fetches.queries.getPublishedContentByType('forum'),
        stagingConnection
    );
    topics = await fetches.queryConnection(
        fetches.queries.getPublishedContentByType('topic'),
        stagingConnection
    );
    replies = await fetches.queryConnection(
        fetches.queries.getPublishedContentByType('reply'),
        stagingConnection
    );
    //---------- traversing the forum>topic>reply tree
    topics.forEach(async (topic, index) => {
      let topicReplies = replies.filter((reply) => {
        return reply.post_parent == topic.ID;
      });
      topics[index].childReplies = topicReplies;
    });
    forums.forEach(async (forum, index) => {
      let childTopics = topics.filter((topic) => {
        return topic.post_parent == forum.ID;
      });
      let childForums = forums.filter((forum) => {
        return forum.post_parent == forum.ID;
      });
      forums[index] = {
        ID: forum.ID,
        commentCount: forum.commentCount,
        guid: forum.guid,
        post_content: forum.post_content,
        post_author: forum.post_author,
        post_title: forum.post_title,
        post_name: forum.post_name,
        post_status: forum.post_status,
        post_date: forum.post_date,
        childTopics,
        childForums
      };
    });
    await config.fwrite(
        JSON.stringify({
          forums,
          topics,
          replies
        }),
        cacheFile
    );
    console.log(`...rebuilt forum cache`);
  } else {
    let cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    forums = cache.forums;
    topics = cache.topics;
    replies = cache.replies;
  }

  //-- collect metrics for channels, topics, replies
  forums = forums.map((forum) => {
    // count nested topics and posts
    return Object.assign(forum, {
      description: forum.post_content,
      count_topics: forum.childTopics.length,
      count_posts: forum.childTopics.reduce((current, topic) => {
        return topic.childReplies.length + current;
      }, 0)
    });
  });
  let count_nochild = 0;
  topics = topics
      .filter((topic) => {
        count_nochild++;
        console.log(`NO_CHILD_COUNT:${count_nochild}`);
        return topic.childReplies.length > 0; // @todo: hack-ish workaround for the -1 replies issue. for now, just filter out topics with empty childReplies.
      })
      .map((topic) => {
        //-- organize replies by date asc, assign first and last as object keys
        let organizedReplies = topic.childReplies.sort((a, b) => {
          return new Date(b.post_date) - a.post_date;
        });
        let ret = Object.assign(topic, {
          firstReply: organizedReplies[0],
          recentReply: organizedReplies[organizedReplies.length - 1]
        });
        return ret;
      });

  //-- model translations
  const translateChannel = (wpforum) => {
    return {
      id: wpforum.ID,
      parentId: wpforum.post_parent === 0 ? 'null' : wpforum.post_parent,
      title: wpforum.post_title,
      slug: wpforum.post_name,
      createdAt: utils.formatMysqlTimestamp(wpforum.post_date),
      updatedAt: utils.formatMysqlTimestamp(wpforum.post_date),
      description: wpforum.description,
      countTopics: wpforum.count_topics,
      countPosts: wpforum.count_posts,
      createdAt: wpforum.post_date,
      updatedAt: wpforum.post_date
    };
  };
  const translateWpTopic = (wptopic) => {
    try {
      let ret = {
        id: wptopic.ID,
        subject: wptopic.post_title,
        slug: wptopic.post_name,
        channelId: wptopic.post_parent,
        startMemberId: wptopic.post_author,
        lastPostId: 0,
        lastPostMemberId: 0,
        lastPostAt: '',
        countPosts: 0,
        created: wptopic.post_date
      };
      if (wptopic.childReplies.length > 0) {
        ret = Object.assign(ret, {
          startMemberId: wptopic.childReplies[0].post_author,
          lastPostId: wptopic.childReplies[wptopic.childReplies.length - 1].ID,
          lastPostMemberId:
          wptopic.childReplies[wptopic.childReplies.length - 1].post_author,
          lastPostAt:
          wptopic.childReplies[wptopic.childReplies.length - 1].post_date,
          countPosts: wptopic.childReplies.length
        });
      }
      return ret;
    } catch (e) {
      debugger;
    }
  };
  const translateWpReply = (wpreply) => {
    return {
      id: wpreply.ID,
      subject: '...',
      content: wpreply.post_content,
      content_html: wpreply.post_content,
      topicId: wpreply.post_parent,
      memberId: wpreply.post_author,
      mtcorgPoints: 0,
      created: utils.formatMysqlTimestamp(wpreply.post_date)
    };
  };

  //-- model loaders
  const loadForumChannels = async (forums) => {
    let table = `rainlab_forum_channels`;
    let batchInsertStmt = `insert into rainlab_forum_channels (id, parent_id, title, slug, description, count_topics, count_posts, created_at, updated_at) VALUES `;

    let value_statements = forums.map((wpforum) => {
      let octoforum = translateChannel(wpforum);
      return `(
                ${octoforum.id}, ${octoforum.parentId || 0}, 
                "${octoforum.title}", "${octoforum.slug}", 
                ${stagingConnection.escape(
          octoforum.description.substring(0, 191)
      )},
                ${octoforum.countTopics}, ${octoforum.countPosts},
                "${utils.formatMysqlTimestamp(
          octoforum.createdAt
      )}", "${utils.formatMysqlTimestamp(octoforum.updatedAt)}"
            )`;
    });

    let chunkInserts = getArrayChunks(value_statements, 500).map((chunk) => {
      return `${batchInsertStmt} ${chunk.join(',')}`;
    });
    let resolvedChunks = 0;
    let chunkPromises = chunkInserts.map((insert) => {
      return new Promise((resolve) => {
        localdevConnection.query(insert, (err, results) => {
          if (err) {
            console.log(err);
            debugger;
          }
          resolvedChunks++;
          console.log(
              `resolved [channel] chunks: ${resolvedChunks}/${
                  chunkInserts.length
                  }`
          );
          resolve(results);
        });
      });
    });
    return await utils.collectAllPromises(chunkPromises);
  };
  // @todo: there are quite a few topics that report -1 replies on front-end - indicated no childReplies (not even self?)
  const loadForumTopics = async (topics) => {
    let table = 'rainlab_forum_topics';

    let batchInsertStmt = `insert into ${table} (id, subject, slug, channel_id, start_member_id, last_post_id, last_post_member_id, last_post_at, count_posts, created_at, updated_at) VALUES`;
    let value_statements = topics.map((wptopic) => {
      let octotopic = translateWpTopic(wptopic);
      return `(
                ${octotopic.id}, 
                ${stagingConnection.escape(
          octotopic.subject
      )}, ${stagingConnection.escape(octotopic.slug)},
                ${octotopic.channelId}, 
                ${octotopic.startMemberId}, ${octotopic.lastPostId}, ${
          octotopic.lastPostMemberId
          }, "${utils.formatMysqlTimestamp(octotopic.lastPostAt)}",
                ${octotopic.countPosts}, 
                "${utils.formatMysqlTimestamp(
          octotopic.created
      )}", "${utils.formatMysqlTimestamp(
          octotopic.created
      )}"                 
            )`;
    });
    let chunkInserts = getArrayChunks(value_statements, 500).map((chunk) => {
      return `${batchInsertStmt} ${chunk.join(',')}`;
    });
    let resolvedChunks = 0;
    let chunkPromises = chunkInserts.map((insert) => {
      return new Promise((resolve) => {
        localdevConnection.query(insert, (err, results) => {
          if (err) {
            console.log(err);
            debugger;
          }
          resolvedChunks++;
          console.log(
              `resolved [topic] chunks: ${resolvedChunks}/${chunkInserts.length}`
          );
          resolve(results);
        });
      });
    });

    return await utils.collectAllPromises(chunkPromises);
  };
  const loadForumReplies = async (replies) => {
    let table = 'rainlab_forum_posts';
    let batchInsertStmt = `INSERT INTO ${table} (id, subject, content, content_html, topic_id, member_id, mtcorg_points, created_at, updated_at) VALUES `;
    let value_statements = replies.map((wpreply) => {
      let octoreply = translateWpReply(wpreply);
      return `(
                ${octoreply.id},
                ${localdevConnection.escape(octoreply.subject)},
                ${localdevConnection.escape(
          octoreply.content
      )}, ${localdevConnection.escape(octoreply.content_html)}, 
                ${octoreply.topicId}, ${octoreply.memberId}, 
                0,
                "${octoreply.created}", "${octoreply.created}")`;
    });

    let resolvedChunks = 0;
    let chunkInserts = getArrayChunks(value_statements, 500).map((chunk) => {
      return `${batchInsertStmt} ${chunk.join(',')}`;
    });
    let chunkPromises = chunkInserts.map((insert) => {
      return new Promise((resolve) => {
        localdevConnection.query(insert, (err, results) => {
          if (err) console.log(err);
          resolvedChunks++;
          console.log(
              `resolved [reply] chunks: ${resolvedChunks}/${chunkInserts.length}`
          );
          resolve(results);
        });
      });
    });

    return await utils.collectAllPromises(chunkPromises);
  };

  //-- execute routines
  return new Promise(async (resolve) => {
    let resolvedForums = await loadForumChannels(forums);
    let resolvedTopics = await loadForumTopics(topics);
    let resolvedReplies = await loadForumReplies(replies);
    resolve({
      resolvedForums,
      resolvedTopics,
      resolvedReplies
    });
  });
};

/**
 * Create rainlab_forum users from october users
 * @param connection
 */
const handleForumUsers = async (connection) => {
  return new Promise(async (resolve) => {
    let moduleLabel = 'FORUM USERS';
    let query_getFeUsers = `SELECT * FROM users;`;
    let query_insertForumUser = `INSERT INTO rainlab_forum_members (id, user_id, username, slug, created_at) VALUES (?,?,?,?,?)`;

    let frontendUsers = await fetches.queryConnection(
        query_getFeUsers,
        connection
    );

    let processedUsers = 0;
    let resolved = 0;
    let promises = [];
    frontendUsers.forEach((feUser) => {
      let p = new Promise((resolve) => {
        let values_insertForumUser = [
          feUser.id,
          feUser.id,
          feUser.username,
          `${feUser.username}_${feUser.id}`,
          feUser.created_at
        ];
        connection.query(
            query_insertForumUser,
            values_insertForumUser,
            (err, results) => {
              if (err && err.errno !== 1062) {
                console.error(err);
              }
              resolved++;
              resolved % 100 === 0
                  ? console.log(
                  `------ [${moduleLabel}] processed: ${resolved}/${
                      frontendUsers.length
                      }`
                  )
                  : null;
              resolved === frontendUsers.length
                  ? console.log(
                  `------ [${moduleLabel} FINISHED]: processed ${resolved} of ${
                      frontendUsers.length
                      }`
                  )
                  : null;
              resolve(results);
            }
        );
      });
      promises.push(p);
      processedUsers++;
    });
    Promise.all(promises).then((res) => {
      resolve(res);
    });
  });
};

/**
 * @deprecated metrics are now calculated natively in handleForumTree
 * Enriches forum metrics from October, eg: number of posts, first post, most recent post
 * @returns {Promise<void>}
 */
const handleForumMetrics = async () => {
  const localdevConnection = await config.getDbConnection(
      config.db_connParams.db_localdev
  );

  //-- enrich topics
  let topicPromisesAll = 0;
  let topicPromisesResolved = 0;
  const loadTopicIds = async () => {
    let query = `select id from rainlab_forum_topics`;
    let topicIds = await fetches.queryConnection(query, localdevConnection);
    return topicIds.map((topic) => {
      return topic.id;
    });
  };
  const batchCountPostsInTopics = async () => {
    return new Promise((resolve) => {
      let query_batchpostsintopics = `
                SELECT
                    topics.id, count(*) posts
                    from rainlab_forum_posts posts
                    left join rainlab_forum_topics topics on posts.topic_id = topics.id
                    where topics.id IS NOT NULL
                    group by topics.id; `;
      localdevConnection.query(query_batchpostsintopics, (err, results) => {
        if (err) console.log(err);
        resolve(results);
      });
    });
  };
  const batchGetTopicsFirstPosts = async () => {
    return new Promise((resolve) => {
      let query_batchgettopicsfirstposts = `
                SELECT topic_id, member_id,id from rainlab_forum_posts
                    GROUP BY topic_id
                    ORDER BY created_at asc;`;
      localdevConnection.query(
          query_batchgettopicsfirstposts,
          (err, results) => {
            if (err) console.log(err);
            resolve(results);
          }
      );
    });
  };
  const batchGetTopicsRecentPosts = async () => {
    return new Promise((resolve) => {
      let query_batchgettopicsfirstposts = `
                SELECT topic_id, id, member_id, created_at from rainlab_forum_posts
                    GROUP BY topic_id
                    ORDER by created_at DESC;`;
      localdevConnection.query(
          query_batchgettopicsfirstposts,
          (err, results) => {
            if (err) console.log(err);
            resolve(results);
          }
      );
    });
  };
  const updateTopicsFirstAndRecentPosts = async (patchArray) => {
    let topicPromisesCount = patchArray.length;
    let topicPromisesResolved = 0;
    let topicPromises = [];

    patchArray.forEach((row) => {
      let rowProm = new Promise((resolve) => {
        if (!row.firstpost) {
          resolve({});
        }
        let q = `UPDATE rainlab_forum_topics SET start_member_id = ${
            row.firstpost.member_id
            }, last_post_id = ${row.recentpost.id}, last_post_member_id = ${
            row.recentpost.member_id
            }, last_post_at = "${utils.formatMysqlTimestamp(
            row.recentpost.created_at
        )}" where id = ${row.topic_id}`;
        localdevConnection.query(q, (err, results) => {
          if (err) {
            console.log(err);
          }
          topicPromisesResolved++;
          console.log(
              `PROCESSED TOPICS: ${topicPromisesResolved}/${topicPromisesCount}`
          );
          resolve(results);
        });
      });
      topicPromises.push(rowProm);
    });

    return new Promise((resolve) => {
      Promise.all(topicPromises).then((results) => {
        resolve(results);
      });
    });
  };

  const updateTopicsPostCount = async (countResults) => {
    topicPromisesAll = countResults.length;
    return new Promise(async (resolve) => {
      let promises_updatetopicpostcount = [];
      countResults.forEach((row) => {
        let rp = new Promise((rpResolve) => {
          localdevConnection.query(
              `update rainlab_forum_topics SET count_posts = ? where id = ?;`,
              [row.posts, row.id],
              (err, results) => {
                topicPromisesResolved++;
                console.log(
                    `updated topic counts: ${topicPromisesResolved}/${topicPromisesAll}`
                );
                rpResolve(results);
              }
          );
        });
        promises_updatetopicpostcount.push(rp);
      });
      let results = await utils.collectAllPromises(
          promises_updatetopicpostcount
      );
      resolve(results);
    });
  };
  /*
        // get count of posts per topic, update topic records count_posts
        let allTopicsPostsCounts = await batchCountPostsInTopics();
        let updatedTopics = await updateTopicsPostCount(allTopicsPostsCounts);
    */
  // get topic first and recent posts
  let topicIds = await loadTopicIds();
  let topicsFirstPosts = await batchGetTopicsFirstPosts();
  let topicsRecentPosts = await batchGetTopicsRecentPosts();
  // recompile array of {topicid, recent.*, first.*}
  let topicMetricsPatch = topicIds.map((topicid) => {
    let ret = {
      topic_id: topicid
    };
    ret.firstpost = topicsFirstPosts.filter((row) => {
      return row.topic_id === topicid;
    })[0];
    ret.recentpost = topicsRecentPosts.filter((row) => {
      return row.topic_id === topicid;
    })[0];
    return ret;
  });
  let patchedTopics = await updateTopicsFirstAndRecentPosts(topicMetricsPatch);

  //-- enrich channels
  let channelPromisesAll = 0;
  let channelPromisesResolved = 0;
  const batchCountPostsInChannel = async () => {
    return new Promise((resolve) => {
      let query_batchcountpostsinchannel = `
                SELECT channels.id, count(*) topicsCount, sum(topics.count_posts) postsCount
                from rainlab_forum_topics topics
                left join rainlab_forum_channels channels on topics.channel_id = channels.id
                where channels.id IS NOT NULL
                group by channels.id
            `;
      localdevConnection.query(
          query_batchcountpostsinchannel,
          (err, results) => {
            if (err) console.log(err);
            resolve(results);
          }
      );
    });
  };
  const updateChannelsTallies = async (countResults) => {
    channelPromisesAll = countResults.length;
    return new Promise(async (resolve) => {
      let promises_updatechannelstallies = [];
      countResults.forEach((row) => {
        let rp = new Promise((rpResolve) => {
          localdevConnection.query(
              `UPDATE rainlab_forum_channels SET count_topics=?, count_posts=? where id=?;`,
              [row.topicsCount, row.postsCount, row.id],
              (err, results) => {
                channelPromisesResolved++;
                console.log(
                    `updated topic counts: ${channelPromisesResolved}/${channelPromisesAll}`
                );
                rpResolve(results);
              }
          );
        });
        promises_updatechannelstallies.push(rp);
      });
      let results = await collectAllPromises(promises_updatechannelstallies);
      resolve(results);
    });
  };
  /*
        // get count of topics and posts in channels
        let allChannelsPostsCounts = await batchCountPostsInChannel();
        let updatedPosts = await updateChannelsTallies(allChannelsPostsCounts);
    */

  debugger;
};

module.exports = {
  handleUsers,
  handlePages,
  handlePosts,
  handleNavs,
  handleForumTree,
  handleForumUsers,
  handleForumMetrics
};
