/**
 * File Name  : ThemeFloorTemplate.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ThemeFloorTemplateAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  description?: string;
  displayType?: number;
  name: string;
  template: string;
}

export type ThemeFloorTemplatePk = "id";
export type ThemeFloorTemplateId = ThemeFloorTemplate[ThemeFloorTemplatePk];
export type ThemeFloorTemplateOptionalAttributes = "description" | "displayType";
export type ThemeFloorTemplateCreationAttributes = Optional<ThemeFloorTemplateAttributes, ThemeFloorTemplateOptionalAttributes>;

export class ThemeFloorTemplate extends Model<ThemeFloorTemplateAttributes, ThemeFloorTemplateCreationAttributes> implements ThemeFloorTemplateAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  description?: string;
  displayType?: number;
  name!: string;
  template!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof ThemeFloorTemplate {
    return ThemeFloorTemplate.init({
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
    displayType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ThemeFloorTemplate',
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
