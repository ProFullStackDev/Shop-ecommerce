/**
 * File Name  : StoreNavigation.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreNavigationAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  isBlankTarget: boolean;
  name: string;
  url: string;
  storeId: number;
}

export type StoreNavigationPk = "id";
export type StoreNavigationId = StoreNavigation[StoreNavigationPk];
export type StoreNavigationOptionalAttributes = "orders";
export type StoreNavigationCreationAttributes = Optional<StoreNavigationAttributes, StoreNavigationOptionalAttributes>;

export class StoreNavigation extends Model<StoreNavigationAttributes, StoreNavigationCreationAttributes> implements StoreNavigationAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  isBlankTarget!: boolean;
  name!: string;
  url!: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreNavigation {
    return StoreNavigation.init({
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
    isBlankTarget: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'StoreNavigation',
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
        name: "ind_StoreNavigation_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
