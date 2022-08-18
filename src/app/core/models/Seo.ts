/**
 * File Name  : Seo.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SeoAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  description?: string;
  keywords?: string;
  title?: string;
  type: number;
}

export type SeoPk = "id";
export type SeoId = Seo[SeoPk];
export type SeoOptionalAttributes = "description" | "keywords" | "title";
export type SeoCreationAttributes = Optional<SeoAttributes, SeoOptionalAttributes>;

export class Seo extends Model<SeoAttributes, SeoCreationAttributes> implements SeoAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  description?: string;
  keywords?: string;
  title?: string;
  type!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Seo {
    return Seo.init({
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    keywords: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "type"
    }
  }, {
    sequelize,
    tableName: 'Seo',
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
        name: "type",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
  }
}
