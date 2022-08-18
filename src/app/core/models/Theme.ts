/**
 * File Name  : Theme.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ThemeAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  caption?: string;
  isEnabled: boolean;
  memo?: string;
  title: string;
  type: number;
}

export type ThemePk = "id";
export type ThemeId = Theme[ThemePk];
export type ThemeOptionalAttributes = "orders" | "caption" | "memo";
export type ThemeCreationAttributes = Optional<ThemeAttributes, ThemeOptionalAttributes>;

export class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> implements ThemeAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  caption?: string;
  isEnabled!: boolean;
  memo?: string;
  title!: string;
  type!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Theme {
    return Theme.init({
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
    caption: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Theme',
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
