/**
 * File Name  : Svc.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SvcAttributes {
  dtype: string;
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  amount: number;
  durationDays?: number;
  sn: string;
  promotionPluginId?: string;
  storeId?: number;
}

export type SvcPk = "id";
export type SvcId = Svc[SvcPk];
export type SvcOptionalAttributes = "durationDays" | "promotionPluginId" | "storeId";
export type SvcCreationAttributes = Optional<SvcAttributes, SvcOptionalAttributes>;

export class Svc extends Model<SvcAttributes, SvcCreationAttributes> implements SvcAttributes {
  dtype!: string;
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  amount!: number;
  durationDays?: number;
  sn!: string;
  promotionPluginId?: string;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Svc {
    return Svc.init({
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
    amount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    durationDays: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
    },
    promotionPluginId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'Svc',
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
        name: "sn",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sn" },
        ]
      },
      {
        name: "ind_Svc_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
