/**
 * File Name  : StoreProductTag.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreProductTagAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  isEnabled: boolean;
  memo?: string;
  mobileImage?: string;
  mobileUrl?: string;
  name: string;
  webImage?: string;
  webUrl?: string;
  storeId: number;
}

export type StoreProductTagPk = "id";
export type StoreProductTagId = StoreProductTag[StoreProductTagPk];
export type StoreProductTagOptionalAttributes = "orders" | "memo" | "mobileImage" | "mobileUrl" | "webImage" | "webUrl";
export type StoreProductTagCreationAttributes = Optional<StoreProductTagAttributes, StoreProductTagOptionalAttributes>;

export class StoreProductTag extends Model<StoreProductTagAttributes, StoreProductTagCreationAttributes> implements StoreProductTagAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  isEnabled!: boolean;
  memo?: string;
  mobileImage?: string;
  mobileUrl?: string;
  name!: string;
  webImage?: string;
  webUrl?: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreProductTag {
    return StoreProductTag.init({
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
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobileImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobileUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    webImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    webUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'StoreProductTag',
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
        name: "ind_StoreProductTag_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
