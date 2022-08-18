/**
 * File Name  : ArticleCategory.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ArticleCategoryAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  grade: number;
  name: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  treePath: string;
  parentId?: number;
}

export type ArticleCategoryPk = "id";
export type ArticleCategoryId = ArticleCategory[ArticleCategoryPk];
export type ArticleCategoryOptionalAttributes = "orders" | "seoDescription" | "seoKeywords" | "seoTitle" | "parentId";
export type ArticleCategoryCreationAttributes = Optional<ArticleCategoryAttributes, ArticleCategoryOptionalAttributes>;

export class ArticleCategory extends Model<ArticleCategoryAttributes, ArticleCategoryCreationAttributes> implements ArticleCategoryAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  grade!: number;
  name!: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  treePath!: string;
  parentId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ArticleCategory {
    return ArticleCategory.init({
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
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
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
        model: 'ArticleCategory',
        key: 'id'
      },
      field: 'parent_id'
    }
  }, {
    sequelize,
    tableName: 'ArticleCategory',
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
        name: "ind_ArticleCategory_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  }
}
