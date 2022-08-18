/**
 * File Name  : Article_ArticleTag.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ArticleArticleTagAttributes {
  articlesId: number;
  articleTagsId: number;
}

export type ArticleArticleTagPk = "articlesId" | "articleTagsId";
export type ArticleArticleTagId = ArticleArticleTag[ArticleArticleTagPk];
export type ArticleArticleTagCreationAttributes = ArticleArticleTagAttributes;

export class ArticleArticleTag extends Model<ArticleArticleTagAttributes, ArticleArticleTagCreationAttributes> implements ArticleArticleTagAttributes {
  articlesId!: number;
  articleTagsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ArticleArticleTag {
    return ArticleArticleTag.init({
    articlesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Article',
        key: 'id'
      },
      field: 'articles_id'
    },
    articleTagsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ArticleTag',
        key: 'id'
      },
      field: 'articleTags_id'
    }
  }, {
    sequelize,
    tableName: 'Article_ArticleTag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "articles_id" },
          { name: "articleTags_id" },
        ]
      },
      {
        name: "ind_Article_ArticleTag_articleTags_id",
        using: "BTREE",
        fields: [
          { name: "articleTags_id" },
        ]
      },
    ]
  });
  }
}
