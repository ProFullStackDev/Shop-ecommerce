/**
 * File Name  : OrderRefunds.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderRefundsAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  account?: string;
  amount: number;
  bank?: string;
  completed: boolean;
  memo?: string;
  method: number;
  payee?: string;
  paymentMethod?: string;
  refundAmount: number;
  sn: string;
  orders: number;
}

export type OrderRefundsPk = "id";
export type OrderRefundsId = OrderRefunds[OrderRefundsPk];
export type OrderRefundsOptionalAttributes = "account" | "bank" | "memo" | "payee" | "paymentMethod";
export type OrderRefundsCreationAttributes = Optional<OrderRefundsAttributes, OrderRefundsOptionalAttributes>;

export class OrderRefunds extends Model<OrderRefundsAttributes, OrderRefundsCreationAttributes> implements OrderRefundsAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  account?: string;
  amount!: number;
  bank?: string;
  completed!: boolean;
  memo?: string;
  method!: number;
  payee?: string;
  paymentMethod?: string;
  refundAmount!: number;
  sn!: string;
  orders!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderRefunds {
    return OrderRefunds.init({
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
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    bank: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payee: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    refundAmount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
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
    tableName: 'OrderRefunds',
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
        name: "sn",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sn" },
        ]
      },
      {
        name: "ind_OrderRefunds_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
    ]
  });
  }
}
