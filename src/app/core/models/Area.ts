/**
 * File Name  : Area.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AreaAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  fullName: string;
  grade: number;
  name: string;
  treePath: string;
  parentId?: number;
}

export type AreaPk = "id";
export type AreaId = Area[AreaPk];
export type AreaOptionalAttributes = "orders" | "parentId";
export type AreaCreationAttributes = Optional<AreaAttributes, AreaOptionalAttributes>;

export class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  fullName!: string;
  grade!: number;
  name!: string;
  treePath!: string;
  parentId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Area {
    return Area.init({
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
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    treePath: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'parent_id'
    }
  }, {
    sequelize,
    tableName: 'Area',
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
        name: "ind_Area_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  }
}
