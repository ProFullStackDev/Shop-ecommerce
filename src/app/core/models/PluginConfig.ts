/**
 * File Name  : PluginConfig.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PluginConfigAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  attributes?: string;
  isEnabled: boolean;
  pluginId: string;
}

export type PluginConfigPk = "id";
export type PluginConfigId = PluginConfig[PluginConfigPk];
export type PluginConfigOptionalAttributes = "orders" | "attributes";
export type PluginConfigCreationAttributes = Optional<PluginConfigAttributes, PluginConfigOptionalAttributes>;

export class PluginConfig extends Model<PluginConfigAttributes, PluginConfigCreationAttributes> implements PluginConfigAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  attributes?: string;
  isEnabled!: boolean;
  pluginId!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof PluginConfig {
    return PluginConfig.init({
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
    attributes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    pluginId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "pluginId"
    }
  }, {
    sequelize,
    tableName: 'PluginConfig',
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
        name: "pluginId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pluginId" },
        ]
      },
    ]
  });
  }
}
