const path = require('path');
const mkdirp = require('mkdirp');
//
const config = require('./libs/config');
const utils = require('./libs/utils');
const fetches = require('./libs/fetch');
const handlers = require('./libs/handlers');
const pageposthandlers = require('./libs/PagePostHandlers');
const grouphandlers = require('./libs/GroupHandlers');
const forumhandlers = require('./libs/ForumHandlers');

//
let sourceDataConnection, targetDataConnection;
let progress = {};
//---------------------

const disconnect = async () => {
  return new Promise((resolve) => {
    sourceDataConnection.end((err) => {
      if (err) {
        throw err;
      }
      resolve(sourceDataConnection);
    });
  });
};

const prepare = (remove = false) => {
  return new Promise(async resolve => {
    if (remove) {
      // @todo: destroy previously created files
    }

    Object.keys(config.paths).forEach((pathKey) => {
      mkdirp.sync(config.paths[pathKey]);
    });
    mkdirp.sync(path.resolve(config.paths.outContentBase, 'pages'));
    mkdirp.sync(path.resolve(config.paths.outContentBase, 'posts'));

    sourceDataConnection = await config.getDbConnection(
        config.db_connParams.db_source
    );
    targetDataConnection = await config.getDbConnection(
        config.db_connParams.db_destination
    );

    resolve();
  })
};

//---------------------
const main = async () => {
  await prepare();
  return new Promise(async (resolve) => {
    //-- register processors here with {process:false}. a gate calls done when all are flagged true
    // @todo: add a middleware-like mechanism for registering actions.

    let post_types = await fetches.queryConnection(
        fetches.queries.getPublishedTypesCount,
        sourceDataConnection
    );

    // let pageInserts = await pageposthandlers.handlePages(sourceDataConnection);
    // let postInserts = await pageposthandlers.handlePosts(sourceDataConnection);

    const cacheRebuild = true;
    // let forumUsers = await forumhandlers.handleForumUsers(targetDataConnection);
    // let forumTree = await forumhandlers.handleForumTree(sourceDataConnection, targetDataConnection, cacheRebuild);
    // let forumMetrics = await forumhandlers.handleForumMetrics();

    //------- NOT refactored
    // let users = await handlers.handleUsers(connection, targetDataConnection);
    // console.time('navs');
    // await handlers.handleNavs(connection);
    // console.timeEnd('navs');

    resolve();
  });
};

const processGroups = async () => {
  await prepare();
  return new Promise(async (resolve) => {
    let octoberGroups = await grouphandlers.loadOctoGroups(sourceDataConnection, targetDataConnection);
    let wpGroups = await grouphandlers.loadGroupTables(sourceDataConnection, targetDataConnection);
    let octoberUsers = await grouphandlers.loadOctoUsers(sourceDataConnection, targetDataConnection);
    let wpUsers = await grouphandlers.loadUserTables(sourceDataConnection, targetDataConnection);

    //-- ** first pass, make sure all wpGroups are accounted for
    let groupsDiff = wpGroups.filter(wp_g => {
      let match = octoberGroups.filter(oc_g => {
        return oc_g.name.toLowerCase().replace(' ', '-') === wp_g.raw.name.toLowerCase().replace(' ', '-')
      });
      return !match.length;
    });
    if (groupsDiff.length) {
      await grouphandlers.insertOctoGroups(sourceDataConnection, targetDataConnection, groupsDiff);
      octoberGroups = await grouphandlers.loadOctoGroups(sourceDataConnection, targetDataConnection);
    }

    //-- ** second pass, confirm uid integrity
    //-- match users from two sets by email. flag if the matched ids are consistent or no.
    octoberUsers = octoberUsers.map(oc_u => {
      let wp_match = wpUsers.filter(wp_u => {
        return wp_u.raw.user_email === oc_u.email;
      })[0]
      oc_u.idIsClean = wp_match && wp_match.raw.ID === oc_u.id;
      return oc_u;
    });

    //-- third pass, safe to parse users into groups and create db links
    let october_group_pivot_rows = octoberGroups
        .map(oc_g => {
          let wp_match = wpGroups.filter(wp_g => {
            return oc_g.name.toLowerCase().replace(' ', '-') === wp_g.raw.name.toLowerCase().replace(' ', '-');
          })[0];
          if (!wp_match || !wp_match.members.length) {
            return false
          }

          wp_match.octoberId = oc_g.id;

          return wp_match.members
              .map(wp_g_member => {
                return octoberUsers.filter(oc_u => {
                  return oc_u.id === wp_g_member.user_id && oc_u.idIsClean;
                })[0]
              }) //-- get october user from wp userid in wp pivot row
              .filter(oc_g_member => {
                return oc_g_member;
              }) //-- strip null/undefined
              .map(oc_g_member => {
                return {
                  groupId: oc_g.id,
                  userId: oc_g_member.id
                }
              }); //-- build new pivot record with oc user/group ids
        }) //-- collect pivot rows for single groups
        .filter(oc_g_pivotset => {
          return oc_g_pivotset;
        }) //-- strip any null/undefined
        .reduce((curr, acc) => {
          return [
            ...curr,
            ...acc
          ]
        }, []); //-- reduce nested arrs to single stack

    await grouphandlers.insertOctoGroupMemberPivots(sourceDataConnection, targetDataConnection, october_group_pivot_rows);

    debugger;
    resolve();
  })
}

const tests = async () => {
  await prepare();
  return new Promise(async (resolve) => {

    //-- blindly get all things. this can run very long on big datasets.
    let fetchEverything = () => {
      return new Promise(async resolve => {
        let allTypes = await fetches.queryConnection(fetches.queries.getPublishedTypesCount, sourceDataConnection)
        allTypes = allTypes
            .map(t => {
              return t.post_type;
            });
        let promises = allTypes.map(t => {
          return new Promise(async resolve => {
            console.log(`loading ${t}...`);
            let r = await pageposthandlers.hydratePostType(t, sourceDataConnection);
            console.log(`loaded ${t}. ${r.length} records`);
            resolve(r);
          })
        });
        let responses = await utils.collectAllPromises(promises);
        resolve(responses);
      })
    }

    //-- get specific types
    let fetchSome = () => {
      return new Promise(async resolve => {
        let pages = await pageposthandlers.extractPages(sourceDataConnection);
        let posts = await pageposthandlers.extractPosts(sourceDataConnection);
        resolve({
          pages, posts
        })
      })
    };

    //-- returns an array of all types. more useful: prints diagnostic info about items counts per type
    let inspectTables = async () => {
      let allTypes = await fetches.queryConnection(fetches.queries.getPublishedTypesCount, sourceDataConnection)
      allTypes.map(t => {
        console.log(`type: ${t.post_type} \r\n      ${t.cnt} items`);
        return t.post_type;
      })
      return allTypes;
    }

    let types = await inspectTables();

    let fetched = await fetchSome();

    debugger;
  })
}

console.time('complete');
tests().then((res) => {
  console.log(`done in...`);
  console.timeEnd('complete');
  process.exit();
});
