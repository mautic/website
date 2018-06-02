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

module.exports = {
  mutatePage: mutateContentPage
};
