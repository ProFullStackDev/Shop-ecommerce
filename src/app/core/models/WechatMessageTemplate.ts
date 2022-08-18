/**
 * File Name  : WechatMessageTemplate.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WechatMessageTemplateAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  templateId: string;
  title: string;
  templateParameters?: string;
  messageConfigId: number;
}

export type WechatMessageTemplatePk = "id";
export type WechatMessageTemplateId = WechatMessageTemplate[WechatMessageTemplatePk];
export type WechatMessageTemplateOptionalAttributes = "templateParameters";
export type WechatMessageTemplateCreationAttributes = Optional<WechatMessageTemplateAttributes, WechatMessageTemplateOptionalAttributes>;

export class WechatMessageTemplate extends Model<WechatMessageTemplateAttributes, WechatMessageTemplateCreationAttributes> implements WechatMessageTemplateAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  templateId!: string;
  title!: string;
  templateParameters?: string;
  messageConfigId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof WechatMessageTemplate {
    return WechatMessageTemplate.init({
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
    templateId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    templateParameters: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    messageConfigId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'MessageConfig',
        key: 'id'
      },
      unique: "FK5g68wcldggmxi74gsgjdqfjgq",
      field: 'messageConfig_id'
    }
  }, {
    sequelize,
    tableName: 'WechatMessageTemplate',
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
        name: "messageConfig_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "messageConfig_id" },
        ]
      },
      {
        name: "UK_bu1io1gpbphg25b0fs9dlgdxv",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "messageConfig_id" },
        ]
      },
    ]
  });
  }
}
