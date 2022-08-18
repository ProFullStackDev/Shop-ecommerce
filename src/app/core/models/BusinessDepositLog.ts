/**
 * File Name  : BusinessDepositLog.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface BusinessDepositLogAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  balance: number;
  credit: number;
  debit: number;
  memo?: string;
  type: number;
  businessId: number;
}

export type BusinessDepositLogPk = "id";
export type BusinessDepositLogId = BusinessDepositLog[BusinessDepositLogPk];
export type BusinessDepositLogOptionalAttributes = "memo";
export type BusinessDepositLogCreationAttributes = Optional<BusinessDepositLogAttributes, BusinessDepositLogOptionalAttributes>;

export class BusinessDepositLog extends Model<BusinessDepositLogAttributes, BusinessDepositLogCreationAttributes> implements BusinessDepositLogAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  balance!: number;
  credit!: number;
  debit!: number;
  memo?: string;
  type!: number;
  businessId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof BusinessDepositLog {
    return BusinessDepositLog.init({
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
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'business_id'
    }
  }, {
    sequelize,
    tableName: 'BusinessDepositLog',
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
        name: "ind_BusinessDepositLog_business_id",
        using: "BTREE",
        fields: [
          { name: "business_id" },
        ]
      },
    ]
  });
  }
}
