const fetches = require('./fetch');
const config = require('./config');
const utils = require('./utils');

const fetchAndHydrateGroups = async (stagingConnection) => {
  let fetchedGroups = await fetches.queryConnection(`select * from mwp_bp_groups;`, stagingConnection);
  let groupHydrationPromises = fetchedGroups.map(group => {
    return new Promise(async resolve => {
      // collect group meta
      let groupMeta = await fetches.queryConnection(
          `select * from mwp_bp_groups_groupmeta where group_id = ${group.id}`,
          stagingConnection
      );
      let m = {};
      groupMeta.forEach(row => {
        m[row.meta_key] = row.meta_value;
      });
      group.meta = m;
      // collect users
      let groupUsers = await fetches.queryConnection(
          `SELECT * from mwp_bp_groups_members where group_id = ${group.id}`,
          stagingConnection
      );
      group.users = groupUsers.map(user => {
        return {
          userId: user.user_id,
          inviterId: user.inviter_id,
          isAdmin: user.is_admin,
          isMod: user.is_mod,
          userTitle: user.user_title,
          modifiedOn: user.date_modified,
          isConfirmed: user.is_confirmed,
          isBanned: user.is_banned,
          inviteSent: user.inviteSent
        }
      });

      resolve(group)
    })
  });

  let hydrated = await utils.collectAllPromises(groupHydrationPromises);
  debugger;
}

const handleGroups = async (stagingConnection, localdevConnection) => {
  let fetchedGroups = await fetchAndHydrateGroups(stagingConnection);
};

module.exports = {
  handleGroups
};