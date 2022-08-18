/**
 * File Name  : StoreCategory.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreCategoryAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  bail: number;
  name: string;
}

export type StoreCategoryPk = "id";
export type StoreCategoryId = StoreCategory[StoreCategoryPk];
export type StoreCategoryOptionalAttributes = "orders";
export type StoreCategoryCreationAttributes = Optional<StoreCategoryAttributes, StoreCategoryOptionalAttributes>;

export class StoreCategory extends Model<StoreCategoryAttributes, StoreCategoryCreationAttributes> implements StoreCategoryAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  bail!: number;
  name!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreCategory {
    return StoreCategory.init({
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
    bail: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'StoreCategory',
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
