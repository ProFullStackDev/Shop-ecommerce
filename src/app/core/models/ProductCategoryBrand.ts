/**
 * File Name  : ProductCategory_Brand.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductCategoryBrandAttributes {
  productCategoriesId: number;
  brandsId: number;
}

export type ProductCategoryBrandPk = "productCategoriesId" | "brandsId";
export type ProductCategoryBrandId = ProductCategoryBrand[ProductCategoryBrandPk];
export type ProductCategoryBrandCreationAttributes = ProductCategoryBrandAttributes;

export class ProductCategoryBrand extends Model<ProductCategoryBrandAttributes, ProductCategoryBrandCreationAttributes> implements ProductCategoryBrandAttributes {
  productCategoriesId!: number;
  brandsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategoryBrand {
    return ProductCategoryBrand.init({
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
    brandsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Brand',
        key: 'id'
      },
      field: 'brands_id'
    }
  }, {
    sequelize,
    tableName: 'ProductCategory_Brand',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productCategories_id" },
          { name: "brands_id" },
        ]
      },
      {
        name: "ind_ProductCategory_Brand_brands_id",
        using: "BTREE",
        fields: [
          { name: "brands_id" },
        ]
      },
    ]
  });
  }
}
