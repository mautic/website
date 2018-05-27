const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const fwrite = async (content, path) => {
    return new Promise(resolve => {
        fs.writeFile(path, content, 'utf8', err => {
            if (err) {
                throw err
            }
            resolve();
        })
    })
};

const db_connParams = {
    db_staging: {
        host: '127.0.0.1',
        port: 3306,
        database: 'mt_org_migration',
        user: 'root',
        password: 'dockerpass'
    },
    db_localdev: {
        host: '127.0.0.1',
        port: 3307,
        database: 'mtorg_db',
        user: 'root',
        password: 'dockerpass'
    }
};

/**
 * Returns a connected database instance
 * @param which
 * @returns {Promise<any>}
 */
const getDbConnection = async (params) => {
    return new Promise(resolve => {
        let connection = mysql.createConnection(params)
        connection.connect(err => {
            if (err) throw err;
            resolve(connection);
        })
    })
}


module.exports = {
    paths: {
        cacheBase: path.resolve(__dirname, '..', 'cache'),
        outContentBase: path.resolve(__dirname, '..', 'out', 'content'),
        outPages: path.resolve(__dirname, '..', 'out', 'pages'),
        outPosts: path.resolve(__dirname, '..', 'out', 'pages', 'posts'),
        outMenus: path.resolve(__dirname, '..', 'out', 'menus'),
    },
    fwrite,
    db_connParams,
    getDbConnection
};