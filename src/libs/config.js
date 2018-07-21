const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const fwrite = async (content, path) => {
  return new Promise((resolve) => {
    fs.writeFile(path, content, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
};

const db_connParams = {
  db_source: {
    host: '127.0.0.1',
    port: 3306,
    database: 'mt_org_migration',
    user: 'root',
    password: 'dockerpass'
  },
  db_destination: {
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
  return new Promise((resolve) => {
    let connection = mysql.createConnection(params);
    connection.connect((err) => {
      if (err) throw err;
      resolve(connection);
    });
  });
};

const basepath = path.resolve(__dirname, '..', '..');

module.exports = {
  paths: {
    cacheBase: path.resolve(basepath, 'cache'),
    outContentBase: path.resolve(basepath, 'out', 'content'),
    outPages: path.resolve(basepath, 'out', 'pages'),
    outPosts: path.resolve(basepath, 'out', 'pages', 'posts'),
    outMenus: path.resolve(basepath, 'out', 'menus')
  },
  fwrite,
  db_connParams,
  getDbConnection
};
