/**
 * File Name  : tcoin_log.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TcoinLogAttributes {
  id: number;
  userId: number;
  createDate: Date;
  type: number;
  amount: number;
  remark: string;
  txId?: string;
  txFromAddr?: string;
  txToAddr?: string;
}

export type TcoinLogPk = "id";
export type TcoinLogId = TcoinLog[TcoinLogPk];
export type TcoinLogOptionalAttributes = "createDate" | "txId" | "txFromAddr" | "txToAddr";
export type TcoinLogCreationAttributes = Optional<TcoinLogAttributes, TcoinLogOptionalAttributes>;

export class TcoinLog extends Model<TcoinLogAttributes, TcoinLogCreationAttributes> implements TcoinLogAttributes {
  id!: number;
  userId!: number;
  createDate!: Date;
  type!: number;
  amount!: number;
  remark!: string;
  txId?: string;
  txFromAddr?: string;
  txToAddr?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TcoinLog {
    return TcoinLog.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户id",
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间",
      field: 'create_date'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "类型"
    },
    amount: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      comment: "数量"
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "备注"
    },
    txId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "交易id",
      field: 'tx_id'
    },
    txFromAddr: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "转账地址",
      field: 'tx_from_addr'
    },
    txToAddr: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "接收地址",
      field: 'tx_to_addr'
    }
  }, {
    sequelize,
    tableName: 'tcoin_log',
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
        name: "tcoin_log_FK",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
