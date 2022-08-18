/**
 * File Name  : SocialUser.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SocialUserAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  loginPluginId: string;
  uniqueId: string;
  userId?: number;
}

export type SocialUserPk = "id";
export type SocialUserId = SocialUser[SocialUserPk];
export type SocialUserOptionalAttributes = "userId";
export type SocialUserCreationAttributes = Optional<SocialUserAttributes, SocialUserOptionalAttributes>;

export class SocialUser extends Model<SocialUserAttributes, SocialUserCreationAttributes> implements SocialUserAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  loginPluginId!: string;
  uniqueId!: string;
  userId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof SocialUser {
    return SocialUser.init({
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
    loginPluginId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uniqueId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    }
  }, {
    sequelize,
    tableName: 'SocialUser',
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
      {
        name: "UKgi1tfdkhwbjxevlhxf6km20l2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "loginPluginId" },
          { name: "uniqueId" },
        ]
      },
      {
        name: "ind_SocialUser_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
