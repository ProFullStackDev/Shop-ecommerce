/**
 * File Name  : Store_ProductCategory.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreProductCategoryAttributes {
  storesId: number;
  productCategoriesId: number;
}

export type StoreProductCategoryPk = "storesId" | "productCategoriesId";
export type StoreProductCategoryId = StoreProductCategory[StoreProductCategoryPk];
export type StoreProductCategoryCreationAttributes = StoreProductCategoryAttributes;

export class StoreProductCategory extends Model<StoreProductCategoryAttributes, StoreProductCategoryCreationAttributes> implements StoreProductCategoryAttributes {
  storesId!: number;
  productCategoriesId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreProductCategory {
    return StoreProductCategory.init({
    storesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'stores_id'
    },
    productCategoriesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProductCategory',
        key: 'id'
      },
      field: 'productCategories_id'
    }
  }, {
    sequelize,
    tableName: 'Store_ProductCategory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stores_id" },
          { name: "productCategories_id" },
        ]
      },
      {
        name: "ind_Store_ProductCategory_productCategories_id",
        using: "BTREE",
        fields: [
          { name: "productCategories_id" },
        ]
      },
    ]
  });
  }
}
