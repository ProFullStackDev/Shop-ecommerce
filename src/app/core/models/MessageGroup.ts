/**
 * File Name  : MessageGroup.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MessageGroupAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  user1MessageStatusIsDeleted: boolean;
  user1MessageStatusIsRead: boolean;
  user2MessageStatusIsDeleted: boolean;
  user2MessageStatusIsRead: boolean;
  user1Id: number;
  user2Id: number;
}

export type MessageGroupPk = "id";
export type MessageGroupId = MessageGroup[MessageGroupPk];
export type MessageGroupCreationAttributes = MessageGroupAttributes;

export class MessageGroup extends Model<MessageGroupAttributes, MessageGroupCreationAttributes> implements MessageGroupAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  user1MessageStatusIsDeleted!: boolean;
  user1MessageStatusIsRead!: boolean;
  user2MessageStatusIsDeleted!: boolean;
  user2MessageStatusIsRead!: boolean;
  user1Id!: number;
  user2Id!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof MessageGroup {
    return MessageGroup.init({
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
    user1MessageStatusIsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user1MessageStatusIsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user2MessageStatusIsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user2MessageStatusIsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user1Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user1_id'
    },
    user2Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user2_id'
    }
  }, {
    sequelize,
    tableName: 'MessageGroup',
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
        name: "ind_MessageGroup_user1_id",
        using: "BTREE",
        fields: [
          { name: "user1_id" },
        ]
      },
      {
        name: "ind_MessageGroup_user2_id",
        using: "BTREE",
        fields: [
          { name: "user2_id" },
        ]
      },
    ]
  });
  }
}
