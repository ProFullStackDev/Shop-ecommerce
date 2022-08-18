/**
 * File Name  : OrderReturns.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderReturnsAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  address?: string;
  area?: string;
  deliveryCorp?: string;
  freight?: number;
  memo?: string;
  phone?: string;
  shipper?: string;
  shippingMethod?: string;
  sn: string;
  trackingNo?: string;
  zipCode?: string;
  orders: number;
}

export type OrderReturnsPk = "id";
export type OrderReturnsId = OrderReturns[OrderReturnsPk];
export type OrderReturnsOptionalAttributes = "address" | "area" | "deliveryCorp" | "freight" | "memo" | "phone" | "shipper" | "shippingMethod" | "trackingNo" | "zipCode";
export type OrderReturnsCreationAttributes = Optional<OrderReturnsAttributes, OrderReturnsOptionalAttributes>;

export class OrderReturns extends Model<OrderReturnsAttributes, OrderReturnsCreationAttributes> implements OrderReturnsAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  address?: string;
  area?: string;
  deliveryCorp?: string;
  freight?: number;
  memo?: string;
  phone?: string;
  shipper?: string;
  shippingMethod?: string;
  sn!: string;
  trackingNo?: string;
  zipCode?: string;
  orders!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderReturns {
    return OrderReturns.init({
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCorp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    freight: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shipper: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shippingMethod: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
    },
    trackingNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'OrderReturns',
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
        name: "ind_OrderReturns_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
    ]
  });
  }
}
