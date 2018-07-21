const path = require('path');
const mkdirp = require('mkdirp');
//
const config = require('./libs/config');
const fetches = require('./libs/fetch');
const handlers = require('./libs/handlers');
const pageposthandlers = require('./libs/PagePostHandlers');
const grouphandlers = require('./libs/groupHandlers');
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
  prepare();
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

    // const cacheRebuild = false;
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
    let wpUsers = await grouphandlers.loadUserTables(sourceDataConnection, targetDataConnection);

    //-- first pass, make sure all wpGroups are accounted for
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

    debugger;


    //-- second pass, confirm uid integrity
    wpUsers.map(wp_u => {
    })

    //-- third pass, safe to parse users into groups and create db links
    wpGroups.map(wp_g => {
      //-- map imported group to october-native group
      wp_g.octoberGroup = octoberGroups.filter(octo_g => {
        return (
            octo_g.name.toLowerCase().replace(' ', '-') === wp_g.raw.name.toLowerCase().replace(' ', '-')
        )
      });
      if (!wp_g.octoberGroup || !wp_g.octoberGroup.length) {
        debugger;
      }
      else {
        debugger;
      }

      //-- collect detailed info from users array
      wp_g.members = wp_g.members.map(m => {
        let mbr = {};
        mbr.raw = m;
        mbr.user = wpUsers.filter(u => {
          return u.raw.ID === m.user_id;
        })[0];
        return mbr;
      });

    });

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
