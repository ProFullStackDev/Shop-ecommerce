/**
 * File Name  : Statistic.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StatisticAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  day: number;
  month: number;
  type: number;
  value: number;
  year: number;
  storeId?: number;
}

export type StatisticPk = "id";
export type StatisticId = Statistic[StatisticPk];
export type StatisticOptionalAttributes = "storeId";
export type StatisticCreationAttributes = Optional<StatisticAttributes, StatisticOptionalAttributes>;

export class Statistic extends Model<StatisticAttributes, StatisticCreationAttributes> implements StatisticAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  day!: number;
  month!: number;
  type!: number;
  value!: number;
  year!: number;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Statistic {
    return Statistic.init({
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
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'Statistic',
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
        name: "ind_Statistic_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
