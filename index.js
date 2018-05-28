const path = require('path');
const mkdirp = require('mkdirp');
//
const mysql = require('mysql');
//
const config = require('./libs/config');
const fetches = require('./libs/fetch');
const handlers = require('./libs/handlers');

//
let stagingConnection, localdevConnection;
let progress = {};
//---------------------

const disconnect = async () => {
    return new Promise(resolve => {
        stagingConnection.end(err => {
            if (err) {
                throw err
            }
            resolve(stagingConnection)
        })
    })
}

const prepare = (remove = false) => {
    if (remove) {
        // @todo: destroy previously created files
    }

    Object.keys(config.paths)
        .forEach(pathKey => {
            mkdirp.sync(config.paths[pathKey]);
        });
    mkdirp.sync(path.resolve(config.paths.outContentBase, 'pages'));
    mkdirp.sync(path.resolve(config.paths.outContentBase, 'posts'));
}

const tryComplete = () => {
    let status = 0;
    Object.keys(progress).forEach(key => {
        progress[key] ? status++ : null;
    });
    if (status === Object.keys(progress).length) {
        return true;
    }

    return false;
};


//---------------------
const main = async () => {
    prepare();
    return new Promise(async resolve => {
        //-- register processors here with {process:false}. a gate calls done when all are flagged true
        progress = {
            pages: false,
        }
        stagingConnection = await config.getDbConnection(config.db_connParams.db_staging);
        localdevConnection = await config.getDbConnection(config.db_connParams.db_localdev);
        let post_types = await fetches.queryConnection(fetches.queries.getPublishedTypesCount, stagingConnection);


        //------- NOT refactored
        // let users = await handlers.handleUsers(connection);
        // console.time('navs');
        // await handlers.handleNavs(connection);
        // console.timeEnd('navs');

        //------- refactored
        // let pageInserts = await handlers.handlePages(stagingConnection);
        // let postInserts = await handlers.handlePosts(stagingConnection);
        // let forumUsers = await handlers.handleForumUsers(localdevConnection);
        const cacheRebuild = false;
        let forumTree = await handlers.handleForumTree(stagingConnection, localdevConnection, cacheRebuild);
        // let forumMetrics = await handlers.handleForumMetrics();

        resolve()
    })
};

console.time('complete');
main()
    .then(res => {
        console.log(`done in...`);
        console.timeEnd('complete');
        // process.exit();
    })
