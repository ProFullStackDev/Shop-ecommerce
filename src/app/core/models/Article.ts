/**
 * File Name  : Article.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ArticleAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  author?: string;
  content?: string;
  hits: number;
  isPublication: boolean;
  isTop: boolean;
  seoDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  title: string;
  articleCategoryId: number;
}

export type ArticlePk = "id";
export type ArticleId = Article[ArticlePk];
export type ArticleOptionalAttributes = "author" | "content" | "seoDescription" | "seoKeywords" | "seoTitle";
export type ArticleCreationAttributes = Optional<ArticleAttributes, ArticleOptionalAttributes>;

export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  author?: string;
  content?: string;
  hits!: number;
  isPublication!: boolean;
  isTop!: boolean;
  seoDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  title!: string;
  articleCategoryId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Article {
    return Article.init({
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
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hits: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isPublication: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isTop: {
      type: DataTypes.BOOLEAN,
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    articleCategoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ArticleCategory',
        key: 'id'
      },
      field: 'articleCategory_id'
    }
  }, {
    sequelize,
    tableName: 'Article',
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
        name: "ind_Article_articleCategory_id",
        using: "BTREE",
        fields: [
          { name: "articleCategory_id" },
        ]
      },
    ]
  });
  }
}
