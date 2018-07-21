const path = require('path');
const mkdirp = require('mkdirp');
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
        let octoberGroups = await grouphandlers.loadOctoGroups(stagingConnection, localdevConnection);
        let wpGroups = await grouphandlers.loadGroupTables(stagingConnection, localdevConnection);
        let wpUsers = await grouphandlers.loadUserTables(stagingConnection, localdevConnection);

        //-- first pass, make sure all wpGroups are accounted for
        let groupsDiff = wpGroups.filter(wp_g => {
            let match = octoberGroups.filter(oc_g => {
                return oc_g.name.toLowerCase().replace(' ', '-') === wp_g.raw.name.toLowerCase().replace(' ', '-')
            });
            return !match.length;
        });

        if (groupsDiff.length) {
            await grouphandlers.insertOctoGroups(stagingConnection, localdevConnection, groupsDiff);
            octoberGroups = await grouphandlers.loadOctoGroups(stagingConnection, localdevConnection);
        }

        debugger


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
