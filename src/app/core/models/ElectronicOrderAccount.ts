/**
 * File Name  : ElectronicOrderAccount.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ElectronicOrderAccountAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  checkMan?: string;
  code?: string;
  net?: string;
  partnerId?: string;
  partnerKey?: string;
  partnerName?: string;
  partnerSecret?: string;
  electronicOrderConfigId: number;
  storeId: number;
}

export type ElectronicOrderAccountPk = "id";
export type ElectronicOrderAccountId = ElectronicOrderAccount[ElectronicOrderAccountPk];
export type ElectronicOrderAccountOptionalAttributes = "checkMan" | "code" | "net" | "partnerId" | "partnerKey" | "partnerName" | "partnerSecret";
export type ElectronicOrderAccountCreationAttributes = Optional<ElectronicOrderAccountAttributes, ElectronicOrderAccountOptionalAttributes>;

export class ElectronicOrderAccount extends Model<ElectronicOrderAccountAttributes, ElectronicOrderAccountCreationAttributes> implements ElectronicOrderAccountAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  checkMan?: string;
  code?: string;
  net?: string;
  partnerId?: string;
  partnerKey?: string;
  partnerName?: string;
  partnerSecret?: string;
  electronicOrderConfigId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ElectronicOrderAccount {
    return ElectronicOrderAccount.init({
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
    checkMan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    net: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerKey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerSecret: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    electronicOrderConfigId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ElectronicOrderConfig',
        key: 'id'
      },
      field: 'electronicOrderConfig_id'
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
    tableName: 'ElectronicOrderAccount',
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
        name: "ind_ElectronicOrderAccount_electronicOrderConfig_id",
        using: "BTREE",
        fields: [
          { name: "electronicOrderConfig_id" },
        ]
      },
      {
        name: "ind_ElectronicOrderAccount_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
