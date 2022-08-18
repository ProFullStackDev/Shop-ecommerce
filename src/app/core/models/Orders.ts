/**
 * File Name  : Orders.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrdersAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  address?: string;
  amount: number;
  amountPaid: number;
  areaName?: string;
  balancePaymentAmountPaid: number;
  completeDate?: Date;
  consignee?: string;
  couponDiscount: number;
  deductionPoint: number;
  exchangePoint: number;
  expire?: Date;
  fee: number;
  freight: number;
  isAllocatedStock: boolean;
  isAutoPreview: boolean;
  isDeductionPoint: boolean;
  isExchangePoint: boolean;
  isIncludeTransfer: boolean;
  isUseCouponCode: boolean;
  memo?: string;
  offlinePaymentAmountPaid: number;
  onlinePaymentAmountPaid: number;
  orderAmountRewardPointRate: number;
  paymentMethodName?: string;
  paymentMethodType?: number;
  phone?: string;
  pointCashRate: number;
  price: number;
  promotionDiscount: number;
  promotionNames?: string;
  quantity: number;
  refundAmount: number;
  refundBalancePaymentAmount: number;
  refundDeductionPoint: number;
  refundExchangePoint: number;
  refundOfflinePaymentAmount: number;
  refundOnlinePaymentAmount: number;
  refundRewardPoint: number;
  returnedQuantity: number;
  rewardPoint: number;
  shippedQuantity: number;
  shippingMethodName?: string;
  sn: string;
  status: number;
  type: number;
  weight: number;
  zipCode?: string;
  areaId?: number;
  couponCodeId?: number;
  groupBuyingId?: number;
  groupBuyingPromotionId?: number;
  memberId: number;
  paymentMethodId?: number;
  shippingMethodId?: number;
  storeId: number;
}

export type OrdersPk = "id";
export type OrdersId = Orders[OrdersPk];
export type OrdersOptionalAttributes = "address" | "areaName" | "completeDate" | "consignee" | "expire" | "memo" | "paymentMethodName" | "paymentMethodType" | "phone" | "promotionNames" | "shippingMethodName" | "zipCode" | "areaId" | "couponCodeId" | "groupBuyingId" | "groupBuyingPromotionId" | "paymentMethodId" | "shippingMethodId";
export type OrdersCreationAttributes = Optional<OrdersAttributes, OrdersOptionalAttributes>;

export class Orders extends Model<OrdersAttributes, OrdersCreationAttributes> implements OrdersAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  address?: string;
  amount!: number;
  amountPaid!: number;
  areaName?: string;
  balancePaymentAmountPaid!: number;
  completeDate?: Date;
  consignee?: string;
  couponDiscount!: number;
  deductionPoint!: number;
  exchangePoint!: number;
  expire?: Date;
  fee!: number;
  freight!: number;
  isAllocatedStock!: boolean;
  isAutoPreview!: boolean;
  isDeductionPoint!: boolean;
  isExchangePoint!: boolean;
  isIncludeTransfer!: boolean;
  isUseCouponCode!: boolean;
  memo?: string;
  offlinePaymentAmountPaid!: number;
  onlinePaymentAmountPaid!: number;
  orderAmountRewardPointRate!: number;
  paymentMethodName?: string;
  paymentMethodType?: number;
  phone?: string;
  pointCashRate!: number;
  price!: number;
  promotionDiscount!: number;
  promotionNames?: string;
  quantity!: number;
  refundAmount!: number;
  refundBalancePaymentAmount!: number;
  refundDeductionPoint!: number;
  refundExchangePoint!: number;
  refundOfflinePaymentAmount!: number;
  refundOnlinePaymentAmount!: number;
  refundRewardPoint!: number;
  returnedQuantity!: number;
  rewardPoint!: number;
  shippedQuantity!: number;
  shippingMethodName?: string;
  sn!: string;
  status!: number;
  type!: number;
  weight!: number;
  zipCode?: string;
  areaId?: number;
  couponCodeId?: number;
  groupBuyingId?: number;
  groupBuyingPromotionId?: number;
  memberId!: number;
  paymentMethodId?: number;
  shippingMethodId?: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Orders {
    return Orders.init({
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
    amount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    amountPaid: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    areaName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    balancePaymentAmountPaid: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    completeDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    consignee: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    couponDiscount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    deductionPoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    exchangePoint: {
      type: DataTypes.BIGINT,
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
    freight: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    isAllocatedStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isAutoPreview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDeductionPoint: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isExchangePoint: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isIncludeTransfer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isUseCouponCode: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    offlinePaymentAmountPaid: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    onlinePaymentAmountPaid: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    orderAmountRewardPointRate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    paymentMethodName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    paymentMethodType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pointCashRate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    promotionDiscount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    promotionNames: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    refundAmount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    refundBalancePaymentAmount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    refundDeductionPoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    refundExchangePoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    refundOfflinePaymentAmount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    refundOnlinePaymentAmount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    refundRewardPoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    returnedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rewardPoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    shippedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shippingMethodName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'area_id'
    },
    couponCodeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'CouponCode',
        key: 'id'
      },
      field: 'couponCode_id'
    },
    groupBuyingId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'GroupBuying',
        key: 'id'
      },
      field: 'groupBuying_id'
    },
    groupBuyingPromotionId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Promotion',
        key: 'id'
      },
      field: 'groupBuyingPromotion_id'
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
    },
    paymentMethodId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'PaymentMethod',
        key: 'id'
      },
      field: 'paymentMethod_id'
    },
    shippingMethodId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ShippingMethod',
        key: 'id'
      },
      field: 'shippingMethod_id'
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'Orders',
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
        name: "ind_Orders_area_id",
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
      {
        name: "ind_Orders_couponCode_id",
        using: "BTREE",
        fields: [
          { name: "couponCode_id" },
        ]
      },
      {
        name: "ind_Orders_groupBuying_id",
        using: "BTREE",
        fields: [
          { name: "groupBuying_id" },
        ]
      },
      {
        name: "ind_Orders_groupBuyingPromotion_id",
        using: "BTREE",
        fields: [
          { name: "groupBuyingPromotion_id" },
        ]
      },
      {
        name: "ind_Orders_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_Orders_paymentMethod_id",
        using: "BTREE",
        fields: [
          { name: "paymentMethod_id" },
        ]
      },
      {
        name: "ind_Orders_shippingMethod_id",
        using: "BTREE",
        fields: [
          { name: "shippingMethod_id" },
        ]
      },
      {
        name: "ind_Orders_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
