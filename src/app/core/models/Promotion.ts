/**
 * File Name  : Promotion.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PromotionAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  beginDate?: Date;
  endDate?: Date;
  image?: string;
  introduction?: string;
  isCouponAllowed: boolean;
  isEnabled: boolean;
  name: string;
  promotionPluginId: string;
  storeId: number;
}

export type PromotionPk = "id";
export type PromotionId = Promotion[PromotionPk];
export type PromotionOptionalAttributes = "orders" | "beginDate" | "endDate" | "image" | "introduction";
export type PromotionCreationAttributes = Optional<PromotionAttributes, PromotionOptionalAttributes>;

export class Promotion extends Model<PromotionAttributes, PromotionCreationAttributes> implements PromotionAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  beginDate?: Date;
  endDate?: Date;
  image?: string;
  introduction?: string;
  isCouponAllowed!: boolean;
  isEnabled!: boolean;
  name!: string;
  promotionPluginId!: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Promotion {
    return Promotion.init({
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
    orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    beginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isCouponAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    promotionPluginId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'Promotion',
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
        name: "ind_Promotion_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
