/**
 * File Name  : DefaultFreightConfig.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DefaultFreightConfigAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  continuePrice: number;
  continueWeight: number;
  firstPrice: number;
  firstWeight: number;
  shippingMethodId: number;
  storeId: number;
}

export type DefaultFreightConfigPk = "id";
export type DefaultFreightConfigId = DefaultFreightConfig[DefaultFreightConfigPk];
export type DefaultFreightConfigCreationAttributes = DefaultFreightConfigAttributes;

export class DefaultFreightConfig extends Model<DefaultFreightConfigAttributes, DefaultFreightConfigCreationAttributes> implements DefaultFreightConfigAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  continuePrice!: number;
  continueWeight!: number;
  firstPrice!: number;
  firstWeight!: number;
  shippingMethodId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof DefaultFreightConfig {
    return DefaultFreightConfig.init({
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
    continuePrice: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    continueWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstPrice: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    firstWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shippingMethodId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ShippingMethod',
        key: 'id'
      },
      field: 'shippingMethod_id'
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
    tableName: 'DefaultFreightConfig',
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
        name: "ind_DefaultFreightConfig_shippingMethod_id",
        using: "BTREE",
        fields: [
          { name: "shippingMethod_id" },
        ]
      },
      {
        name: "ind_DefaultFreightConfig_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
