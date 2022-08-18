/**
 * File Name  : StoreAdImage.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreAdImageAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  image: string;
  imageType: number;
  title?: string;
  url?: string;
  storeId: number;
}

export type StoreAdImagePk = "id";
export type StoreAdImageId = StoreAdImage[StoreAdImagePk];
export type StoreAdImageOptionalAttributes = "orders" | "title" | "url";
export type StoreAdImageCreationAttributes = Optional<StoreAdImageAttributes, StoreAdImageOptionalAttributes>;

export class StoreAdImage extends Model<StoreAdImageAttributes, StoreAdImageCreationAttributes> implements StoreAdImageAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  image!: string;
  imageType!: number;
  title?: string;
  url?: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StoreAdImage {
    return StoreAdImage.init({
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
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    imageType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
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
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'StoreAdImage',
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
        name: "ind_StoreAdImage_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
