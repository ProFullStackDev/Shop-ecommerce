/**
 * File Name  : BusinessCash.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface BusinessCashAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  account: string;
  amount: number;
  bank: string;
  status: number;
  businessId: number;
}

export type BusinessCashPk = "id";
export type BusinessCashId = BusinessCash[BusinessCashPk];
export type BusinessCashCreationAttributes = BusinessCashAttributes;

export class BusinessCash extends Model<BusinessCashAttributes, BusinessCashCreationAttributes> implements BusinessCashAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  account!: string;
  amount!: number;
  bank!: string;
  status!: number;
  businessId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof BusinessCash {
    return BusinessCash.init({
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
    account: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    bank: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
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
    tableName: 'BusinessCash',
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
        name: "ind_BusinessCash_business_id",
        using: "BTREE",
        fields: [
          { name: "business_id" },
        ]
      },
    ]
  });
  }
}
