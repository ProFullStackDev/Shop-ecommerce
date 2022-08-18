/**
 * File Name  : DistributionCash.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DistributionCashAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  account: string;
  accountHolder: string;
  amount: number;
  bank: string;
  status: number;
  distributorId: number;
}

export type DistributionCashPk = "id";
export type DistributionCashId = DistributionCash[DistributionCashPk];
export type DistributionCashCreationAttributes = DistributionCashAttributes;

export class DistributionCash extends Model<DistributionCashAttributes, DistributionCashCreationAttributes> implements DistributionCashAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  account!: string;
  accountHolder!: string;
  amount!: number;
  bank!: string;
  status!: number;
  distributorId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof DistributionCash {
    return DistributionCash.init({
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
    accountHolder: {
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
    distributorId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Distributor',
        key: 'id'
      },
      field: 'distributor_id'
    }
  }, {
    sequelize,
    tableName: 'DistributionCash',
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
        name: "ind_DistributionCash_distributor_id",
        using: "BTREE",
        fields: [
          { name: "distributor_id" },
        ]
      },
    ]
  });
  }
}
