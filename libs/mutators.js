const yaml = require('js-yaml');

/**
 * Returns compiled October page.htm content for wp page
 * @param page
 * @returns {string}
 */
const mutateContentPage = (page) => {
    let pageParams = {
        meta: {
            title: page.post_title,
            url: `/${page.post_name}`,
            layout: 'default',
            meta_title: page.post_title,
            meta_description: page.post_title, // @todo
        },
        content: page.post_content
    };

    let pageconfig = yaml.safeDump(pageParams.meta);
    return {
        fname: `${page.post_name}.htm`,
        fcontent: `${pageconfig}==\n${pageParams.content}`
    };
}


module.exports = {
    mutatePage: mutateContentPage
};