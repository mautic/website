const fetches = require('./fetch');
const config = require('./config');
const utils = require('./utils');

/**
 * Collects groups into normalized, hydrated json.
 * @param stagingConnection
 * @returns {Promise<any>}
 */
const fetchAndHydrateGroups = async (stagingConnection) => {
  let fetchedGroups = await fetches.queryConnection(`select * from mwp_bp_groups;`, stagingConnection);
  let fetchedMeta = await fetches.queryConnection(`select * from mwp_bp_groups_groupmeta`, stagingConnection);
  let fetchedUsers = await fetches.queryConnection(`SELECT * from mwp_bp_groups_members where group_id`, stagingConnection);

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
 * @param localdevConnection
 * @returns {Promise<void>}
 */
const insertGroups = async (groups, localdevConnection) => {
}

const handleGroups = async (stagingConnection, localdevConnection) => {
  let hydratedGroups = await fetchAndHydrateGroups(stagingConnection);
  let insertedGroups = await insertGroups(hydratedGroups, localdevConnection);

  return Promise.resolve(hydratedGroups);
};

module.exports = {
  handleGroups
};