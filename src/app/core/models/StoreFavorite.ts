/**
 * File Name  : StoreFavorite.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreFavoriteAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  memberId: number;
  storeId: number;
}

export type StoreFavoritePk = "id";
export type StoreFavoriteId = StoreFavorite[StoreFavoritePk];
export type StoreFavoriteCreationAttributes = StoreFavoriteAttributes;

export class StoreFavorite extends Model<StoreFavoriteAttributes, StoreFavoriteCreationAttributes> implements StoreFavoriteAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  memberId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreFavorite {
    return StoreFavorite.init({
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
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
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
    tableName: 'StoreFavorite',
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
        name: "UKhnp8ksx13t7u96phyy9ls3a10",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
          { name: "store_id" },
        ]
      },
      {
        name: "ind_StoreFavorite_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
