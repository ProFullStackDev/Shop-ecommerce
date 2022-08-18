/**
 * File Name  : FriendLink.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FriendLinkAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  logo?: string;
  name: string;
  type: number;
  url: string;
}

export type FriendLinkPk = "id";
export type FriendLinkId = FriendLink[FriendLinkPk];
export type FriendLinkOptionalAttributes = "orders" | "logo";
export type FriendLinkCreationAttributes = Optional<FriendLinkAttributes, FriendLinkOptionalAttributes>;

export class FriendLink extends Model<FriendLinkAttributes, FriendLinkCreationAttributes> implements FriendLinkAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  logo?: string;
  name!: string;
  type!: number;
  url!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof FriendLink {
    return FriendLink.init({
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
    orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'FriendLink',
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
