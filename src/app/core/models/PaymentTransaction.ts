/**
 * File Name  : PaymentTransaction.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PaymentTransactionAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  amount: number;
  expire?: Date;
  fee: number;
  isSuccess?: boolean;
  paymentPluginId?: string;
  paymentPluginName?: string;
  rePayUrl?: string;
  sn: string;
  type?: number;
  orders?: number;
  orderRefundsId?: number;
  parentId?: number;
  storeId?: number;
  svcId?: number;
  userId?: number;
}

export type PaymentTransactionPk = "id";
export type PaymentTransactionId = PaymentTransaction[PaymentTransactionPk];
export type PaymentTransactionOptionalAttributes = "expire" | "isSuccess" | "paymentPluginId" | "paymentPluginName" | "rePayUrl" | "type" | "orders" | "orderRefundsId" | "parentId" | "storeId" | "svcId" | "userId";
export type PaymentTransactionCreationAttributes = Optional<PaymentTransactionAttributes, PaymentTransactionOptionalAttributes>;

export class PaymentTransaction extends Model<PaymentTransactionAttributes, PaymentTransactionCreationAttributes> implements PaymentTransactionAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  amount!: number;
  expire?: Date;
  fee!: number;
  isSuccess?: boolean;
  paymentPluginId?: string;
  paymentPluginName?: string;
  rePayUrl?: string;
  sn!: string;
  type?: number;
  orders?: number;
  orderRefundsId?: number;
  parentId?: number;
  storeId?: number;
  svcId?: number;
  userId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PaymentTransaction {
    return PaymentTransaction.init({
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
    amount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fee: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    paymentPluginId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    paymentPluginName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rePayUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orders: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    orderRefundsId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'OrderRefunds',
        key: 'id'
      },
      field: 'orderRefunds_id'
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'PaymentTransaction',
        key: 'id'
      },
      field: 'parent_id'
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    },
    svcId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Svc',
        key: 'id'
      },
      field: 'svc_id'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    }
  }, {
    sequelize,
    tableName: 'PaymentTransaction',
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
        name: "ind_PaymentTransaction_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
      {
        name: "ind_PaymentTransaction_orderRefunds_id",
        using: "BTREE",
        fields: [
          { name: "orderRefunds_id" },
        ]
      },
      {
        name: "ind_PaymentTransaction_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
      {
        name: "ind_PaymentTransaction_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "ind_PaymentTransaction_svc_id",
        using: "BTREE",
        fields: [
          { name: "svc_id" },
        ]
      },
      {
        name: "ind_PaymentTransaction_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
