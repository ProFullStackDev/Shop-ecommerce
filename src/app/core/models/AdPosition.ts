/**
 * File Name  : AdPosition.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AdPositionAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  description?: string;
  height: number;
  name: string;
  template: string;
  width: number;
}

export type AdPositionPk = "id";
export type AdPositionId = AdPosition[AdPositionPk];
export type AdPositionOptionalAttributes = "orders" | "description";
export type AdPositionCreationAttributes = Optional<AdPositionAttributes, AdPositionOptionalAttributes>;

export class AdPosition extends Model<AdPositionAttributes, AdPositionCreationAttributes> implements AdPositionAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  description?: string;
  height!: number;
  name!: string;
  template!: string;
  width!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof AdPosition {
    return AdPosition.init({
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'AdPosition',
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
