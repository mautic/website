const path = require('path');
const mkdirp = require('mkdirp');
//
const mysql = require('mysql');
//
const config = require('./libs/config');
const fetches = require('./libs/fetch');
const mutators = require('./libs/mutators');
const handlers = require('./libs/handlers');

//

let connection;
let progress = {
    pages: false,
    posts: false,
    navs: false,
};
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
            if (err) {
                throw err
            }
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
        })
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
        let cid = await connect();
        let post_types = await fetches.fetch(fetches.queries.getPublishedTypesCount, connection);

        //-----------
        await handlers.handlePages(connection);
        await handlers.handlePosts(connection);
        await handlers.handleNavs(connection);
        await handlers.handleTopics(connection);
        debugger;
        resolve()
    })
};

console.time('tool');
main()
    .then(res => {
        console.log(`done in...`);
        console.timeEnd('tool');
        process.exit();
    })
