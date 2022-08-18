/**
 * File Name  : Coupon_PromotionAttribute.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CouponPromotionAttributeAttributes {
  couponId: number;
  couponAttributesId: number;
}

export type CouponPromotionAttributePk = "couponId" | "couponAttributesId";
export type CouponPromotionAttributeId = CouponPromotionAttribute[CouponPromotionAttributePk];
export type CouponPromotionAttributeCreationAttributes = CouponPromotionAttributeAttributes;

export class CouponPromotionAttribute extends Model<CouponPromotionAttributeAttributes, CouponPromotionAttributeCreationAttributes> implements CouponPromotionAttributeAttributes {
  couponId!: number;
  couponAttributesId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CouponPromotionAttribute {
    return CouponPromotionAttribute.init({
    couponId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'Coupon_id'
    },
    couponAttributesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PromotionAttribute',
        key: 'id'
      },
      field: 'couponAttributes_id'
    }
  }, {
    sequelize,
    tableName: 'Coupon_PromotionAttribute',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Coupon_id" },
          { name: "couponAttributes_id" },
        ]
      },
      {
        name: "ind_Coupon_PromotionAttribute_couponAttributes_id",
        using: "BTREE",
        fields: [
          { name: "couponAttributes_id" },
        ]
      },
    ]
  });
  }
}
