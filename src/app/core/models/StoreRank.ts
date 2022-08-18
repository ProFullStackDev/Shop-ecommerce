/**
 * File Name  : StoreRank.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreRankAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  isAllowRegister: boolean;
  memo?: string;
  name: string;
  quantity?: number;
  serviceFee: number;
}

export type StoreRankPk = "id";
export type StoreRankId = StoreRank[StoreRankPk];
export type StoreRankOptionalAttributes = "orders" | "memo" | "quantity";
export type StoreRankCreationAttributes = Optional<StoreRankAttributes, StoreRankOptionalAttributes>;

export class StoreRank extends Model<StoreRankAttributes, StoreRankCreationAttributes> implements StoreRankAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  isAllowRegister!: boolean;
  memo?: string;
  name!: string;
  quantity?: number;
  serviceFee!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreRank {
    return StoreRank.init({
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
    isAllowRegister: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "name"
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    serviceFee: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'StoreRank',
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
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
