/**
 * File Name  : Sn.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SnAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  lastValue: number;
  type: number;
}

export type SnPk = "id";
export type SnId = Sn[SnPk];
export type SnCreationAttributes = SnAttributes;

export class Sn extends Model<SnAttributes, SnCreationAttributes> implements SnAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  lastValue!: number;
  type!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sn {
    return Sn.init({
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
    lastValue: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "type"
    }
  }, {
    sequelize,
    tableName: 'Sn',
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
