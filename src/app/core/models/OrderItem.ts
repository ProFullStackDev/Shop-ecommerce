/**
 * File Name  : OrderItem.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderItemAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  balancePaymentTotals: number;
  couponDiscountTotals: number;
  deductionPointTotals: number;
  distributionCommissionTotals: number;
  exchangePoint: number;
  isDelivery: boolean;
  isTransfer: boolean;
  name: string;
  platformCommissionTotals: number;
  price: number;
  promotionDiscountTotals: number;
  quantity: number;
  returnedQuantity: number;
  reviewed: boolean;
  rewardPointTotals: number;
  shippedQuantity: number;
  showReviewToOwner?: boolean;
  sn: string;
  specifications?: string;
  thumbnail?: string;
  type: number;
  weight?: number;
  orders: number;
  skuId?: number;
  scmOrderShopNo?: string;
  shippingItemId?: number;
}

export type OrderItemPk = "id";
export type OrderItemId = OrderItem[OrderItemPk];
export type OrderItemOptionalAttributes = "showReviewToOwner" | "specifications" | "thumbnail" | "weight" | "skuId" | "scmOrderShopNo" | "shippingItemId";
export type OrderItemCreationAttributes = Optional<OrderItemAttributes, OrderItemOptionalAttributes>;

export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  balancePaymentTotals!: number;
  couponDiscountTotals!: number;
  deductionPointTotals!: number;
  distributionCommissionTotals!: number;
  exchangePoint!: number;
  isDelivery!: boolean;
  isTransfer!: boolean;
  name!: string;
  platformCommissionTotals!: number;
  price!: number;
  promotionDiscountTotals!: number;
  quantity!: number;
  returnedQuantity!: number;
  reviewed!: boolean;
  rewardPointTotals!: number;
  shippedQuantity!: number;
  showReviewToOwner?: boolean;
  sn!: string;
  specifications?: string;
  thumbnail?: string;
  type!: number;
  weight?: number;
  orders!: number;
  skuId?: number;
  scmOrderShopNo?: string;
  shippingItemId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderItem {
    return OrderItem.init({
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
    balancePaymentTotals: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    couponDiscountTotals: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    deductionPointTotals: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    distributionCommissionTotals: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    exchangePoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isTransfer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    platformCommissionTotals: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    promotionDiscountTotals: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    returnedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    rewardPointTotals: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    shippedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    showReviewToOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
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
    skuId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Sku',
        key: 'id'
      },
      field: 'sku_id'
    },
    scmOrderShopNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shippingItemId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ShippingItem',
        key: 'id'
      },
      field: 'shippingItem_id'
    }
  }, {
    sequelize,
    tableName: 'OrderItem',
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
        name: "ind_OrderItem_orders",
        using: "BTREE",
        fields: [
          { name: "orders" },
        ]
      },
      {
        name: "ind_OrderItem_sku_id",
        using: "BTREE",
        fields: [
          { name: "sku_id" },
        ]
      },
      {
        name: "scmOrderShopNo",
        using: "BTREE",
        fields: [
          { name: "scmOrderShopNo" },
        ]
      },
      {
        name: "FKj42h9hdvb7lhio63ca5wdbqd4",
        using: "BTREE",
        fields: [
          { name: "shippingItem_id" },
        ]
      },
    ]
  });
  }
}
