const yaml = require('js-yaml');

/**
 * Returns compiled October page.htm content for wp page
 * @param page
 * @returns {string}
 */
const mutateContentPage = (page) => {
    let pageParams = {
        config: {
            title: page.post_title,
            url: `/${page.post_name}`,
            layout: 'default',
            meta_title: page.post_title,
            meta_description: page.post_title, // @todo
            wpmeta: page.wpmeta,
        },
        content: page.post_content
    };

    page.wpmeta._yoast_wpseo_metadesc ? pageParams.config.meta_description = page.wpmeta._yoast_wpseo_metadesc : null;
    page.wpmeta._wpbitly ? pageParams.config.bitly = page.wpmeta._wpbitly : null;


    let pageconfig = yaml.safeDump(pageParams.config);
    return {
        fname: `${page.post_name}.htm`,
        fcontent: `${pageconfig}==\n${pageParams.content}`
    };
}


module.exports = {
    mutatePage: mutateContentPage
};