const fetches = require('./fetch');

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
    let insertStmt = `insert into trka_groups_groups 
    (name, slug, description, created_at, updated_at) 
    values 
    (?,?,?,?,?)`;

    groups.map(g=>{

    })
    debugger
};

module.exports = {
    //-- wp fetches
    loadGroupTables,
    loadUserTables,
    //-- october inserts
    loadOctoGroups,
    insertOctoGroups
};