/**
 * File Name  : OrderLog.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderLogAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  detail?: string;
  type: number;
  orders: number;
}

export type OrderLogPk = "id";
export type OrderLogId = OrderLog[OrderLogPk];
export type OrderLogOptionalAttributes = "detail";
export type OrderLogCreationAttributes = Optional<OrderLogAttributes, OrderLogOptionalAttributes>;

export class OrderLog extends Model<OrderLogAttributes, OrderLogCreationAttributes> implements OrderLogAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  detail?: string;
  type!: number;
  orders!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderLog {
    return OrderLog.init({
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
    detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orders: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'OrderLog',
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
        name: "ind_OrderLog_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
    ]
  });
  }
}
