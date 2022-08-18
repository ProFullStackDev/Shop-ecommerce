/**
 * File Name  : Product_StoreProductTag.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductStoreProductTagAttributes {
  productsId: number;
  storeProductTagsId: number;
}

export type ProductStoreProductTagPk = "productsId" | "storeProductTagsId";
export type ProductStoreProductTagId = ProductStoreProductTag[ProductStoreProductTagPk];
export type ProductStoreProductTagCreationAttributes = ProductStoreProductTagAttributes;

export class ProductStoreProductTag extends Model<ProductStoreProductTagAttributes, ProductStoreProductTagCreationAttributes> implements ProductStoreProductTagAttributes {
  productsId!: number;
  storeProductTagsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductStoreProductTag {
    return ProductStoreProductTag.init({
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
    storeProductTagsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'StoreProductTag',
        key: 'id'
      },
      field: 'storeProductTags_id'
    }
  }, {
    sequelize,
    tableName: 'Product_StoreProductTag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_id" },
          { name: "storeProductTags_id" },
        ]
      },
      {
        name: "ind_Product_StoreProductTag_storeProductTags_id",
        using: "BTREE",
        fields: [
          { name: "storeProductTags_id" },
        ]
      },
    ]
  });
  }
}
