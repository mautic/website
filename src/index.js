const path = require('path');
const mkdirp = require('mkdirp');
//
const config = require('./libs/config');
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

    /*let post_types = await fetches.queryConnection(
        fetches.queries.getPublishedTypesCount,
        sourceDataConnection
    );*/

    // let groupInserts = await grouphandlers.handleGroups(sourceDataConnection, targetDataConnection);
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

console.time('complete');
processGroups().then((res) => {
  console.log(`done in...`);
  console.timeEnd('complete');
  process.exit();
});
