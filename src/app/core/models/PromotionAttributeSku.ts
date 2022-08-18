/**
 * File Name  : PromotionAttribute_Sku.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PromotionAttributeSkuAttributes {
  giftAttributesId: number;
  giftsId: number;
}

export type PromotionAttributeSkuPk = "giftAttributesId" | "giftsId";
export type PromotionAttributeSkuId = PromotionAttributeSku[PromotionAttributeSkuPk];
export type PromotionAttributeSkuCreationAttributes = PromotionAttributeSkuAttributes;

export class PromotionAttributeSku extends Model<PromotionAttributeSkuAttributes, PromotionAttributeSkuCreationAttributes> implements PromotionAttributeSkuAttributes {
  giftAttributesId!: number;
  giftsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PromotionAttributeSku {
    return PromotionAttributeSku.init({
    giftAttributesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PromotionAttribute',
        key: 'id'
      },
      field: 'giftAttributes_id'
    },
    giftsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Sku',
        key: 'id'
      },
      field: 'gifts_id'
    }
  }, {
    sequelize,
    tableName: 'PromotionAttribute_Sku',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "giftAttributes_id" },
          { name: "gifts_id" },
        ]
      },
      {
        name: "ind_PromotionAttribute_Sku_gifts_id",
        using: "BTREE",
        fields: [
          { name: "gifts_id" },
        ]
      },
    ]
  });
  }
}
