/**
 * File Name  : ElectronicOrderConfig.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ElectronicOrderConfigAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  checkManLabelName?: string;
  codeLabelName?: string;
  netLabelName?: string;
  partnerIdLabelName?: string;
  partnerKeyLabelName?: string;
  partnerNameLabelName?: string;
  partnerSecretLabelName?: string;
  tempId?: string;
  deliveryCorpId: number;
}

export type ElectronicOrderConfigPk = "id";
export type ElectronicOrderConfigId = ElectronicOrderConfig[ElectronicOrderConfigPk];
export type ElectronicOrderConfigOptionalAttributes = "checkManLabelName" | "codeLabelName" | "netLabelName" | "partnerIdLabelName" | "partnerKeyLabelName" | "partnerNameLabelName" | "partnerSecretLabelName" | "tempId";
export type ElectronicOrderConfigCreationAttributes = Optional<ElectronicOrderConfigAttributes, ElectronicOrderConfigOptionalAttributes>;

export class ElectronicOrderConfig extends Model<ElectronicOrderConfigAttributes, ElectronicOrderConfigCreationAttributes> implements ElectronicOrderConfigAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  checkManLabelName?: string;
  codeLabelName?: string;
  netLabelName?: string;
  partnerIdLabelName?: string;
  partnerKeyLabelName?: string;
  partnerNameLabelName?: string;
  partnerSecretLabelName?: string;
  tempId?: string;
  deliveryCorpId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ElectronicOrderConfig {
    return ElectronicOrderConfig.init({
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
    checkManLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    codeLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    netLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerIdLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerKeyLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerNameLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerSecretLabelName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tempId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCorpId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'DeliveryCorp',
        key: 'id'
      },
      unique: "FK1kj2gpn92oi7pxiagsdq76c5c",
      field: 'deliveryCorp_id'
    }
  }, {
    sequelize,
    tableName: 'ElectronicOrderConfig',
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
        name: "deliveryCorp_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "deliveryCorp_id" },
        ]
      },
      {
        name: "UK_9rn2a57ybd4i7014a4g9r1pji",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "deliveryCorp_id" },
        ]
      },
    ]
  });
  }
}
