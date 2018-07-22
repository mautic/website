const path = require('path');
const config = require('./config');
const fetches = require('./fetch');
const utils = require('./utils');
const yaml = require('js-yaml');
const html2md = require('html-markdown');

/**
 * Returns compiled October page.htm content for wp page
 * @param page
 * @param format
 * @returns {string}
 */
const mutateContentPage = (page, format = 'md') => {
  let pageParams = {
    config: {
      title: page.post_title,
      url: `/${page.urlpath}${page.post_name}`,
      layout: 'default',
      meta_title: page.post_title,
      meta_description: page.post_title, // @todo
      wpmeta: page.wpmeta
    },
    content: page.post_content
  };

  page.wpmeta._yoast_wpseo_metadesc
      ? (pageParams.config.meta_description = page.wpmeta._yoast_wpseo_metadesc)
      : null;
  page.wpmeta._wpbitly
      ? (pageParams.config.bitly = page.wpmeta._wpbitly)
      : null;

  let pageconfig = [];
  Object.keys(pageParams.config).forEach((key) => {
    key !== 'wpmeta'
        ? pageconfig.push(`${key} = "${pageParams.config[key]}"`)
        : null;
  });

  return {
    fname: `${page.post_name}.htm`,
    sitepage: {
      url: pageParams.config.url,
      title: pageParams.config.title
    },
    fnamebase: page.post_name,
    fconfig: pageconfig.join('\n'),
    fcontentFormat: format === 'md' ? 'md' : 'htm',
    fcontent:
        format === 'md'
            ? html2md.html2mdFromString(pageParams.content)
            : pageParams.content
  };
};

/**
 * Inner fn for querying posts table for a given type and resolving its metadata.
 * @param type
 * @param sourceDbConn
 * @returns {Promise<*>}
 * @private
 */
const hydratePostType = async (type, sourceDbConn) => {
  //-- improved in-memory resolver
  let items = await fetches.queryConnection(
      `SELECT * from mwp_posts where post_status = 'publish' and post_type = '${type}';`,
      sourceDbConn
  );
  let itemIds = items.map(i => {
    return i.ID;
  })
      .join(',');
  let itemmeta = await fetches.queryConnection(
      `select * from mwp_postmeta where post_id in (${itemIds})`,
      sourceDbConn
  );

  return items.map(i => {
    let meta = itemmeta
        .filter(m => {
          return m.post_id === i.ID;
        })
        .reduce((curr, acc) => {
          curr[acc.meta_key] = acc.meta_value;
          return curr;
        }, {});

    return {
      [type]: i,
      id: i.ID,
      meta
    };
  })
}

/**
 * Convenience wrapper for extracting type=page
 * @param sourceDbConn
 * @returns {Promise<*>}
 */
const extractPages = async (sourceDbConn) => {
  return await hydratePostType('page', sourceDbConn);
};

/**
 * Convenience wrapper for extracting type=post
 * @param sourceDbConn
 * @returns {Promise<*>}
 */
const extractPosts = async (sourceDbConn) => {
  return await hydratePostType('post', sourceDbConn);
};

/**
 * Collect page/meta, format and write to fs for october
 */
const handlePages = async (connection) => {
  let fetchedPages = await extractPages(connection);

  // shortcode pages need to be fetched with front-end rendering (axios+cheerio or similar)
  let scRex = /\[\w.*\].*\[\/.*\]/gi;
  let shortcodePages = fetchedPages.filter(page => {
    return scRex.test(page.post_content);
  });
  let specialPages = fetchedPages.filter(page => {
    if (page.post_title === "MautiCamps") {
      debugger;
    }
    return {};
  })

  let pageWritePromises = fetchedPages.map((page) => {
    return new Promise(async (writeResolve) => {

      let mutatedPage = mutateContentPage(page);
      //-- write content file
      const contentFilename = `pages/${mutatedPage.fnamebase}.${ mutatedPage.fcontentFormat }`;
      await config.fwrite(
          mutatedPage.fcontent,
          path.resolve(config.paths.outContentBase, contentFilename)
      );
      //-- write page file
      await config.fwrite(
          `${mutatedPage.fconfig}\n==\n{% content '${contentFilename}' %}`,
          path.resolve(config.paths.outPages, mutatedPage.fname)
      );

      writeResolve(mutatedPage);
    });
  });
  return await utils.collectAllPromises(pageWritePromises);
};

/**
 * Collect post/meta, format and write to fs for october
 */
const handlePosts = async (connection) => {
  let posts = await fetches.queryConnection(
      fetches.queries.getPublishedContentByType('post'),
      connection
  );
  let postPromises = posts.map((post) => {
    return new Promise(async (postResolve) => {
      // get page meta keys;
      let pagemeta = await fetches.queryConnection(
          fetches.queries.getPostMetaRowsForId(post.ID),
          connection
      );
      post.urlpath = 'blog/';
      post.wpmeta = {};
      pagemeta.forEach((meta) => {
        post.wpmeta[meta.meta_key] = meta.meta_value;
      });
      //
      let mutatedPost = mutateContentPage(post);

      //-- write content file
      const contentFilename = `posts/${mutatedPost.fnamebase}.${
          mutatedPost.fcontentFormat
          }`;
      await config.fwrite(
          mutatedPost.fcontent,
          path.resolve(config.paths.outContentBase, contentFilename)
      );
      //-- write page file
      await config.fwrite(
          `${mutatedPost.fconfig}\n==\n{% content '${contentFilename}' %}`,
          path.resolve(config.paths.outPosts, mutatedPost.fname)
      );
      postResolve(mutatedPost);
    });
  });
  return await utils.collectAllPromises(postPromises);
};

module.exports = {
  mutateContentPage,
  handlePages,
  handlePosts,
  extractPages,
  extractPosts,
  hydratePostType
}