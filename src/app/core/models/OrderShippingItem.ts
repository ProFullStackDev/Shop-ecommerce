/**
 * File Name  : OrderShippingItem.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderShippingItemAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  isDelivery: boolean;
  name: string;
  quantity: number;
  sn: string;
  specifications?: string;
  orderShippingId: number;
  skuId?: number;
  scmOrderId?: string;
  scmOrderShopNo?: string;
  scmOrderNum?: string;
  scmOrderItemId?: string;
  scmOrderItemOrderNum?: string;
  scmOrderItemSupplyOrderNo?: string;
  scmOrderItemSkuId?: string;
  isVisible: boolean;
}

export type OrderShippingItemPk = "id";
export type OrderShippingItemId = OrderShippingItem[OrderShippingItemPk];
export type OrderShippingItemOptionalAttributes = "specifications" | "skuId" | "scmOrderId" | "scmOrderShopNo" | "scmOrderNum" | "scmOrderItemId" | "scmOrderItemOrderNum" | "scmOrderItemSupplyOrderNo" | "scmOrderItemSkuId";
export type OrderShippingItemCreationAttributes = Optional<OrderShippingItemAttributes, OrderShippingItemOptionalAttributes>;

export class OrderShippingItem extends Model<OrderShippingItemAttributes, OrderShippingItemCreationAttributes> implements OrderShippingItemAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  isDelivery!: boolean;
  name!: string;
  quantity!: number;
  sn!: string;
  specifications?: string;
  orderShippingId!: number;
  skuId?: number;
  scmOrderId?: string;
  scmOrderShopNo?: string;
  scmOrderNum?: string;
  scmOrderItemId?: string;
  scmOrderItemOrderNum?: string;
  scmOrderItemSupplyOrderNo?: string;
  scmOrderItemSkuId?: string;
  isVisible!: boolean;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderShippingItem {
    return OrderShippingItem.init({
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
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    orderShippingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'OrderShipping',
        key: 'id'
      },
      field: 'orderShipping_id'
    },
    skuId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Sku',
        key: 'id'
      },
      field: 'sku_id'
    },
    scmOrderId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链订单ID",
      field: 'scm_order_id'
    },
    scmOrderShopNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链购物单号",
      field: 'scm_order_shop_no'
    },
    scmOrderNum: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链订单号",
      field: 'scm_order_num'
    },
    scmOrderItemId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链ItemID",
      field: 'scm_order_item_id'
    },
    scmOrderItemOrderNum: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链订单项号",
      field: 'scm_order_item_order_num'
    },
    scmOrderItemSupplyOrderNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链供应商订单号",
      field: 'scm_order_item_supply_order_no'
    },
    scmOrderItemSkuId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链skuID",
      field: 'scm_order_item_sku_id'
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "用户是否可见"
    }
  }, {
    sequelize,
    tableName: 'OrderShippingItem',
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
        name: "ind_OrderShippingItem_orderShipping_id",
        using: "BTREE",
        fields: [
          { name: "orderShipping_id" },
        ]
      },
      {
        name: "ind_OrderShippingItem_sku_id",
        using: "BTREE",
        fields: [
          { name: "sku_id" },
        ]
      },
      {
        name: "scm_order_item_id",
        using: "BTREE",
        fields: [
          { name: "scm_order_item_id" },
        ]
      },
    ]
  });
  }
}
