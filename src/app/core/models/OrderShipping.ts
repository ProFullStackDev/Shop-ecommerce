/**
 * File Name  : OrderShipping.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderShippingAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  address?: string;
  area?: string;
  consignee?: string;
  deliveryAddress?: string;
  deliveryCorp?: string;
  deliveryCorpCode?: string;
  deliveryCorpUrl?: string;
  electronicOrderEntries?: string;
  electronicOrderImage?: string;
  freight?: number;
  memo?: string;
  phone?: string;
  shippingMethod?: string;
  sn: string;
  trackingNo?: string;
  type: number;
  zipCode?: string;
  orders: number;
  isVisible: boolean;
}

export type OrderShippingPk = "id";
export type OrderShippingId = OrderShipping[OrderShippingPk];
export type OrderShippingOptionalAttributes = "address" | "area" | "consignee" | "deliveryAddress" | "deliveryCorp" | "deliveryCorpCode" | "deliveryCorpUrl" | "electronicOrderEntries" | "electronicOrderImage" | "freight" | "memo" | "phone" | "shippingMethod" | "trackingNo" | "zipCode";
export type OrderShippingCreationAttributes = Optional<OrderShippingAttributes, OrderShippingOptionalAttributes>;

export class OrderShipping extends Model<OrderShippingAttributes, OrderShippingCreationAttributes> implements OrderShippingAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  address?: string;
  area?: string;
  consignee?: string;
  deliveryAddress?: string;
  deliveryCorp?: string;
  deliveryCorpCode?: string;
  deliveryCorpUrl?: string;
  electronicOrderEntries?: string;
  electronicOrderImage?: string;
  freight?: number;
  memo?: string;
  phone?: string;
  shippingMethod?: string;
  sn!: string;
  trackingNo?: string;
  type!: number;
  zipCode?: string;
  orders!: number;
  isVisible!: boolean;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderShipping {
    return OrderShipping.init({
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
    consignee: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCorp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCorpCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCorpUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    electronicOrderEntries: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    electronicOrderImage: {
      type: DataTypes.TEXT,
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "用户是否可见"
    }
  }, {
    sequelize,
    tableName: 'OrderShipping',
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
        name: "ind_OrderShipping_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
    ]
  });
  }
}
