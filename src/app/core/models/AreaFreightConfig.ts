/**
 * File Name  : AreaFreightConfig.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AreaFreightConfigAttributes {
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
  areaId: number;
}

export type AreaFreightConfigPk = "id";
export type AreaFreightConfigId = AreaFreightConfig[AreaFreightConfigPk];
export type AreaFreightConfigCreationAttributes = AreaFreightConfigAttributes;

export class AreaFreightConfig extends Model<AreaFreightConfigAttributes, AreaFreightConfigCreationAttributes> implements AreaFreightConfigAttributes {
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
  areaId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof AreaFreightConfig {
    return AreaFreightConfig.init({
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
    },
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'area_id'
    }
  }, {
    sequelize,
    tableName: 'AreaFreightConfig',
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
        name: "ind_AreaFreightConfig_shippingMethod_id",
        using: "BTREE",
        fields: [
          { name: "shippingMethod_id" },
        ]
      },
      {
        name: "ind_AreaFreightConfig_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "ind_AreaFreightConfig_area_id",
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
    ]
  });
  }
}
