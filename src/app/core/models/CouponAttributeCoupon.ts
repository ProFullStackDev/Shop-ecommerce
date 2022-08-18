/**
 * File Name  : CouponAttribute_Coupon.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CouponAttributeCouponAttributes {
  couponAttributeId: number;
  couponsId: number;
}

export type CouponAttributeCouponPk = "couponAttributeId" | "couponsId";
export type CouponAttributeCouponId = CouponAttributeCoupon[CouponAttributeCouponPk];
export type CouponAttributeCouponCreationAttributes = CouponAttributeCouponAttributes;

export class CouponAttributeCoupon extends Model<CouponAttributeCouponAttributes, CouponAttributeCouponCreationAttributes> implements CouponAttributeCouponAttributes {
  couponAttributeId!: number;
  couponsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CouponAttributeCoupon {
    return CouponAttributeCoupon.init({
    couponAttributeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PromotionAttribute',
        key: 'id'
      },
      field: 'CouponAttribute_id'
    },
    couponsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'coupons_id'
    }
  }, {
    sequelize,
    tableName: 'CouponAttribute_Coupon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CouponAttribute_id" },
          { name: "coupons_id" },
        ]
      },
      {
        name: "ind_CouponAttribute_Coupon_coupons_id",
        using: "BTREE",
        fields: [
          { name: "coupons_id" },
        ]
      },
    ]
  });
  }
}
