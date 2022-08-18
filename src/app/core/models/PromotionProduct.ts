/**
 * File Name  : Promotion_Product.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PromotionProductAttributes {
  promotionsId: number;
  productsId: number;
}

export type PromotionProductCreationAttributes = PromotionProductAttributes;

export class PromotionProduct extends Model<PromotionProductAttributes, PromotionProductCreationAttributes> implements PromotionProductAttributes {
  promotionsId!: number;
  productsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PromotionProduct {
    return PromotionProduct.init({
    promotionsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Promotion',
        key: 'id'
      },
      field: 'promotions_id'
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
    tableName: 'Promotion_Product',
    timestamps: false,
    indexes: [
      {
        name: "ind_Promotion_Product_products_id",
        using: "BTREE",
        fields: [
          { name: "products_id" },
        ]
      },
      {
        name: "ind_Promotion_Product_promotions_id",
        using: "BTREE",
        fields: [
          { name: "promotions_id" },
        ]
      },
    ]
  });
  }
}
