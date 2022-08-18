/**
 * File Name  : Users_Role.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersRoleAttributes {
  adminsId: number;
  rolesId: number;
}

export type UsersRolePk = "adminsId" | "rolesId";
export type UsersRoleId = UsersRole[UsersRolePk];
export type UsersRoleCreationAttributes = UsersRoleAttributes;

export class UsersRole extends Model<UsersRoleAttributes, UsersRoleCreationAttributes> implements UsersRoleAttributes {
  adminsId!: number;
  rolesId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof UsersRole {
    return UsersRole.init({
    adminsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'admins_id'
    },
    rolesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Role',
        key: 'id'
      },
      field: 'roles_id'
    }
  }, {
    sequelize,
    tableName: 'Users_Role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "admins_id" },
          { name: "roles_id" },
        ]
      },
      {
        name: "ind_Users_Role_roles_id",
        using: "BTREE",
        fields: [
          { name: "roles_id" },
        ]
      },
    ]
  });
  }
}
