/**
 * File Name  : member_recharge_log.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MemberRechargeLogAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  actualAmountPaid?: number;
  actualAmountReceived?: number;
  giftAmount?: number;
  status?: number;
  userId?: number;
  memo?: string;
}

export type MemberRechargeLogPk = "id";
export type MemberRechargeLogId = MemberRechargeLog[MemberRechargeLogPk];
export type MemberRechargeLogOptionalAttributes = "createdDate" | "lastModifiedDate" | "version" | "actualAmountPaid" | "actualAmountReceived" | "giftAmount" | "status" | "userId" | "memo";
export type MemberRechargeLogCreationAttributes = Optional<MemberRechargeLogAttributes, MemberRechargeLogOptionalAttributes>;

export class MemberRechargeLog extends Model<MemberRechargeLogAttributes, MemberRechargeLogCreationAttributes> implements MemberRechargeLogAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  actualAmountPaid?: number;
  actualAmountReceived?: number;
  giftAmount?: number;
  status?: number;
  userId?: number;
  memo?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof MemberRechargeLog {
    return MemberRechargeLog.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "用户充值记录ID"
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间",
      field: 'created_date'
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间",
      field: 'last_modified_date'
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "版本号"
    },
    actualAmountPaid: {
      type: DataTypes.DECIMAL(27,6),
      allowNull: true,
      comment: "实际支付金额",
      field: 'actual_amount_paid'
    },
    actualAmountReceived: {
      type: DataTypes.DECIMAL(27,6),
      allowNull: true,
      comment: "实际到账金额",
      field: 'actual_amount_received'
    },
    giftAmount: {
      type: DataTypes.DECIMAL(27,6),
      allowNull: true,
      comment: "赠送金额",
      field: 'gift_amount'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "状态： 0:等待支付 1:已支付 2:已取消"
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "userId",
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "备注\n"
    }
  }, {
    sequelize,
    tableName: 'member_recharge_log',
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
        name: "Users_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "member_recharge__n1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
