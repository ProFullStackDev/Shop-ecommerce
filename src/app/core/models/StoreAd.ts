/**
 * File Name  : StoreAd.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreAdAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  bottomAd?: string;
  bottomAdUrl?: string;
  couponAdImage?: string;
  couponAdUrl?: string;
  mobileIndexBackgroundImage?: string;
  topAd?: string;
  topAdUrl?: string;
  storeId: number;
}

export type StoreAdPk = "id";
export type StoreAdId = StoreAd[StoreAdPk];
export type StoreAdOptionalAttributes = "bottomAd" | "bottomAdUrl" | "couponAdImage" | "couponAdUrl" | "mobileIndexBackgroundImage" | "topAd" | "topAdUrl";
export type StoreAdCreationAttributes = Optional<StoreAdAttributes, StoreAdOptionalAttributes>;

export class StoreAd extends Model<StoreAdAttributes, StoreAdCreationAttributes> implements StoreAdAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  bottomAd?: string;
  bottomAdUrl?: string;
  couponAdImage?: string;
  couponAdUrl?: string;
  mobileIndexBackgroundImage?: string;
  topAd?: string;
  topAdUrl?: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreAd {
    return StoreAd.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    bottomAd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bottomAdUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    couponAdImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    couponAdUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobileIndexBackgroundImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    topAd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    topAdUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      unique: "FKj2uhm4tadt9vm2oi31xs406x8",
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'StoreAd',
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
        name: "store_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "UK_kr70auybt9ym3i9q8p5jbwata",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
