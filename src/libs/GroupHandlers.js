const fetches = require('./fetch');
const utils = require('./utils');

/**
 * Loads groups from Wordpress. Hydrates with member list and meta keys
 * @param sourceDbConn
 * @param targetDbConn
 * @return {Promise<*>}
 */
const loadGroupTables = async (sourceDbConn, targetDbConn) => {
  let wpGroups = await fetches.queryConnection(
      `select * from mwp_bp_groups`,
      sourceDbConn
  );
  let wpGroupMeta = await fetches.queryConnection(
      `select * from mwp_bp_groups_groupmeta`,
      sourceDbConn
  );
  let wpGroupMembers = await fetches.queryConnection(
      `select * from mwp_bp_groups_members`,
      sourceDbConn
  );

  return wpGroups.map(group => {
    group.description = group.description.substring(0, 255);

    let g = {
      raw: group,
      meta: {},
      members: [],
    }

    wpGroupMeta
        .filter(m => {
          return m.group_id === group.id;
        })
        .map(m => {
          g.meta[m.meta_key] = m.meta_value;
        });
    g.members = wpGroupMembers
        .filter(m => {
          return m.group_id === group.id;
        });

    return g;
  });
};

/**
 * Loads users  from Wordpress. Hydrates with member list and meta keys
 * @param sourceDbConn
 * @param targetDbConn
 * @return {Promise<*>}
 */
const loadUserTables = async (sourceDbConn, targetDbConn) => {
  let wpUsers = await fetches.queryConnection(
      `select * from mwp_users`,
      sourceDbConn
  );
  let wpUserMeta = await fetches.queryConnection(
      `select * from mwp_usermeta`,
      sourceDbConn
  );

  return wpUsers.map(user => {
    let u = {
      raw: user,
      usermeta: {}
    };
    wpUserMeta
        .filter(m => {
          return m.user_id === user.ID
        })
        .map(m => {
          u.usermeta[m.meta_key] = m.meta_value;
        });

    return u;
  })
};

const loadOctoGroups = async (sourceDbConn, targetDbConn) => {
  let octoGroups = await fetches.queryConnection(
      `select * from trka_groups_groups`,
      targetDbConn
  )

  return octoGroups;
};

const insertOctoGroups = async (sourceDbConn, targetDbConn, groups) => {
  let batchInsertStmt = `insert into trka_groups_groups 
    (name, slug, description, created_at, updated_at, parent, group_type, group_icon, group_color) values`;

  let value_statements = groups.map(g => {
    return `(
      ${targetDbConn.escape(g.raw.name)},       
      ${targetDbConn.escape(g.raw.slug)},       
      ${targetDbConn.escape(g.raw.description)},
      "${utils.formatMysqlTimestamp(g.raw.date_created)}",       
      "${utils.formatMysqlTimestamp(g.raw.date_created)}",
      0, "mauticamp", "fe-users", "gray"
    )`;
  });

  let chunkInserts = utils.getArrayChunks(value_statements, 20)
      .map(chunk => {
        return `${batchInsertStmt} ${chunk.join(',')}`
      });
  let resolvedChunks = 0;
  let chunkPromises = chunkInserts.map(insert => {
    return new Promise(resolve => {
      targetDbConn.query(insert, (err, results) => {
        if (err) {
          console.error(err)
          debugger;
        }
        resolvedChunks++;
        console.log(`resolved [group] chunks: ${resolvedChunks}/${chunkInserts.length}`)
        resolve(results);
      })
    })
  });
  return await utils.collectAllPromises(chunkPromises);
};

const insertOctoGroupMemberPivots = async (sourceDbConn, targetDbConn, pivots) => {
  let batchInsertStmt = `insert into trka_groups_group_user 
    (user_id, group_id, moderator) values`;

  let value_statements = pivots.map(p => {
    return `(${p.userId}, ${p.groupId}, 0)`;
  });

  let chunkInserts = utils.getArrayChunks(value_statements, 20)
      .map(chunk => {
        return `${batchInsertStmt} ${chunk.join(',')}`
      });
  let resolvedChunks = 0;
  let chunkPromises = chunkInserts.map(insert => {
    return new Promise(resolve => {
      targetDbConn.query(insert, (err, results) => {
        if (err) {
          console.error(err)
          debugger;
        }
        resolvedChunks++;
        console.log(`resolved [group/user pivot] chunks: ${resolvedChunks}/${chunkInserts.length}`)
        resolve(results);
      })
    })
  });
  return await utils.collectAllPromises(chunkPromises);
};

const loadOctoUsers = async (sourceDbConn, targetDbConn) => {
  return await fetches.queryConnection(
      `select * from users`,
      targetDbConn
  );
}

module.exports = {
  //-- wp
  loadGroupTables,
  loadUserTables,
  //-- october
  loadOctoUsers,
  loadOctoGroups,
  insertOctoGroups,
  insertOctoGroupMemberPivots
};