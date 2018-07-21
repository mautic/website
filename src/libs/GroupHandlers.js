const fetches = require('./fetch');
const config = require('./config');
const utils = require('./utils');

/**
 * Collects groups into normalized, hydrated json.
 * @param sourceDataConn
 * @returns {Promise<any>}
 */
const fetchAndHydrateGroups = async (sourceDataConn) => {
  let fetchedGroups = await fetches.queryConnection(`select * from mwp_bp_groups;`, sourceDataConn);
  let fetchedMeta = await fetches.queryConnection(`select * from mwp_bp_groups_groupmeta`, sourceDataConn);
  let fetchedUsers = await fetches.queryConnection(`SELECT * from mwp_bp_groups_members where group_id`, sourceDataConn);

  let hydrated = fetchedGroups.map(group => {
    group.users = fetchedUsers
        .filter(user => {
          return user.group_id === group.id;
        });
    group.meta = {};
    fetchedMeta
        .filter(meta => {
          return meta.group_id === group.id;
        })
        .forEach(meta => {
          group.meta[meta.meta_key] = meta.meta_value;
        });
    return group;
  });

  return Promise.resolve(hydrated);
};

/**
 * Insert hydrated groups into destination backend
 * @todo: need a dest. backend ;)
 * @param groups
 * @param targetDataConn
 * @returns {Promise<void>}
 */
const insertGroups = async (groups, targetDataConn) => {
}

const handleGroups = async (sourceDataConn, targetDataConn) => {
  let hydratedGroups = await fetchAndHydrateGroups(sourceDataConn);
  let insertedGroups = await insertGroups(hydratedGroups, targetDataConn);

  return Promise.resolve(hydratedGroups);
};

module.exports = {
  handleGroups
};