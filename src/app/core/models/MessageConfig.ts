/**
 * File Name  : MessageConfig.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MessageConfigAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  isMailEnabled: boolean;
  isSmsEnabled: boolean;
  isWechatMessageEnabled: boolean;
  type: number;
}

export type MessageConfigPk = "id";
export type MessageConfigId = MessageConfig[MessageConfigPk];
export type MessageConfigCreationAttributes = MessageConfigAttributes;

export class MessageConfig extends Model<MessageConfigAttributes, MessageConfigCreationAttributes> implements MessageConfigAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  isMailEnabled!: boolean;
  isSmsEnabled!: boolean;
  isWechatMessageEnabled!: boolean;
  type!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof MessageConfig {
    return MessageConfig.init({
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
    isMailEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isSmsEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isWechatMessageEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "type"
    }
  }, {
    sequelize,
    tableName: 'MessageConfig',
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
        name: "type",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
  }
}
