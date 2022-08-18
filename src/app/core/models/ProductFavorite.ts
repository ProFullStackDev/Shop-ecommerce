/**
 * File Name  : ProductFavorite.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductFavoriteAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  memberId: number;
  productId: number;
}

export type ProductFavoritePk = "id";
export type ProductFavoriteId = ProductFavorite[ProductFavoritePk];
export type ProductFavoriteCreationAttributes = ProductFavoriteAttributes;

export class ProductFavorite extends Model<ProductFavoriteAttributes, ProductFavoriteCreationAttributes> implements ProductFavoriteAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  memberId!: number;
  productId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductFavorite {
    return ProductFavorite.init({
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
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      },
      field: 'product_id'
    }
  }, {
    sequelize,
    tableName: 'ProductFavorite',
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
        name: "UK7eep632bvaw8o9ey7357448kx",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
          { name: "product_id" },
        ]
      },
      {
        name: "ind_ProductFavorite_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
