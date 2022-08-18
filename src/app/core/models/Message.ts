/**
 * File Name  : Message.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MessageAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  content: string;
  fromUserMessageStatusIsDeleted: boolean;
  fromUserMessageStatusIsRead: boolean;
  ip: string;
  toUserMessageStatusIsDeleted: boolean;
  toUserMessageStatusIsRead: boolean;
  fromUserId: number;
  messageGroupId: number;
  toUserId: number;
}

export type MessagePk = "id";
export type MessageId = Message[MessagePk];
export type MessageCreationAttributes = MessageAttributes;

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  content!: string;
  fromUserMessageStatusIsDeleted!: boolean;
  fromUserMessageStatusIsRead!: boolean;
  ip!: string;
  toUserMessageStatusIsDeleted!: boolean;
  toUserMessageStatusIsRead!: boolean;
  fromUserId!: number;
  messageGroupId!: number;
  toUserId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Message {
    return Message.init({
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fromUserMessageStatusIsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fromUserMessageStatusIsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    toUserMessageStatusIsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    toUserMessageStatusIsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fromUserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'fromUser_id'
    },
    messageGroupId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'MessageGroup',
        key: 'id'
      },
      field: 'messageGroup_id'
    },
    toUserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'toUser_id'
    }
  }, {
    sequelize,
    tableName: 'Message',
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
        name: "ind_Message_fromUser_id",
        using: "BTREE",
        fields: [
          { name: "fromUser_id" },
        ]
      },
      {
        name: "ind_Message_messageGroup_id",
        using: "BTREE",
        fields: [
          { name: "messageGroup_id" },
        ]
      },
      {
        name: "ind_Message_toUser_id",
        using: "BTREE",
        fields: [
          { name: "toUser_id" },
        ]
      },
    ]
  });
  }
}
