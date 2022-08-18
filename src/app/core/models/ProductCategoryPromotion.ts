/**
 * File Name  : ProductCategory_Promotion.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductCategoryPromotionAttributes {
  productCategoriesId: number;
  promotionsId: number;
}

export type ProductCategoryPromotionPk = "productCategoriesId" | "promotionsId";
export type ProductCategoryPromotionId = ProductCategoryPromotion[ProductCategoryPromotionPk];
export type ProductCategoryPromotionCreationAttributes = ProductCategoryPromotionAttributes;

export class ProductCategoryPromotion extends Model<ProductCategoryPromotionAttributes, ProductCategoryPromotionCreationAttributes> implements ProductCategoryPromotionAttributes {
  productCategoriesId!: number;
  promotionsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategoryPromotion {
    return ProductCategoryPromotion.init({
    productCategoriesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProductCategory',
        key: 'id'
      },
      field: 'productCategories_id'
    },
    promotionsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Promotion',
        key: 'id'
      },
      field: 'promotions_id'
    }
  }, {
    sequelize,
    tableName: 'ProductCategory_Promotion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productCategories_id" },
          { name: "promotions_id" },
        ]
      },
      {
        name: "ind_ProductCategory_Promotion_promotions_id",
        using: "BTREE",
        fields: [
          { name: "promotions_id" },
        ]
      },
    ]
  });
  }
}
