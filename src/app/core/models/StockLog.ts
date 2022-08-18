/**
 * File Name  : StockLog.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StockLogAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  inQuantity: number;
  memo?: string;
  outQuantity: number;
  stock: number;
  type: number;
  skuId: number;
}

export type StockLogPk = "id";
export type StockLogId = StockLog[StockLogPk];
export type StockLogOptionalAttributes = "memo";
export type StockLogCreationAttributes = Optional<StockLogAttributes, StockLogOptionalAttributes>;

export class StockLog extends Model<StockLogAttributes, StockLogCreationAttributes> implements StockLogAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  inQuantity!: number;
  memo?: string;
  outQuantity!: number;
  stock!: number;
  type!: number;
  skuId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StockLog {
    return StockLog.init({
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
    inQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    skuId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Sku',
        key: 'id'
      },
      field: 'sku_id'
    }
  }, {
    sequelize,
    tableName: 'StockLog',
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
        name: "ind_StockLog_sku_id",
        using: "BTREE",
        fields: [
          { name: "sku_id" },
        ]
      },
    ]
  });
  }
}
