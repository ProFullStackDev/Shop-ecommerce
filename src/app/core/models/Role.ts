/**
 * File Name  : Role.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RoleAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  description?: string;
  isSystem: boolean;
  name: string;
  permissions: string;
}

export type RolePk = "id";
export type RoleId = Role[RolePk];
export type RoleOptionalAttributes = "description";
export type RoleCreationAttributes = Optional<RoleAttributes, RoleOptionalAttributes>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  description?: string;
  isSystem!: boolean;
  name!: string;
  permissions!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Role {
    return Role.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
