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
        outPages: path.resolve(__dirname, '..', 'out', 'pages'),
        outPosts: path.resolve(__dirname, '..', 'out', 'posts'),
        outMenus: path.resolve(__dirname, '..', 'out', 'menus'),
    },
    fwrite
};