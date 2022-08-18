/**
 * File Name  : StorePluginStatus.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StorePluginStatusAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  endDate: Date;
  pluginId: string;
  storeId: number;
}

export type StorePluginStatusPk = "id";
export type StorePluginStatusId = StorePluginStatus[StorePluginStatusPk];
export type StorePluginStatusCreationAttributes = StorePluginStatusAttributes;

export class StorePluginStatus extends Model<StorePluginStatusAttributes, StorePluginStatusCreationAttributes> implements StorePluginStatusAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  endDate!: Date;
  pluginId!: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StorePluginStatus {
    return StorePluginStatus.init({
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
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pluginId: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'StorePluginStatus',
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
        name: "UKd0ykhd9q9p6lcto6t2xjdnvk4",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pluginId" },
          { name: "store_id" },
        ]
      },
      {
        name: "ind_StorePluginStatus_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
