/**
 * File Name  : ProductCategory.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductCategoryAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  description?: string;
  generalRate: number;
  grade: number;
  icon?: string;
  name: string;
  selfRate: number;
  seoDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  treePath: string;
  parentId?: number;
  scCategoryId?: number;
  key?: string;
}

export type ProductCategoryPk = "id";
export type ProductCategoryId = ProductCategory[ProductCategoryPk];
export type ProductCategoryOptionalAttributes = "orders" | "description" | "icon" | "seoDescription" | "seoKeywords" | "seoTitle" | "parentId" | "scCategoryId";
export type ProductCategoryCreationAttributes = Optional<ProductCategoryAttributes, ProductCategoryOptionalAttributes>;

export class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  description?: string;
  generalRate!: number;
  grade!: number;
  icon?: string;
  name!: string;
  selfRate!: number;
  seoDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  treePath!: string;
  parentId?: number;
  scCategoryId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategory {
    return ProductCategory.init({
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    generalRate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    selfRate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    seoDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    seoKeywords: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    seoTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    treePath: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ProductCategory',
        key: 'id'
      },
      field: 'parent_id'
    },
    scCategoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'sc_category_id'
    }
  }, {
    sequelize,
    tableName: 'ProductCategory',
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
        name: "ind_ProductCategory_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  }
}
