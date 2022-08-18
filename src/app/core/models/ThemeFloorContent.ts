/**
 * File Name  : ThemeFloorContent.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ThemeFloorContentAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  itemOrder: number;
  orders: number;
  adId?: number;
  couponId?: number;
  innerThemeFloorId?: number;
  productId?: number;
  themeFloorId: number;
}

export type ThemeFloorContentPk = "id";
export type ThemeFloorContentId = ThemeFloorContent[ThemeFloorContentPk];
export type ThemeFloorContentOptionalAttributes = "adId" | "couponId" | "innerThemeFloorId" | "productId";
export type ThemeFloorContentCreationAttributes = Optional<ThemeFloorContentAttributes, ThemeFloorContentOptionalAttributes>;

export class ThemeFloorContent extends Model<ThemeFloorContentAttributes, ThemeFloorContentCreationAttributes> implements ThemeFloorContentAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  itemOrder!: number;
  orders!: number;
  adId?: number;
  couponId?: number;
  innerThemeFloorId?: number;
  productId?: number;
  themeFloorId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ThemeFloorContent {
    return ThemeFloorContent.init({
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
    itemOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orders: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Ad',
        key: 'id'
      },
      field: 'ad_id'
    },
    couponId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'coupon_id'
    },
    innerThemeFloorId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ThemeFloor',
        key: 'id'
      },
      field: 'innerThemeFloor_id'
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'id'
      },
      field: 'product_id'
    },
    themeFloorId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ThemeFloor',
        key: 'id'
      },
      field: 'themeFloor_id'
    }
  }, {
    sequelize,
    tableName: 'ThemeFloorContent',
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
        name: "UKb0l5nts57vbhgwy3gkgm0dbu8",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "themeFloor_id" },
          { name: "product_id" },
          { name: "ad_id" },
          { name: "innerThemeFloor_id" },
          { name: "coupon_id" },
        ]
      },
      {
        name: "ind_ThemeFloorContent_ad_id",
        using: "BTREE",
        fields: [
          { name: "ad_id" },
        ]
      },
      {
        name: "ind_ThemeFloorContent_coupon_id",
        using: "BTREE",
        fields: [
          { name: "coupon_id" },
        ]
      },
      {
        name: "ind_ThemeFloorContent_innerThemeFloor_id",
        using: "BTREE",
        fields: [
          { name: "innerThemeFloor_id" },
        ]
      },
      {
        name: "ind_ThemeFloorContent_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
