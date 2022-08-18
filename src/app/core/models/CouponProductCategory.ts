/**
 * File Name  : Coupon_ProductCategory.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CouponProductCategoryAttributes {
  couponsId: number;
  productCategoriesId: number;
}

export type CouponProductCategoryCreationAttributes = CouponProductCategoryAttributes;

export class CouponProductCategory extends Model<CouponProductCategoryAttributes, CouponProductCategoryCreationAttributes> implements CouponProductCategoryAttributes {
  couponsId!: number;
  productCategoriesId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CouponProductCategory {
    return CouponProductCategory.init({
    couponsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'coupons_id'
    },
    productCategoriesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ProductCategory',
        key: 'id'
      },
      field: 'productCategories_id'
    }
  }, {
    sequelize,
    tableName: 'Coupon_ProductCategory',
    timestamps: false,
    indexes: [
      {
        name: "ind_Coupon_ProductCategory_productCategories_id",
        using: "BTREE",
        fields: [
          { name: "productCategories_id" },
        ]
      },
      {
        name: "ind_Coupon_ProductCategory_coupons_id",
        using: "BTREE",
        fields: [
          { name: "coupons_id" },
        ]
      },
    ]
  });
  }
}
