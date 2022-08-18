/**
 * File Name  : Store.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoreAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  address?: string;
  bailPaid: number;
  displayImage?: string;
  email: string;
  endDate: Date;
  hotSearch?: string;
  introduction?: string;
  isDisplay: boolean;
  isEnabled: boolean;
  isOrderAutoPreview?: boolean;
  keyword?: string;
  logo?: string;
  mobile: string;
  name: string;
  phone?: string;
  status: number;
  fapiaoTypes?: string;
  isSupportedFapiao: boolean;
  type: number;
  zipCode?: string;
  businessId: number;
  storeCategoryId: number;
  storeRankId: number;
}

export type StorePk = "id";
export type StoreId = Store[StorePk];
export type StoreOptionalAttributes = "address" | "displayImage" | "hotSearch" | "introduction" | "isOrderAutoPreview" | "keyword" | "logo" | "phone" | "fapiaoTypes" | "zipCode";
export type StoreCreationAttributes = Optional<StoreAttributes, StoreOptionalAttributes>;

export class Store extends Model<StoreAttributes, StoreCreationAttributes> implements StoreAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  address?: string;
  bailPaid!: number;
  displayImage?: string;
  email!: string;
  endDate!: Date;
  hotSearch?: string;
  introduction?: string;
  isDisplay!: boolean;
  isEnabled!: boolean;
  isOrderAutoPreview?: boolean;
  keyword?: string;
  logo?: string;
  mobile!: string;
  name!: string;
  phone?: string;
  status!: number;
  fapiaoTypes?: string;
  isSupportedFapiao!: boolean;
  type!: number;
  zipCode?: string;
  businessId!: number;
  storeCategoryId!: number;
  storeRankId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Store {
    return Store.init({
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bailPaid: {
      type: DataTypes.DECIMAL(27,12),
      allowNull: false
    },
    displayImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hotSearch: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDisplay: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isOrderAutoPreview: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    keyword: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "name"
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fapiaoTypes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isSupportedFapiao: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      unique: "FKh64nbdqusi01vq6d0m3757vjg",
      field: 'business_id'
    },
    storeCategoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'StoreCategory',
        key: 'id'
      },
      field: 'storeCategory_id'
    },
    storeRankId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'StoreRank',
        key: 'id'
      },
      field: 'storeRank_id'
    }
  }, {
    sequelize,
    tableName: 'Store',
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
      {
        name: "business_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "business_id" },
        ]
      },
      {
        name: "UK_suqc1l9ywujj9m9oktiul40gj",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "business_id" },
        ]
      },
      {
        name: "ind_Store_storeCategory_id",
        using: "BTREE",
        fields: [
          { name: "storeCategory_id" },
        ]
      },
      {
        name: "ind_Store_storeRank_id",
        using: "BTREE",
        fields: [
          { name: "storeRank_id" },
        ]
      },
    ]
  });
  }
}
