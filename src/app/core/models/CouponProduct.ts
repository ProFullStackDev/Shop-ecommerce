/**
 * File Name  : Coupon_Product.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CouponProductAttributes {
  couponsId: number;
  productsId: number;
}

export type CouponProductCreationAttributes = CouponProductAttributes;

export class CouponProduct extends Model<CouponProductAttributes, CouponProductCreationAttributes> implements CouponProductAttributes {
  couponsId!: number;
  productsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CouponProduct {
    return CouponProduct.init({
    couponsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'coupons_id'
    },
    productsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      },
      field: 'products_id'
    }
  }, {
    sequelize,
    tableName: 'Coupon_Product',
    timestamps: false,
    indexes: [
      {
        name: "ind_Coupon_Product_products_id",
        using: "BTREE",
        fields: [
          { name: "products_id" },
        ]
      },
      {
        name: "ind_Coupon_Product_coupons_id",
        using: "BTREE",
        fields: [
          { name: "coupons_id" },
        ]
      },
    ]
  });
  }
}
