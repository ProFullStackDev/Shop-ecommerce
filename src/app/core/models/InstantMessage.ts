/**
 * File Name  : InstantMessage.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface InstantMessageAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  isEnabled: boolean;
  miniProgramUrl?: string;
  webUrl?: string;
  storeId: number;
  height?: number;
  width?: number;
}

export type InstantMessagePk = "id";
export type InstantMessageId = InstantMessage[InstantMessagePk];
export type InstantMessageOptionalAttributes = "miniProgramUrl" | "webUrl" | "height" | "width";
export type InstantMessageCreationAttributes = Optional<InstantMessageAttributes, InstantMessageOptionalAttributes>;

export class InstantMessage extends Model<InstantMessageAttributes, InstantMessageCreationAttributes> implements InstantMessageAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  isEnabled!: boolean;
  miniProgramUrl?: string;
  webUrl?: string;
  storeId!: number;
  height?: number;
  width?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof InstantMessage {
    return InstantMessage.init({
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
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    miniProgramUrl: {
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
      unique: "FK8tsj0h8ov98pkmurlb8j7sfak",
      field: 'store_id'
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    width: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'InstantMessage',
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
        name: "store_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "UK_8wchrpiohct2l5vg4lwjlh48c",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
