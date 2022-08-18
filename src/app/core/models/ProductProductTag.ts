/**
 * File Name  : Product_ProductTag.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductProductTagAttributes {
  productsId: number;
  productTagsId: number;
}

export type ProductProductTagPk = "productsId" | "productTagsId";
export type ProductProductTagId = ProductProductTag[ProductProductTagPk];
export type ProductProductTagCreationAttributes = ProductProductTagAttributes;

export class ProductProductTag extends Model<ProductProductTagAttributes, ProductProductTagCreationAttributes> implements ProductProductTagAttributes {
  productsId!: number;
  productTagsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductProductTag {
    return ProductProductTag.init({
    productsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Product',
        key: 'id'
      },
      field: 'products_id'
    },
    productTagsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProductTag',
        key: 'id'
      },
      field: 'productTags_id'
    }
  }, {
    sequelize,
    tableName: 'Product_ProductTag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_id" },
          { name: "productTags_id" },
        ]
      },
      {
        name: "ind_Product_ProductTag_productTags_id",
        using: "BTREE",
        fields: [
          { name: "productTags_id" },
        ]
      },
    ]
  });
  }
}
