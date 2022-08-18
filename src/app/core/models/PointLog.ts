/**
 * File Name  : PointLog.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PointLogAttributes {
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

export type PointLogPk = "id";
export type PointLogId = PointLog[PointLogPk];
export type PointLogOptionalAttributes = "memo";
export type PointLogCreationAttributes = Optional<PointLogAttributes, PointLogOptionalAttributes>;

export class PointLog extends Model<PointLogAttributes, PointLogCreationAttributes> implements PointLogAttributes {
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

  static initModel(sequelize: Sequelize.Sequelize): typeof PointLog {
    return PointLog.init({
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
      type: DataTypes.BIGINT,
      allowNull: false
    },
    credit: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    debit: {
      type: DataTypes.BIGINT,
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
    tableName: 'PointLog',
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
        name: "ind_PointLog_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}
