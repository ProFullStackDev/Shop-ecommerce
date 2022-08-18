/**
 * File Name  : MemberDepositLog.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MemberDepositLogAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  balance: number;
  credit: number;
  debit: number;
  memo?: string;
  type: number;
  memberId: number;
}

export type MemberDepositLogPk = "id";
export type MemberDepositLogId = MemberDepositLog[MemberDepositLogPk];
export type MemberDepositLogOptionalAttributes = "memo";
export type MemberDepositLogCreationAttributes = Optional<MemberDepositLogAttributes, MemberDepositLogOptionalAttributes>;

export class MemberDepositLog extends Model<MemberDepositLogAttributes, MemberDepositLogCreationAttributes> implements MemberDepositLogAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  balance!: number;
  credit!: number;
  debit!: number;
  memo?: string;
  type!: number;
  memberId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof MemberDepositLog {
    return MemberDepositLog.init({
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
    balance: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    credit: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    debit: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
    }
  }, {
    sequelize,
    tableName: 'MemberDepositLog',
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
        name: "ind_MemberDepositLog_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}
