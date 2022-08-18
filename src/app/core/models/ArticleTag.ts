/**
 * File Name  : ArticleTag.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ArticleTagAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  memo?: string;
  name: string;
}

export type ArticleTagPk = "id";
export type ArticleTagId = ArticleTag[ArticleTagPk];
export type ArticleTagOptionalAttributes = "orders" | "memo";
export type ArticleTagCreationAttributes = Optional<ArticleTagAttributes, ArticleTagOptionalAttributes>;

export class ArticleTag extends Model<ArticleTagAttributes, ArticleTagCreationAttributes> implements ArticleTagAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  memo?: string;
  name!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof ArticleTag {
    return ArticleTag.init({
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
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ArticleTag',
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
    ]
  });
  }
}
