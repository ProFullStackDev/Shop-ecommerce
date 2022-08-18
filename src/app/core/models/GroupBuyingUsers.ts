/**
 * File Name  : GroupBuying_Users.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface GroupBuyingUsersAttributes {
  participateGroupBuyingsId: number;
  membersId: number;
}

export type GroupBuyingUsersCreationAttributes = GroupBuyingUsersAttributes;

export class GroupBuyingUsers extends Model<GroupBuyingUsersAttributes, GroupBuyingUsersCreationAttributes> implements GroupBuyingUsersAttributes {
  participateGroupBuyingsId!: number;
  membersId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof GroupBuyingUsers {
    return GroupBuyingUsers.init({
    participateGroupBuyingsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'GroupBuying',
        key: 'id'
      },
      field: 'participateGroupBuyings_id'
    },
    membersId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'members_id'
    }
  }, {
    sequelize,
    tableName: 'GroupBuying_Users',
    timestamps: false,
    indexes: [
      {
        name: "ind_GroupBuying_Users_members_id",
        using: "BTREE",
        fields: [
          { name: "members_id" },
        ]
      },
      {
        name: "ind_GroupBuying_Users_participateGroupBuyings_id",
        using: "BTREE",
        fields: [
          { name: "participateGroupBuyings_id" },
        ]
      },
    ]
  });
  }
}
