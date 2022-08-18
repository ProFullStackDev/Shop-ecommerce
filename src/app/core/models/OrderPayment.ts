/**
 * File Name  : OrderPayment.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderPaymentAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  account?: string;
  amount: number;
  bank?: string;
  fee: number;
  memo?: string;
  method: number;
  payer?: string;
  paymentMethod?: string;
  sn: string;
  orders: number;
  paymentTransactionId?: number;
}

export type OrderPaymentPk = "id";
export type OrderPaymentId = OrderPayment[OrderPaymentPk];
export type OrderPaymentOptionalAttributes = "account" | "bank" | "memo" | "payer" | "paymentMethod" | "paymentTransactionId";
export type OrderPaymentCreationAttributes = Optional<OrderPaymentAttributes, OrderPaymentOptionalAttributes>;

export class OrderPayment extends Model<OrderPaymentAttributes, OrderPaymentCreationAttributes> implements OrderPaymentAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  account?: string;
  amount!: number;
  bank?: string;
  fee!: number;
  memo?: string;
  method!: number;
  payer?: string;
  paymentMethod?: string;
  sn!: string;
  orders!: number;
  paymentTransactionId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderPayment {
    return OrderPayment.init({
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
    fee: {
      type: DataTypes.DECIMAL(21,6),
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
    payer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    },
    paymentTransactionId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'PaymentTransaction',
        key: 'id'
      },
      field: 'paymentTransaction_id'
    }
  }, {
    sequelize,
    tableName: 'OrderPayment',
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
        name: "ind_OrderPayment_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
      {
        name: "ind_OrderPayment_paymentTransaction_id",
        using: "BTREE",
        fields: [
          { name: "paymentTransaction_id" },
        ]
      },
    ]
  });
  }
}
