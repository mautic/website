const path = require('path');
const fs = require('fs');
const config = require('./config');
const fetches = require('./fetch');
const utils = require('./utils');

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

module.exports = {
    loadGroupTables,
    loadUserTables
};