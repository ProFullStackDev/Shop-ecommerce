/**
 * File Name  : ThemeFloor.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ThemeFloorAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  background?: string;
  description?: string;
  isEnabled: boolean;
  isShowName?: boolean;
  name: string;
  type: number;
  themeId: number;
  themeFloorTemplateId: number;
}

export type ThemeFloorPk = "id";
export type ThemeFloorId = ThemeFloor[ThemeFloorPk];
export type ThemeFloorOptionalAttributes = "orders" | "background" | "description" | "isShowName";
export type ThemeFloorCreationAttributes = Optional<ThemeFloorAttributes, ThemeFloorOptionalAttributes>;

export class ThemeFloor extends Model<ThemeFloorAttributes, ThemeFloorCreationAttributes> implements ThemeFloorAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  background?: string;
  description?: string;
  isEnabled!: boolean;
  isShowName?: boolean;
  name!: string;
  type!: number;
  themeId!: number;
  themeFloorTemplateId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ThemeFloor {
    return ThemeFloor.init({
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
    background: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isShowName: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    themeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Theme',
        key: 'id'
      },
      field: 'theme_id'
    },
    themeFloorTemplateId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ThemeFloorTemplate',
        key: 'id'
      },
      field: 'themeFloorTemplate_id'
    }
  }, {
    sequelize,
    tableName: 'ThemeFloor',
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
        name: "ind_ThemeFloor_theme_id",
        using: "BTREE",
        fields: [
          { name: "theme_id" },
        ]
      },
      {
        name: "ind_ThemeFloor_themeFloorTemplate_id",
        using: "BTREE",
        fields: [
          { name: "themeFloorTemplate_id" },
        ]
      },
    ]
  });
  }
}
