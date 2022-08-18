/**
 * File Name  : Sku.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SkuAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  allocatedStock: number;
  cost?: number;
  exchangePoint: number;
  isDefault: boolean;
  marketPrice: number;
  maxCommission: number;
  price: number;
  sn: string;
  specificationValues?: string;
  stock: number;
  productId: number;
}

export type SkuPk = "id";
export type SkuId = Sku[SkuPk];
export type SkuOptionalAttributes = "cost" | "specificationValues";
export type SkuCreationAttributes = Optional<SkuAttributes, SkuOptionalAttributes>;

export class Sku extends Model<SkuAttributes, SkuCreationAttributes> implements SkuAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  allocatedStock!: number;
  cost?: number;
  exchangePoint!: number;
  isDefault!: boolean;
  marketPrice!: number;
  maxCommission!: number;
  price!: number;
  sn!: string;
  specificationValues?: string;
  stock!: number;
  productId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sku {
    return Sku.init({
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
    allocatedStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true
    },
    exchangePoint: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    marketPrice: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    maxCommission: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
    },
    specificationValues: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'Sku',
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
        name: "sn",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sn" },
        ]
      },
      {
        name: "ind_Sku_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "Sku_exchangePoint_index",
        using: "BTREE",
        fields: [
          { name: "exchangePoint" },
        ]
      },
      {
        name: "Sku_stock_index",
        using: "BTREE",
        fields: [
          { name: "stock" },
        ]
      },
    ]
  });
  }
}
