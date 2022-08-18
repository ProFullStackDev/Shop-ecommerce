/**
 * File Name  : ShippingItem.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ShippingItemAttributes {
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
  freight?: number;
  memo?: string;
  phone?: string;
  shippingMethod?: string;
  trackingNo?: string;
  type: number;
  zipCode?: string;
  orders: number;
  orderItemId: number;
  name: string;
  specifications?: string;
  quantity: number;
  isDelivery: boolean;
  skuId?: number;
  skuSn?: string;
  supplyShopNo?: string;
}

export type ShippingItemPk = "id";
export type ShippingItemId = ShippingItem[ShippingItemPk];
export type ShippingItemOptionalAttributes = "version" | "address" | "area" | "consignee" | "deliveryAddress" | "deliveryCorp" | "deliveryCorpCode" | "deliveryCorpUrl" | "freight" | "memo" | "phone" | "shippingMethod" | "trackingNo" | "zipCode" | "specifications" | "skuId" | "skuSn" | "supplyShopNo";
export type ShippingItemCreationAttributes = Optional<ShippingItemAttributes, ShippingItemOptionalAttributes>;

export class ShippingItem extends Model<ShippingItemAttributes, ShippingItemCreationAttributes> implements ShippingItemAttributes {
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
  freight?: number;
  memo?: string;
  phone?: string;
  shippingMethod?: string;
  trackingNo?: string;
  type!: number;
  zipCode?: string;
  orders!: number;
  orderItemId!: number;
  name!: string;
  specifications?: string;
  quantity!: number;
  isDelivery!: boolean;
  skuId?: number;
  skuSn?: string;
  supplyShopNo?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof ShippingItem {
    return ShippingItem.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "发货项ID"
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "发货项创建时间"
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "发货项更新时间"
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "发货项版本"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "地址"
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "区域"
    },
    consignee: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "收货人"
    },
    deliveryAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "发货地址"
    },
    deliveryCorp: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "物流公司"
    },
    deliveryCorpCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "物流公司代码"
    },
    deliveryCorpUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "物流公司网址"
    },
    freight: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true,
      comment: "物流费用"
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "备注"
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "电话"
    },
    shippingMethod: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "配送方式"
    },
    trackingNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "运单号"
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "类型"
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "邮编"
    },
    orders: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "订单ID",
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    orderItemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "订单项ID",
      references: {
        model: 'OrderItem',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "订单项名称"
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "规格"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "发货数量"
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "是否需要物流"
    },
    skuId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "skuID",
      references: {
        model: 'Sku',
        key: 'id'
      }
    },
    skuSn: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "skuSn"
    },
    supplyShopNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链购物单号"
    }
  }, {
    sequelize,
    tableName: 'ShippingItem',
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
        name: "ind_ShippingItem_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
      {
        name: "ind_ShippingItem_orderItemId",
        using: "BTREE",
        fields: [
          { name: "orderItemId" },
        ]
      },
      {
        name: "ind_ShippingItem_skuId",
        using: "BTREE",
        fields: [
          { name: "skuId" },
        ]
      },
    ]
  });
  }
}
