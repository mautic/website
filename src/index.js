const path = require('path');
const mkdirp = require('mkdirp');
//
const mysql = require('mysql');
//
const config = require('./libs/config');
const fetches = require('./libs/fetch');
const handlers = require('./libs/handlers');
const pageposthandlers = require('./libs/PagePostHandlers');
const grouphandlers = require('./libs/groupHandlers');

//
let stagingConnection, localdevConnection;
let progress = {};
//---------------------

const disconnect = async () => {
    return new Promise((resolve) => {
        stagingConnection.end((err) => {
            if (err) {
                throw err;
            }
            resolve(stagingConnection);
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

        stagingConnection = await config.getDbConnection(
            config.db_connParams.db_staging
        );
        localdevConnection = await config.getDbConnection(
            config.db_connParams.db_localdev
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
            stagingConnection
        );*/

        // let groupInserts = await grouphandlers.handleGroups(stagingConnection, localdevConnection);
        // let pageInserts = await pageposthandlers.handlePages(stagingConnection);
        // let postInserts = await pageposthandlers.handlePosts(stagingConnection);

        // const cacheRebuild = false;
        // let forumUsers = await handlers.handleForumUsers(localdevConnection);
        // let forumTree = await handlers.handleForumTree(stagingConnection, localdevConnection, cacheRebuild);
        // let forumMetrics = await handlers.handleForumMetrics();

        //------- NOT refactored
        // let users = await handlers.handleUsers(connection, localdevConnection);
        // console.time('navs');
        // await handlers.handleNavs(connection);
        // console.timeEnd('navs');

        resolve();
    });
};

const processGroups = async () => {
    await prepare();
    return new Promise(async (resolve) => {
        let groups = await grouphandlers.loadGroupTables(stagingConnection, localdevConnection);
        let users = await grouphandlers.loadUserTables(stagingConnection, localdevConnection)

        groups.map(g => {
            g.members = g.members.map(m => {
                let mbr = {};
                mbr.raw = m;
                mbr.user = users.filter(u => {
                    return u.raw.ID === m.user_id;
                })[0];
                return mbr;
            })
        })

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
