const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
//
const mysql = require('mysql');
//
const fetches = require('./libs/fetch');
const mutators = require('./libs/mutators');
//
const paths = {
    outPages: path.resolve(__dirname, 'out', 'pages'),
    outPosts: path.resolve(__dirname, 'out', 'posts'),
    outMenus: path.resolve(__dirname, 'out', 'menus'),
}
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

    Object.keys(paths)
        .forEach(pathKey => {
            mkdirp.sync(paths[pathKey]);
        })
}

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
        const handlePages = async () => {
            let pages = await fetches.fetch(fetches.queries.getPublishedContentByType('page'), connection);
            // @todo: the routines for pages and posts are nearly identical. abstract that to make CPD happy.
            pages.forEach(async (page, index) => {
                // get page meta keys;
                let pagemeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(page.ID), connection);
                page.wpmeta = {}
                pagemeta.forEach(meta => {
                    page.wpmeta[meta.meta_key] = meta.meta_value
                });

                let mutatedPage = mutators.mutatePage(page);
                await fwrite(mutatedPage.fcontent, path.resolve(paths.outPages, mutatedPage.fname));
            });
            progress.pages = true;
            if (tryComplete()) {
                resolve()
            }
        };
        const handlePosts = async () => {
            let posts = await fetches.fetch(fetches.queries.getPublishedContentByType('post'), connection);
            posts.forEach(async (post, index) => {
                // get page meta keys;
                let pagemeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(post.ID), connection);
                post.wpmeta = {}
                pagemeta.forEach(meta => {
                    post.wpmeta[meta.meta_key] = meta.meta_value
                });
                //
                let mutatedPosts = mutators.mutatePage(post);
                await fwrite(mutatedPosts.fcontent, path.resolve(paths.outPosts, mutatedPosts.fname));
            })
            progress.posts = true;
            if (tryComplete()) {
                resolve()
            }
        };
        const handleNavs = async () => {
            let navmenus = await fetches.fetch(fetches.queries.getAllNavMenus, connection);
            let processedMenus = 0; // used later to gate our exit inside the foreach loop
            navmenus.forEach(async (menu, index) => {
                let menuitems = await fetches.fetch(fetches.queries.getNavItemsByMenuId(menu.term_id), connection);
                let processedItems = 0;
                menuitems.map(async (item, index) => {
                    let itemMeta = await fetches.fetch(fetches.queries.getPostMetaRowsForId(item.ID), connection);
                    menuitems[index] = {
                        item, itemMeta
                    }
                    processedItems++;

                    if (processedItems === menuitems.length) { //-- done with this menu
                        let fname = `${menu.term_id}__${menu.slug}.json`;
                        await fwrite(
                            JSON.stringify({menu, menuitems}, null, 2),
                            path.resolve(paths.outMenus, fname)
                        );

                        processedMenus++;
                        if (processedMenus === navmenus.length-1) {
                            progress.navs = true;
                            if (tryComplete()) {
                                resolve();
                            }
                        }
                    }
                })
            });
        };

        //-----------
        handlePages();
        handlePosts();
        handleNavs();

    })
};

console.time('tool');
main()
    .then(res => {
        console.log(`done in...`);
        console.timeEnd('tool');
        process.exit();
    })