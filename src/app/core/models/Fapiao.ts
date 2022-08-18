/**
 * File Name  : Fapiao.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FapiaoAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  applicationTime: Date;
  bankAccount?: string;
  bankName?: string;
  billingAccountAddress: string;
  billingAccountEmail?: string;
  billingAccountName: string;
  billingAccountPhone: string;
  contentType: number;
  failedReason?: string;
  fapiaoImages?: string;
  invoicingTime?: Date;
  invoicingType: number;
  registeredAddress?: string;
  registeredPhone?: string;
  status: number;
  title: string;
  type: number;
  vatRegistrationNumber?: string;
  titleReviewStatus?: number;
  billingAccountAreaId: number;
  orderId: number;
  ownerId: number;
  storeId: number;
}

export type FapiaoPk = "id";
export type FapiaoId = Fapiao[FapiaoPk];
export type FapiaoOptionalAttributes = "bankAccount" | "bankName" | "billingAccountEmail" | "failedReason" | "fapiaoImages" | "invoicingTime" | "registeredAddress" | "registeredPhone" | "vatRegistrationNumber" | "titleReviewStatus";
export type FapiaoCreationAttributes = Optional<FapiaoAttributes, FapiaoOptionalAttributes>;

export class Fapiao extends Model<FapiaoAttributes, FapiaoCreationAttributes> implements FapiaoAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  applicationTime!: Date;
  bankAccount?: string;
  bankName?: string;
  billingAccountAddress!: string;
  billingAccountEmail?: string;
  billingAccountName!: string;
  billingAccountPhone!: string;
  contentType!: number;
  failedReason?: string;
  fapiaoImages?: string;
  invoicingTime?: Date;
  invoicingType!: number;
  registeredAddress?: string;
  registeredPhone?: string;
  status!: number;
  title!: string;
  type!: number;
  vatRegistrationNumber?: string;
  titleReviewStatus?: number;
  billingAccountAreaId!: number;
  orderId!: number;
  ownerId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Fapiao {
    return Fapiao.init({
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
    applicationTime: {
      type: DataTypes.DATE,
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
    billingAccountAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billingAccountEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    billingAccountName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billingAccountPhone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contentType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    failedReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fapiaoImages: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    invoicingTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    invoicingType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registeredAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    registeredPhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vatRegistrationNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    titleReviewStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    billingAccountAreaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'billingAccountArea_id'
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      },
      field: 'order_id'
    },
    ownerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'owner_id'
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
    tableName: 'Fapiao',
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
        name: "ind_Fapiao_billingAccountArea_id",
        using: "BTREE",
        fields: [
          { name: "billingAccountArea_id" },
        ]
      },
      {
        name: "ind_Fapiao_order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "ind_Fapiao_owner_id",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "ind_Fapiao_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
