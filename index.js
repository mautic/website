const path = require('path');
const mkdirp = require('mkdirp');
//
const mysql = require('mysql');
//
const config = require('./libs/config');
const fetches = require('./libs/fetch');
const handlers = require('./libs/handlers');

//
let connection;
let progress = {};
//---------------------
const connect = async () => {
    return new Promise(resolve => {
        connection = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'mt_org_migration',
            user: 'root',
            password: 'dockerpass'
        })
        connection.connect(err => {
            if (err) throw err;
            resolve(connection)
        })
    })
}

const disconnect = async () => {
    return new Promise(resolve => {
        connection.end(err => {
            if (err) {
                throw err
            }
            resolve(connection)
        })
    })
}

const setup = (remove = false) => {
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
    setup();
    return new Promise(async resolve => {
        //-- register processors here with {process:false}. a gate calls done when all are flagged true
        progress = {
            pages: false,
        }
        let cid = await connect();
        let post_types = await fetches.fetch(fetches.queries.getPublishedTypesCount, connection);


        //------- NOT refactored
        // let users = await handlers.handleUsers(connection);
        // console.time('navs');
        // await handlers.handleNavs(connection);
        // console.timeEnd('navs');

        //------- refactored
        // let pageInserts = await handlers.handlePages(connection);
        // let postInserts = await handlers.handlePosts(connection);
        // let forumUsers = await handlers.handleForumUsers();
        let forumTree = await handlers.handleForumTree(connection);
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
