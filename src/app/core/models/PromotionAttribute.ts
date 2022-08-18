/**
 * File Name  : PromotionAttribute.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PromotionAttributeAttributes {
  dtype: string;
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  maxPrice?: number;
  maxQuantity?: number;
  minPrice?: number;
  minQuantity?: number;
  discountType?: number;
  discountValue?: number;
  groupBuyingType?: number;
  groupDuration?: number;
  groupSize?: number;
  isAutomaticGroup?: boolean;
  orderPurchasingLimit?: number;
  promotionPurchasingLimit?: number;
  sponsorDiscountType?: number;
  sponsorDiscountValue?: number;
  transfers?: string;
  conditionValue?: number;
  isFreeShipping?: boolean;
  stairways?: string;
  promotionId: number;
}

export type PromotionAttributePk = "id";
export type PromotionAttributeId = PromotionAttribute[PromotionAttributePk];
export type PromotionAttributeOptionalAttributes = "maxPrice" | "maxQuantity" | "minPrice" | "minQuantity" | "discountType" | "discountValue" | "groupBuyingType" | "groupDuration" | "groupSize" | "isAutomaticGroup" | "orderPurchasingLimit" | "promotionPurchasingLimit" | "sponsorDiscountType" | "sponsorDiscountValue" | "transfers" | "conditionValue" | "isFreeShipping" | "stairways";
export type PromotionAttributeCreationAttributes = Optional<PromotionAttributeAttributes, PromotionAttributeOptionalAttributes>;

export class PromotionAttribute extends Model<PromotionAttributeAttributes, PromotionAttributeCreationAttributes> implements PromotionAttributeAttributes {
  dtype!: string;
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  maxPrice?: number;
  maxQuantity?: number;
  minPrice?: number;
  minQuantity?: number;
  discountType?: number;
  discountValue?: number;
  groupBuyingType?: number;
  groupDuration?: number;
  groupSize?: number;
  isAutomaticGroup?: boolean;
  orderPurchasingLimit?: number;
  promotionPurchasingLimit?: number;
  sponsorDiscountType?: number;
  sponsorDiscountValue?: number;
  transfers?: string;
  conditionValue?: number;
  isFreeShipping?: boolean;
  stairways?: string;
  promotionId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PromotionAttribute {
    return PromotionAttribute.init({
    dtype: {
      type: DataTypes.STRING(31),
      allowNull: false
    },
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
    maxPrice: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minPrice: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true
    },
    minQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discountType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discountValue: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true
    },
    groupBuyingType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupDuration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupSize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isAutomaticGroup: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    orderPurchasingLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    promotionPurchasingLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sponsorDiscountType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sponsorDiscountValue: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true
    },
    transfers: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    conditionValue: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true
    },
    isFreeShipping: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    stairways: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    promotionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Promotion',
        key: 'id'
      },
      unique: "FKo9dtnr8ujkjc00dm8y8j5km63",
      field: 'promotion_id'
    }
  }, {
    sequelize,
    tableName: 'PromotionAttribute',
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
        name: "promotion_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "promotion_id" },
        ]
      },
      {
        name: "UK_hbkgiakf7ag0prx8aixdp96o4",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "promotion_id" },
        ]
      },
    ]
  });
  }
}
