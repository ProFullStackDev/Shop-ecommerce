/**
 * File Name  : LiveStreamer.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LiveStreamerAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  name: string;
  wechat: string;
  storeId?: number;
}

export type LiveStreamerPk = "id";
export type LiveStreamerId = LiveStreamer[LiveStreamerPk];
export type LiveStreamerOptionalAttributes = "storeId";
export type LiveStreamerCreationAttributes = Optional<LiveStreamerAttributes, LiveStreamerOptionalAttributes>;

export class LiveStreamer extends Model<LiveStreamerAttributes, LiveStreamerCreationAttributes> implements LiveStreamerAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  name!: string;
  wechat!: string;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof LiveStreamer {
    return LiveStreamer.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wechat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'LiveStreamer',
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
        name: "ind_LiveStreamer_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
