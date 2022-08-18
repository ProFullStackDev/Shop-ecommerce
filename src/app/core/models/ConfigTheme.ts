/**
 * File Name  : ConfigTheme.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ConfigThemeAttributes {
  id: number;
  theme: string;
  data: object;
}

export type ConfigThemePk = "id";
export type ConfigThemeId = ConfigTheme[ConfigThemePk];
export type ConfigThemeCreationAttributes = ConfigThemeAttributes;

export class ConfigTheme extends Model<ConfigThemeAttributes, ConfigThemeCreationAttributes> implements ConfigThemeAttributes {
  id!: number;
  theme!: string;
  data!: object;

  static initModel(sequelize: Sequelize.Sequelize): typeof ConfigTheme {
    return ConfigTheme.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    theme: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "主题",
      unique: "theme"
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "数据"
    }
  }, {
    sequelize,
    tableName: 'ConfigTheme',
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
        name: "theme",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "theme" },
        ]
      },
    ]
  });
  }
}
