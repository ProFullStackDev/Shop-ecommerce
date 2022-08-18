/**
 * File Name  : DistributionCommission.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DistributionCommissionAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  amount: number;
  distributorId: number;
  orderItem: number;
}

export type DistributionCommissionPk = "id";
export type DistributionCommissionId = DistributionCommission[DistributionCommissionPk];
export type DistributionCommissionCreationAttributes = DistributionCommissionAttributes;

export class DistributionCommission extends Model<DistributionCommissionAttributes, DistributionCommissionCreationAttributes> implements DistributionCommissionAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  amount!: number;
  distributorId!: number;
  orderItem!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof DistributionCommission {
    return DistributionCommission.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(21,6),
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
    },
    orderItem: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'OrderItem',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'DistributionCommission',
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
        name: "ind_DistributionCommission_distributor_id",
        using: "BTREE",
        fields: [
          { name: "distributor_id" },
        ]
      },
      {
        name: "ind_DistributionCommission_orderItem",
        using: "BTREE",
        fields: [
          { name: "orderItem" },
        ]
      },
    ]
  });
  }
}
