const path = require('path');
const fs = require('fs');

const fwrite = async (content, path) => {
    return new Promise(resolve => {
        fs.writeFile(path, content, 'utf8', err => {
            if (err) {
                throw err
            }
            resolve();
        })
    })
}


module.exports = {
    paths: {
        outContentBase: path.resolve(__dirname, '..', 'out', 'content'),
        outPages: path.resolve(__dirname, '..', 'out', 'pages'),
        outPosts: path.resolve(__dirname, '..', 'out', 'pages', 'posts'),
        outMenus: path.resolve(__dirname, '..', 'out', 'menus'),
    },
    fwrite
};