/**
 * File Name  : Aftersales.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AftersalesAttributes {
  dtype: string;
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  deliveryCorp?: string;
  deliveryCorpCode?: string;
  orderSn: string;
  reason: string;
  refundAmount: number;
  status: number;
  trackingNo?: string;
  account?: string;
  bank?: string;
  method?: number;
  address?: string;
  area?: string;
  consignee?: string;
  phone?: string;
  memberId: number;
  storeId: number;
}

export type AftersalesPk = "id";
export type AftersalesId = Aftersales[AftersalesPk];
export type AftersalesOptionalAttributes = "deliveryCorp" | "deliveryCorpCode" | "trackingNo" | "account" | "bank" | "method" | "address" | "area" | "consignee" | "phone";
export type AftersalesCreationAttributes = Optional<AftersalesAttributes, AftersalesOptionalAttributes>;

export class Aftersales extends Model<AftersalesAttributes, AftersalesCreationAttributes> implements AftersalesAttributes {
  dtype!: string;
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  deliveryCorp?: string;
  deliveryCorpCode?: string;
  orderSn!: string;
  reason!: string;
  refundAmount!: number;
  status!: number;
  trackingNo?: string;
  account?: string;
  bank?: string;
  method?: number;
  address?: string;
  area?: string;
  consignee?: string;
  phone?: string;
  memberId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Aftersales {
    return Aftersales.init({
    dtype: {
      type: DataTypes.STRING(31),
      allowNull: false
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
    deliveryCorp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCorpCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    orderSn: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refundAmount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trackingNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bank: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    consignee: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
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
    tableName: 'Aftersales',
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
        name: "ind_Aftersales_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_Aftersales_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
