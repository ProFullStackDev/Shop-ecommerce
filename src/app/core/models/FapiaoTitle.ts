/**
 * File Name  : FapiaoTitle.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FapiaoTitleAttributes {
  dtype: string;
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  title: string;
  bankAccount?: string;
  bankName?: string;
  registeredAddress?: string;
  registeredPhone?: string;
  type?: number;
  vatRegistrationNumber?: string;
  address?: string;
  name?: string;
  phone?: string;
  failedReason?: string;
  reviewStatus?: number;
  memberId: number;
  areaId?: number;
}

export type FapiaoTitlePk = "id";
export type FapiaoTitleId = FapiaoTitle[FapiaoTitlePk];
export type FapiaoTitleOptionalAttributes = "bankAccount" | "bankName" | "registeredAddress" | "registeredPhone" | "type" | "vatRegistrationNumber" | "address" | "name" | "phone" | "failedReason" | "reviewStatus" | "areaId";
export type FapiaoTitleCreationAttributes = Optional<FapiaoTitleAttributes, FapiaoTitleOptionalAttributes>;

export class FapiaoTitle extends Model<FapiaoTitleAttributes, FapiaoTitleCreationAttributes> implements FapiaoTitleAttributes {
  dtype!: string;
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  title!: string;
  bankAccount?: string;
  bankName?: string;
  registeredAddress?: string;
  registeredPhone?: string;
  type?: number;
  vatRegistrationNumber?: string;
  address?: string;
  name?: string;
  phone?: string;
  failedReason?: string;
  reviewStatus?: number;
  memberId!: number;
  areaId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof FapiaoTitle {
    return FapiaoTitle.init({
    dtype: {
      type: DataTypes.STRING(31),
      allowNull: false,
      field: 'DTYPE'
    },
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bankAccount: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    registeredAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    registeredPhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vatRegistrationNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    failedReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reviewStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'area_id'
    }
  }, {
    sequelize,
    tableName: 'FapiaoTitle',
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
        name: "ind_FapiaoTitle_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_FapiaoTitle_area_id",
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
    ]
  });
  }
}
